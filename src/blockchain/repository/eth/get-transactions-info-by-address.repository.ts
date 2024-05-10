import {
  chunk,
  delay,
  filter,
  flat,
  map,
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
        switch (cur.to) {
          case cur.from:
            acc.fee += BigInt(cur.gasPrice) * BigInt(cur.gas);
            break;
          case params.address:
            acc.depositAmount += BigInt(cur.value);
            break;
          default:
            acc.withdrawalAmount += BigInt(cur.value);
            acc.fee += BigInt(cur.gasPrice) * BigInt(cur.gas);
        }

        return acc;
      },
      { withdrawalAmount: 0n, depositAmount: 0n, fee: 0n },
    );

    return {
      depositAmount: '0x' + result.depositAmount.toString(16),
      withdrawalAmount: '0x' + result.withdrawalAmount.toString(16),
      fee: '0x' + result.fee.toString(16),
    };
  }
}
