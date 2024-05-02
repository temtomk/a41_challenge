@Controller()
export class UserController {
  constructor(
    @Inject(FIND_USER_INBOUND_PORT)
    private readonly findUserInboundPort: FindUserInboundPort,

    @Inject(CREATE_USER_INBOUND_PORT)
    private readonly createUserInboundPort: CreateUserInboundPort,
  ) {}

  @Get('users')
  async FindUsers(): Promise<FindUserInboundPortOutputDto> {
    return await this.findUserInboundPort.execute();
  }

  @Post('users')
  async createUser(@Body() user: User): Promise<createUserInboundPort> {
    return await this.createUserInboundPort.execute();
  }
}