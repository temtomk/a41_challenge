export type GetTransactionInfoInPortInputDto = {
  blockNumber: number;
  address: string;
};

export type GetTransactionInfoInPortOutputDto = {
  transactionSum: number;
  fee: number;
};

export const GET_TRANSACTION_INFO_IN_PORT =
  'GET_TRANSACTION_INFO_IN_PORT' as const;

export interface GetTransactionInfoInPort {
  execute(
    params: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto>;
}
