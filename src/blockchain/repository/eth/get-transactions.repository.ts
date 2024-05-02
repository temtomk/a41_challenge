import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  GetTransactionsOutPort,
  GetTransactionsOutPortInputDto,
  GetTransactionsOutPortOutputDto,
} from 'src/blockchain/out-port/get-transactions.outport';

export class GetTransactionsRepository implements GetTransactionsOutPort {
  constructor(private httpService: HttpService) {}
  async execute(
    params: GetTransactionsOutPortInputDto,
  ): Promise<GetTransactionsOutPortOutputDto> {
    const blockNumber = params.blockNumber;

    const data = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [blockNumber, false],
      id: 1,
    };

    const blockInfo = this.httpService.post(
      `https://holesky.infura.io/v3/${process.env.INFURA_KEY}`,
      data,
    );

    const transactions = (await firstValueFrom(blockInfo)).data.result
      .transactions;

    return transactions;
  }
}
