import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { GetTransactionsRepository } from './get-transactions.repository';

describe('GetTransactionsRepository', () => {
  let repository: GetTransactionsRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // GetTransactionsRepository가 의존하는 HttpService를 제공합니다.
      providers: [
        GetTransactionsRepository,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<GetTransactionsRepository>(
      GetTransactionsRepository,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return transactions', async () => {
    const mockResponse: any = {
      data: {
        id: 1,
        jsonrpc: '2.0',
        result: {
          blockNumber: '0x5bad55',
          transactions: [
            '0x8784d99762bccd03b2086eabccee0d77f14d05463281e121a62abfebcf0d2d5f',
            '0x311be6a9b58748717ac0f70eb801d29973661aaf1365960d159e4ec4f4aa2d7f',
            '0xe42b0256058b7cad8a14b136a0364acda0b4c36f5b02dea7e69bfd82cef252a2',
            '0x4eb05376055c6456ed883fc843bc43df1dcf739c321ba431d518aecd7f98ca11',
            '0x994dd9e72b212b7dc5fd0466ab75adf7d391cf4f206a65b7ad2a1fd032bb06d7',
            '0xf1cd627c97746bc75727c2f0efa2d0dc66cca1b36d8e45d897e18a9b19af2f60',
            '0x241d89f7888fbcfadfd415ee967882fec6fdd67c07ca8a00f2ca4c910a84c7dd',
          ],
        },
      },
    };

    // HttpService의 post 메소드를 mocking합니다.
    jest.spyOn(httpService, 'post').mockImplementation(() => of(mockResponse));

    const blockNumber = '0x5bad55'; // 테스트에 사용할 블록 번호입니다.
    const transactions = await repository.execute({ blockNumber });

    expect(transactions).toEqual(mockResponse.data.result.transactions);
  });
});
