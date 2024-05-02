export type CreateUserInboundPortInputDto = {
  keyword: string;
};

export type CreateUserInboundPortOutputDto = Array<string>;

export const CREATE_USER_INBOUND_PORT = 'CREATE_USER_INBOUND_PORT';

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}