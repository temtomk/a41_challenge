@Module({
  controllers: [UserController],
  providers: [
    //inbound
    {
      provide: FIND_USER_INBOUND_PORT,
      useClass: FindUserService,
    },
    {
      provide: CREATE_USER_INBOUND_PORT,
      useClass: CreateUserService,
    },

    //outbound
    {
      provide: FIND_USER_OUTBOUND_PORT,
      useClass: FindUserRepository,
    },
    {
      provide: CREATE_USER_OUTBOUND_PORT,
      useClass: CreateUserRepository,
    },
  ],
})
export class UserModule {}