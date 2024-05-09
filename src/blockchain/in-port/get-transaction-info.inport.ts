import { ApiProperty } from '@nestjs/swagger';

export class GetTransactionInfoInPortInputDto {
  @ApiProperty({
    example: '0x112418d',
    description:
      'The number of the block for which you want to query transactions',
  })
  blockNumber: string;
  @ApiProperty({
    example: '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0',
    description:
      'The address you want to query information from in the transactions',
  })
  address: string;
}

export class GetTransactionInfoInPortOutputDto {
  @ApiProperty({
    example: '0x6b334beb55d5b800',
    description: 'Received amount (Wei)',
  })
  depositAmount: string;
  @ApiProperty({ example: '0x0', description: 'Sent amount (Wei)' })
  withdrawalAmount: string;
  @ApiProperty({
    example: '0x1974c64573098',
    description: 'Gas fee, The value calculated by gas * gasPrice (Wei)',
  })
  fee: string;
}

export const GET_TRANSACTION_INFO_IN_PORT =
  'GET_TRANSACTION_INFO_IN_PORT' as const;

export interface GetTransactionInfoInPort {
  execute(
    params: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto>;
}
