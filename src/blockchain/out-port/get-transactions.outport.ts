export type GetTransactionsOutPortInputDto = {
  blockNumber: string;
};

export type GetTransactionsOutPortOutputDto = { transactions: Array<string> };

export const GET_TRANSACTIONS_OUT_PORT = 'GET_TRANSACTIONS_OUT_PORT' as const;

export interface GetTransactionsOutPort {
  execute(
    params: GetTransactionsOutPortInputDto,
  ): Promise<GetTransactionsOutPortOutputDto>;
}
