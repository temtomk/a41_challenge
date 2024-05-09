# 프로젝트 소개

## 기술 스택

이 프로젝트는 다음 기술들을 사용하였습니다:

![TypeScript](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png) ![NestJS](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1600658982/noticon/hk60kbfbqnedpguy0gbb.png) ![Ethereum](https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1628136024/noticon/s3ok8wcypvq1xxglmfkv.png)

## 아키텍처

### 사용된 아키텍처

이 프로젝트는 포트&어댑터(Port&Adapter) 아키텍처 패턴을 따르고 있습니다.

![포트&어댑터](arch.webp)

포트&어댑터를 사용함으로써 얻을 수 있는 장점들은 다음과 같습니다:

- **유연성과 확장성**: 코어 로직이 외부 요소와의 연결 방식에 영향을 받지 않아, 새로운 기술 스택으로의 이전이 용이합니다.
- **분리된 관심사**: 애플리케이션의 코어 로직과 인터페이스가 분리되어, 이해하고 관리하기가 더 쉬워집니다.
- **MSA(Micro Service Architecture) 지원**: DDD(Domain-Driven Design)를 사용한 개발은 마이크로 서비스 아키텍처를 위한 훌륭한 기반을 제공합니다.

### 워크플로우

워크플로우는 다음과 같은 과정을 포함합니다:

1. **Controller**에서 사용자의 입력(`blockNumber`, `address`)을 받습니다.
2. 해당 입력은 **Service**로 전달되어 처리됩니다.
3. **Service**는 두 개의 레포지토리, `get-transaction`과 `get-transaction-info-by-address`를 호출합니다.
    - `get-transaction` 레포지토리는 블록 넘버를 사용하여 해당 블록의 모든 트랜잭션들을 가져옵니다.
    - `get-transaction-info-by-address` 레포지토리는 주어진 주소에 해당하는 트랜잭션이 있는지 검사하고, 해당 트랜잭션들의 입출금 총합과 가스비를 계산하여 반환합니다.

## 코드 스타일

이 프로젝트의 코드는 함수형 스타일로 짜도록 노력했으며 이를 위해 `fxts` 패키지를 활용했습니다.

- **사이드 이펙트 최소화**: 순수 함수를 사용함으로써 예측 가능한 결과를 얻을 수 있습니다.
- **가독성 향상**: 함수형 프로그래밍은 코드의 의도를 명확하게 전달하며, 유지보수와 확장성에 유리합니다.
