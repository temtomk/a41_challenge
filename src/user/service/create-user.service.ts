export class CreateUserService implements CreateUserInboundPort {
  constructor(
    @Inject(CREATE_USER_OUTBOUND_PORT)
    private readonly createUserOutboundPort: CreateUserOutboundPort,
  ) {}

  async execute(params: CreateUserOutboundPortInputDto): Promise<CreateUserOutboundPortOutputDto> {
    return await this.createUserOutboundPort.execute();
  }
}