import { Inject, Injectable } from '@nestjs/common';
import {
  GetTransactionInfoInPort,
  GetTransactionInfoInPortInputDto,
  GetTransactionInfoInPortOutputDto,
} from '../in-port/get-transaction-info.inport';
import {
  GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT,
  GetTransactionInfoByAddressOutPort,
} from '../out-port/get-transaction-info-by-address.outport';
import {
  GET_TRANSACTIONS_OUT_PORT,
  GetTransactionsOutPort,
} from '../out-port/get-transactions.outport';

@Injectable()
export class GetTransactionInfoService implements GetTransactionInfoInPort {
  constructor(
    @Inject(GET_TRANSACTIONS_OUT_PORT)
    private readonly getTransactionsOutPort: GetTransactionsOutPort,

    @Inject(GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT)
    private readonly getTransactionInfoByAddressOutPort: GetTransactionInfoByAddressOutPort,
  ) {}

  async execute(
    params: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto> {
    const transactions = await this.getTransactionsOutPort.execute({
      blockNumber: params.blockNumber,
    });

    const transactionInfo =
      await this.getTransactionInfoByAddressOutPort.execute({
        address: params.address,
        transactions: transactions.transactions,
      });

    return {
      //TODO: 어떤 의미의 입/출금 총합인지 확인
      transactionSum: (
        BigInt('0x' + transactionInfo.sendEth) +
        BigInt('0x' + transactionInfo.receiveEth)
      ).toString(16),
      fee: transactionInfo.fee,
    };
  }
}
