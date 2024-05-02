import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import {
  GetTransactionInfoByAddressOutPort,
  GetTransactionInfoByAddressOutPortOutputDto,
} from 'src/blockchain/out-port/get-transaction-info-by-address.outport';

export class GetTransactionInfoByAddressRepository
  implements GetTransactionInfoByAddressOutPort
{
  constructor(private httpService: HttpService) {}

  async execute(params): Promise<GetTransactionInfoByAddressOutPortOutputDto> {
    const address = params.address;
    let sendEth = 0;
    let receiveEth = 0;
    let fee = 0;

    params.transactions.map((transaction) => {
      const data = {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [transaction],
        id: 1,
      };

      this.httpService
        .post(`https://holesky.infura.io/v3/${process.env.INFURA_KEY}`, data)
        .pipe(
          map((response) => response.data.result),
          map((result) =>
            result.filter((res) => res.from === address || res.to === address),
          ),
          map((res) => {
            if (res.to === address) {
              receiveEth += res.value;
            }
            if (res.from === address) {
              sendEth += res.value;
              fee += res.gasPrice * res.gasUsed;
            }
          }),
        );
    });

    return { sendEth: sendEth, receiveEth: receiveEth, fee: fee };
  }
}
