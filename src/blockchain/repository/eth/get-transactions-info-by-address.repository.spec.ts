import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { GetTransactionInfoByAddressRepository } from './get-transactions-info-by-address.repository';
import { GetTransactionInfoByAddressOutPortInputDto } from 'src/blockchain/out-port/get-transaction-info-by-address.outport';

describe('Get transaction info by address test', () => {
  let repository: GetTransactionInfoByAddressRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTransactionInfoByAddressRepository,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn().mockImplementation(() =>
              of({
                data: [
                  {
                    result: {
                      to: 'test_address',
                      from: 'test_address',
                      value: '0x10F0CF064DD59200000', // 대략 1000 이더리움 (ETH)에 해당하는 큰 값
                      gasPrice: '0x3B9ACA00', // 1 Gwei (10^9 Wei) 보다 큰 값
                      gas: '0x5208', // 21000 가스, 일반적인 ETH 전송에 필요한 가스량
                    },
                  },
                  {
                    result: {
                      to: 'not_test_address',
                      from: 'test_address',
                      value: '0x1BC16D674EC80000', // 대략 200 이더리움 (ETH)에 해당하는 큰 값
                      gasPrice: '0x12A05F200', // 5 Gwei (5 * 10^9 Wei) 보다 큰 값
                      gas: '0x5208', // 21000 가스, 일반적인 ETH 전송에 필요한 가스량
                    },
                  },
                  {
                    result: {
                      to: 'test_address',
                      from: 'not_test_address',
                      value: '0x4563918244F40000', // 대략 5000 이더리움 (ETH)에 해당하는 큰 값
                      gasPrice: '0x2540BE400', // 10 Gwei (10 * 10^9 Wei) 보다 큰 값
                      gas: '0x5208', // 21000 가스, 일반적인 ETH 전송에 필요한 가스량
                    },
                  },
                  {
                    result: {
                      to: 'not_test_address',
                      from: 'not_test_address',
                      value: '0x4563918244F40000', // 대략 5000 이더리움 (ETH)에 해당하는 큰 값
                      gasPrice: '0x2540BE400', // 10 Gwei (10 * 10^9 Wei) 보다 큰 값
                      gas: '0x5208', // 21000 가스, 일반적인 ETH 전송에 필요한 가스량
                    },
                  },
                ],
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

    repository = module.get<GetTransactionInfoByAddressRepository>(
      GetTransactionInfoByAddressRepository,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should fetch transactions successfully', async () => {
    const params: GetTransactionInfoByAddressOutPortInputDto = {
      transactions: ['0x1'],
      address: 'test_address',
    };
    const expectedResponse = {
      depositAmount: '0x4563918244f40000',
      withdrawalAmount: '0x1bc16d674ec80000',
      fee: '0x7298a93de000',
    };

    const transactions = await repository.execute(params);

    expect(transactions).toEqual(expectedResponse);
    expect(httpService.post).toHaveBeenCalled();
  });
});
