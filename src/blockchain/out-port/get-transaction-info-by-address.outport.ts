export type GetTransactionInfoByAddressOutPortInputDto = {
  transactions: Array<string>;
  address: string;
};

export type GetTransactionInfoByAddressOutPortOutputDto = {
  receiveEth: string;
  sendEth: string;
  fee: string;
};

export const GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT =
  'GET_TRANSACTION_INFO_BY_ADDRESS_OUT_PORT' as const;

export interface GetTransactionInfoByAddressOutPort {
  execute(
    params: GetTransactionInfoByAddressOutPortInputDto,
  ): Promise<GetTransactionInfoByAddressOutPortOutputDto>;
}