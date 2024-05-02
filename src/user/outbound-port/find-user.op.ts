export type FindUserOutboundPortInputDto = {
  keyword: string;
};

export type FindUserOutboundPortOutputDto = Array<string>;

export const FIND_USER_OUTBOUND_PORT = 'FIND_USER_OUTBOUND_PORT';

export interface FindUserOutboundPort {
  execute(
    params: FindUserOutboundPortInputDto,
  ): Promise<FindUserOutboundPortOutputDto>;
}