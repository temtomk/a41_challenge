import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  GetTransactionsOutPort,
  GetTransactionsOutPortInputDto,
  GetTransactionsOutPortOutputDto,
} from 'src/blockchain/out-port/get-transactions.outport';

@Injectable()
export class GetTransactionsRepository implements GetTransactionsOutPort {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async execute(
    params: GetTransactionsOutPortInputDto,
  ): Promise<GetTransactionsOutPortOutputDto> {
    try {
      const blockNumber = params.blockNumber;

      const data = {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [blockNumber, false],
        id: 1,
      };
      const apiKey = this.configService.get<string>('INFURA_KEY');

      const blockInfo = this.httpService.post(
        `https://mainnet.infura.io/v3/${apiKey}`,
        data,
      );

      const transactions = (await firstValueFrom(blockInfo)).data.result
        .transactions;

      return { transactions: transactions };
    } catch (error) {
      console.log(error);
    }
  }
}
