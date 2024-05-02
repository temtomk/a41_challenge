export type CreateUserOutboundPortInputDto = {
  keyword: strintg;
};

export type CreateUserOutboundPortOutputDto = Array<strOutg>;

export const CREATE_USER_OUTBOUND_PORT = 'CREATE_USER_OUTBOUND_PORT';

export interface CreateUserOutboundPort {
  execute(
    params: CreateUserOutboundPortInputDto,
  ): Promise<CreateUserOutboundPortOutputDto>;
}