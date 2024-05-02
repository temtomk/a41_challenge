export class FindUserService implements FindUserInboundPort {
  constructor(
    @Inject(FIND_USER_OUTBOUND_PORT)
    private readonly findUserOutboundPort: FindUserOutboundPort,
  ) {}

  async execute(params: FindUserInboundPortInputDto): Promise<FindUserInboundPortOutputDto> {
    return await this.findUserOutboundPort.execute();
  }
}