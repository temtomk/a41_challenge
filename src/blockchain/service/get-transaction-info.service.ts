import { Inject } from '@nestjs/common';
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

export class GetTransactionInfoService implements GetTransactionInfoInPort {
  constructor(
    @Inject(GET_TRANSACTIONS_OUT_PORT)
    private readonly getTransactionsOutboundPort: GetTransactionsOutPort,

    @Inject(GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT)
    private readonly getTransactionInfoByAddressOutboundPort: GetTransactionInfoByAddressOutPort,
  ) {}

  async execute(
    params: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto> {
    const transactions = await this.getTransactionsOutboundPort.execute({
      blockNumber: params.blockNumber,
    });

    const transactionInfo =
      await this.getTransactionInfoByAddressOutboundPort.execute({
        address: params.address,
        transactions: transactions.transactions,
      });

    return {
      //TODO: 어떤 의미의 입/출금 총합인지 확인
      transactionSum: transactionInfo.sendEth + transactionInfo.receiveEth,
      fee: transactionInfo.fee,
    };
  }
}
