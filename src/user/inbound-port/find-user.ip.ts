export type FindUserInboundPortInputDto = {
  keyword: string;
};

export type FindUserInboundPortOutputDto = Array<string>;

export const FIND_USER_INBOUND_PORT = 'FIND_USER_INBOUND_PORT';

export interface FindUserInboundPort {
  execute(
    params: FindUserInboundPortInputDto,
  ): Promise<FindUserInboundPortOutputDto>;
}