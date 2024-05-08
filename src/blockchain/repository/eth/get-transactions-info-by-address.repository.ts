import {
  chunk,
  delay,
  filter,
  flat,
  map,
  peek,
  pipe,
  toArray,
  toAsync,
} from '@fxts/core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  GetTransactionInfoByAddressOutPort,
  GetTransactionInfoByAddressOutPortInputDto,
  GetTransactionInfoByAddressOutPortOutputDto,
} from 'src/blockchain/out-port/get-transaction-info-by-address.outport';

@Injectable()
export class GetTransactionInfoByAddressRepository
  implements GetTransactionInfoByAddressOutPort
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    params: GetTransactionInfoByAddressOutPortInputDto,
  ): Promise<GetTransactionInfoByAddressOutPortOutputDto> {
    const apiKey = this.configService.get<string>('INFURA_KEY');
    const url = `https://mainnet.infura.io/v3/${apiKey}`;

    const data = params.transactions.map((transaction, idx) => ({
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [transaction],
      id: idx + 1, // 인덱스에 1을 더해 1부터 시작하도록 조정
    }));

    const getResponse = await pipe(
      data,
      chunk(10),
      toAsync,
      map((chunkedData) =>
        delay(3000, lastValueFrom(this.httpService.post(url, chunkedData))),
      ),
      map((response) => response.data),
      flat,
      map((obj) => obj.result),
      filter(
        (elem) => elem.to == params.address || elem.from == params.address,
      ),
      peek((elem) => console.log(elem)),
      map((result) => ({
        to: result.to,
        from: result.from,
        value: result.value,
        gasPrice: result.gasPrice,
        gas: result.gas,
      })),
      toArray,
    );

    const result = getResponse.reduce(
      (acc, cur) => {
        if (cur.to === params.address) {
          acc.sendEth += BigInt(cur.value);
        }

        if (cur.from === params.address) {
          acc.receiveEth += BigInt(cur.value);
          acc.fee += BigInt(BigInt(cur.gasPrice) * BigInt(cur.gas));
        }

        return acc;
      },
      { sendEth: 0n, receiveEth: 0n, fee: 0n },
    );

    return {
      receiveEth: result.receiveEth.toString(16),
      sendEth: result.sendEth.toString(16),
      fee: result.fee.toString(16),
    };
  }
}
