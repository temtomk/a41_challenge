export class CreateUserRepository implements CreateUserOutboundPort {
  async execute(
    params: CreateUserOutboundPortInputDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
    const members = await MemoryDatabase.CreateMembers();

    return members.map((member) => {
      return {
        name: member.name,
        email: member.email,
        phone: member.phone,
      };
    });
  }
}