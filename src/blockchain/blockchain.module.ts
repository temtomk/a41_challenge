import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { HttpModule } from '@nestjs/axios';
import { GET_TRANSACTION_INFO_IN_PORT } from './in-port/get-transaction-info.inport';
import { GetTransactionsRepository } from './repository/eth/get-transactions.repository';
import { GET_TRANSACTIONS_OUT_PORT } from './out-port/get-transactions.outport';
import { GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT } from './out-port/get-transaction-info-by-address.outport';
import { GetTransactionInfoService } from './service/get-transaction-info.service';
import { GetTransactionInfoByAddressRepository } from './repository/eth/get-transactions-info-by-address.repository';

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    //inbound
    {
      provide: GET_TRANSACTION_INFO_IN_PORT,
      useClass: GetTransactionInfoService,
    },

    //outbound
    {
      provide: GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT,
      useClass: GetTransactionInfoByAddressRepository,
    },
    {
      provide: GET_TRANSACTIONS_OUT_PORT,
      useClass: GetTransactionsRepository,
    },
  ],
})
export class BlockchainModule {}
