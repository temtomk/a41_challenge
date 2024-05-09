import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  GET_TRANSACTION_INFO_IN_PORT,
  GetTransactionInfoInPort,
  GetTransactionInfoInPortInputDto,
  GetTransactionInfoInPortOutputDto,
} from '../in-port/get-transaction-info.inport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(GET_TRANSACTION_INFO_IN_PORT)
    private readonly getTransactionInfoInPort: GetTransactionInfoInPort,
  ) {}

  @ApiOperation({
    summary: 'Get Transaction Info',
    description:
      'Query transaction information for a specific address from the transactions of a specific block.',
  })
  @ApiResponse({
    status: 200,
    type: GetTransactionInfoInPortOutputDto,
  })
  @Get('get-transaction-info')
  async GetTransactionInfo(
    @Query() query: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto> {
    return await this.getTransactionInfoInPort.execute(query);
  }
}
