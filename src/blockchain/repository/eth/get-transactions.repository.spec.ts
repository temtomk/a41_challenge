import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { GetTransactionsRepository } from './get-transactions.repository';

describe('GetTransactionsRepository', () => {
  let repository: GetTransactionsRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTransactionsRepository,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn().mockImplementation(() =>
              of({
                data: {
                  result: {
                    transactions: [
                      '0x2ur8o2y389fhsadjfh',
                      '0x3478dasjkfha92313y',
                    ],
                  },
                },
              }),
            ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-api-key'),
          },
        },
      ],
    }).compile();

    repository = module.get<GetTransactionsRepository>(
      GetTransactionsRepository,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should fetch transactions successfully', async () => {
    const params = { blockNumber: '0x10d4f' }; // 테스트를 위한 파라미터
    const expectedTransactions = [
      '0x2ur8o2y389fhsadjfh',
      '0x3478dasjkfha92313y',
    ];

    const transactions = await repository.execute(params);

    expect(transactions).toEqual({ transactions: expectedTransactions });
    expect(httpService.post).toHaveBeenCalled();
  });
});
