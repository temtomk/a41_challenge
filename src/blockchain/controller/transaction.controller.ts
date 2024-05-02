import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  GET_TRANSACTION_INFO_IN_PORT,
  GetTransactionInfoInPort,
  GetTransactionInfoInPortInputDto,
  GetTransactionInfoInPortOutputDto,
} from '../in-port/get-transaction-info.inport';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(GET_TRANSACTION_INFO_IN_PORT)
    private readonly getTransactionInfoInPort: GetTransactionInfoInPort,
  ) {}

  @Get('ping')
  async ping(): Promise<string> {
    return 'pong';
  }

  @Get()
  async GetTransactionInfo(
    @Query() query: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto> {
    return await this.getTransactionInfoInPort.execute(query);
  }
}
