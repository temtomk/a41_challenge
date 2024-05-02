export class FindUserRepository implements FindUserOutboundPort {
  async execute(
    params: FindUserOutboundPortInputDto,
  ): Promise<FindUserOutboundPortOutputDto> {
    const members = await MemoryDatabase.findMembers();

    return members.map((member) => {
      return {
        name: member.name,
        email: member.email,
        phone: member.phone,
      };
    });
  }
}