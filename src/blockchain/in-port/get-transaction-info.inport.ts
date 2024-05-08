export type GetTransactionInfoInPortInputDto = {
  blockNumber: string;
  address: string;
};

export type GetTransactionInfoInPortOutputDto = {
  transactionSum: string;
  fee: string;
};

export const GET_TRANSACTION_INFO_IN_PORT =
  'GET_TRANSACTION_INFO_IN_PORT' as const;

export interface GetTransactionInfoInPort {
  execute(
    params: GetTransactionInfoInPortInputDto,
  ): Promise<GetTransactionInfoInPortOutputDto>;
}
