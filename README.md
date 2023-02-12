# README

# 저장소

[Front-end git repository](https://github.com/bead-it/bead-it-client)

[Back-end git repository](https://github.com/bead-it/bead-it-server) : API document

# 배포

~~https://www.beadit.site/~~

# Bead It !!

Beadit 은 여러 웹 페이지를 하나로 묶어, 생각과 정보를 하나의 아티클로 생성하고 공유할 수 있는 서비스입니다. 인류 역사상 그 어느 때 보다도 다른 장소에 비해 온라인에 많은 정보가 존재하는 시대입니다. 앞으로도 이러한 경향은 더욱 가속될 것으로 예상하는 바, 가까운 장래에는 이러한 인터넷 상의 정보를 수집하고 가공하여 공유함으로써 교육과 학문의 영역에서 전통적으로 책이 제공하는 응축된 정보를 대체하는 것이 가능하리라 생각합니다.

거창한 기치와는 다르게, 본 어플리케이션의 핵심 기능은 웹 서핑의 결과를 2차원으로 인식하고 편하게 정리할 수 있는 사소한 기능들을 구현하는데 우선적인 가치를 두고 발전해 나가려 합니다. 무한한 정보의 바다에서 오늘도 수 없이 이루어지는 당신의 탐험에 도움이 되기를 바랍니다.

# 구성 프레임워크, 라이브러리

| Next.js  | NPM 13.0.3 | Express      | NPM 4.16.1 | Mongo_DB      | -               |
| -------- | ---------- | ------------ | ---------- | ------------- | --------------- |
| Recoil   | NPM 0.7.6  | D3.js        | NPM 7.6.1  | Cheerio       | NPM 1.0.0-rc.12 |
| Mongoose | NPM 6.7.2  | Jsonwebtoken | NPM 8.5.1  | Cors-anywhere | v0.4.4          |

- **Next.js + Express + Mongo_DB**
  ### Front-end
  Next.js : 필요한 부분에 Server-side-rendering, SEO 최적화를 적용, 그 외에는 single page application 으로 사용
  Recoil : 전역 변수 관리 라이브러리
  D3 : SVG 로 beadwork 그래프 표현 및 매니징 라이브러리
  Cheerio : 확보한 웹페이지를 표시해주기 전에 해당 HTML 문서의 링크를 적절하게 수정하기 위한 라이브러리
  ### Back-end
  express + mongo_DB : 생성, 수정, 열람 등 다양한 CRUD 에 대응하며 데이터를 기록
  mongoose : Mongo_DB 에 쉽게 요청할 수 이는 라이브러리
  jsonwebtoken : 로그인 이후 클라이언트와 서버 간의 인증
  ### Proxy
  cors-anywhere : CORS 정책 및 X-Frame-Options 이 적용된 웹페이지의 정보를 취득하기 위한 라이브러리
  https://github.com/Rob--W/cors-anywhere

# 주요 기능

- 권한, 인증
  - Google 로그인 지원
  - 로그인 한 유저가 보유한 문서 리스팅 지원
  - 로그인 한 유저는 모든 문서에 접근 가능, 본인이 생성한 문서만 수정 가능
- Bead 시각화
  - Beads 와 이를 서로 연결하는 threads 정보를 바탕으로 화면 상에 최대한 겹치지 않도록 그림
    - !! 구성 요소가 일정 수준으로 많아지거나 복잡한 상태가 되면 겹치게 될 수 있음.
  - 동일한 계층에 해당하는 beads 중 동일한 domain 을 가지는 beads 는 하나의 group 으로 뭉쳐 표현되는 기능과 이를 다시 펼치는 기능
  - Beads 또는 threads 에 커서를 가져다 대면 관련 정보창 팝업
  - Bead 가 새로 생성되면 그에 따라 위치 조정
  - 선택 여부에 따라 테두리 색으로 구분
- Web page 임베딩
  - 선택한 URL 에 해당하는 웹페이지를 임베딩하여 페이지의 내용을 확인하고 링크를 따라 이동하는 기능
    - !! 특정 도메인에서는 스크립트나 CSS 파일을 확보하지 못하여 사이트의 동적 기능이 적용되지 않을 수 있음
    - !! 임베딩 한 스크립트로 인해 전체 화면 뷰가 영향을 받는 경우가 있음
  - 대표적인 검색 엔진에 검색 가능한 입력창 지원
    - !! 가장 단순한 형태의 검색만 가능함
  - 링크를 따라 이동할 때 history 를 만들어 뒤로 가기, 앞으로 가기가 가능하도록 구현
  - 임베딩 창에 적절하게 표시되지 않은 페이지의 경우 브라우저의 새 창에서 볼 수 있도록 기능 지원
- Beadwork 수정
  - 선택한 bead 의 하위에 URL 을 입력하여 새로운 bead 생성 가능
  - Thread 를 선택하여 내용 수정 가능
  - 복수의 beads 를 선택하여 해당 beads 와 이를 연결하는 threads 를 포함하는 새로운 beadwork 문서 생성 가능
- 반응형
  - Navigation bar
  - Embeded page

# 업데이트

- 2022.11.14 프로젝트 셋업
- 2022.11.28 v1.0.0 prototype

# Installation

- [Frontend](https://github.com/bead-it/bead-it-client), [backend](https://github.com/bead-it/bead-it-server), [proxy](https://github.com/Rob--W/cors-anywhere) 서버 repository 를 각각 clone 하고 `npm i` 를 입력하여 의존모듈 설치
- .env 파일을 만들어 환경 변수 입력

  ```jsx
  //Front-end

  NEXT_PUBLIC_PUBLIC_KEY=/* JSON 토큰 인증을 위한 공개키 */

  NEXT_PUBLIC_BASE_URL=/* Backend 서버 주소 */
  NEXT_PUBLIC_CLIENT_URL=/* Frontend 서버 주소 */
  NEXT_PUBLIC_PROXY_URL=/* Proxy 서버 주소 */

  NEXT_PUBLIC_FIREBASE_API_KEY=/* Firebase 인증 정보 */
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=/* Firebase 인증 정보 */
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=/* Firebase 인증 정보 */
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=/* Firebase 인증 정보 */
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=/* Firebase 인증 정보 */
  NEXT_PUBLIC_FIREBASE_APP_ID=/* Firebase 인증 정보 */
  ```

  ```jsx
  //Back-end

  PUBLIC_KEY=/* JSON 토큰 인증을 위한 공개키 (front 와 동일) */
  PRIVATE_KEY=/* JSON 토큰 작성을 위한 비밀키 */

  CLIENT_URL=/* Frontend 서버 주소 */
  MONGO_DB=/* Mongo DB Atlas 접속을 위한 주소 */

  // front 와 동일
  FIREBASE_API_KEY=/* Firebase 인증 정보 */
  FIREBASE_AUTH_DOMAIN=/* Firebase 인증 정보 */
  FIREBASE_PROJECT_ID=/* Firebase 인증 정보 */
  FIREBASE_STORAGE_BUCKET=/* Firebase 인증 정보 */
  FIREBASE_MESSAGING_SENDER_ID=/* Firebase 인증 정보 */
  FIREBASE_APP_ID=/* Firebase 인증 정보 */
  ```

# v1.0.0 prototype 회고

### Authentication

본 어플리케이션은 사용자 간에 수신자 및 문서 열람 권한을 지정하고 창작물에 대한 소유권을 명확히 하기 위해, 계정을 통한 인증이 필요하다. 우선은 최소한의 규모로 계정을 만들고 인증 절차를 진행하고자 하는 의도로, google 로그인 api 를 통한 로그인 방법 만으로 제한하였다.

인증 과정을 설계하며 가장 중요하게 생각한 부분은 사용자 경험이었다. 사용자가 인증을 수행한지 시간이 오래 지나, 브라우저가 종료되지 않았음에도 토큰이 만료되는 경우, 인증이 유효한 것처럼 보이는 화면에서 작업을 진행한 이후 인증이 실패하여 재 작업을 해야 하는 경우가 발생할 수 있다. 따라서 특정 주기 또는 신호에 따라 client 단에서 API 요청 시와는 별개로 확인하는 절차를 넣으려 했다. 따라서 client 에서도 token 을 검증할 수 있는 방법이 필요하게 되어, RS256 알고리즘으로 private key 와 public key 를 사용하는 token 생성 방식을 선택하였다.

이를 통해 보안을 유지하면서도 클라이언트 단에서 선 검증을 수행하여 서버와의 통신을 최소화 할 수 있었다.

현재의 인증 흐름을 설명하자면 아래와 같다.

- C : client, S : server
- 로그인 과정
  - (C) google API 를 통한 sign up or log in 진행 → (C) token 을 획득하여 server 로 전송 → (S) 전송된 token 이 유효한지 검증 → (S) private key 를 사용한 전용 token 을 생성하여 client 로 전송 → (C) 전용 token 을 브라우저 cookie 에 저장
- HTTP request 과정
  - (C) client 에서 server 로 인증이 필요한 API 를 통한 request 헤더에 해당 전용 token 을 함께 전송 → (S) public key 를 이용하여 해당 token 이 유효한지 확인한 후 이후 과정 진행
- 인증 유지 여부 체크
  - (C) client 에서 첫 접속 시 혹은 특정 주기 혹은 마우스 이동 반응에 따라 public key 를 이용하여 유효한 token 을 보유하고 있는지 검사 → (C) 유효한 token 을 보유하지 않는 경우 알림창을 띄움

### D3.js

자유롭게 확대 축소 가능한 화면에서 연결 구조물을 그리고, 이를 활용하기 위해 svg 를 편리하게 활용할 수 있는 D3 라이브러리를 사용하였다. D3 를 사용하면 준비된 데이터에서 필요한 요소를 꺼내어 요소들을 그리고, 데이터 변경 시 변경된 요소를 자동으로 업데이트하는 과정을 일련의 chainging methods 로 구현할 수 있다. 또한 강력한 selection 메소드로 특정 요소에 대한 event 를 세팅하는 것도 용이하다.

그 중에서도 join 메쏘드를 사용하면 매우 간편하고 간결한 코드로 효율적인 데이터 및 dom 업데이트를 할 수 있어 이를 활용하였는데, 적은 learning curve 로 최소한의 필요성을 충족하는 기능을 구현할 수 있었다.

다만 경험이 없는 상태에서 구현하다보니, D3 에 입력하는 데이터의 구조 내용에 충분한 데이터가 들어가지 않아, id 를 기반으로 별도의 데이터 구조에서 데이터를 추출하는 방식으로 구현되는 부분이 있었다. 또한 데이터 변경 시 애니메이션을 추가하거나, 또는 요소들 간에 상호제약을 설정하여 보다 자유롭게 배치할 수 있는 등의 기법은 적용하지 못한 부분도 아쉬운 부분이다.

실제로 현재 사용한 배치 알고리즘에는 실 사용에 한계가 있어, 결정적으로 위치를 배정하는 방식보다는 특정 제약을 통해 동적으로 위치를 결정할 수 있도록 추후 기능을 추가할 예정이다.

### Web page embedding

본 어플리케이션의 활용성을 극대화시키기 위해서는, 어플리케이션 내에서 자유롭게 웹 서핑이 가능해야 한다. 별도의 창을 열어 웹을 탐색하고, url 을 획득하여 따로 어플리케이션에 기록하는 방법은 기존의 웹 서핑 경험에서 크게 개선되는 점이 없기 때문이다.

어플리케이션 내부에 외부 웹페이지를 삽입하기 위해 우선 iframe 을 활용하는 방향으로 시도해 보았다. iframe 으로 웹페이지를 삽입하는 것은 매우 간단했으나, 타겟 사이트의 X-Frame-Options 설정에 따라 소스에 접근할 수 없는 경우가 많다는 것이 문제였다. 결국 해당 문제를 우회할 방법을 찾기 힘들다는 결론을 내리고, proxy 서버를 활용해 same origin policy 를 회피하여 HTML 소스를 획득하고, 해당 소스의 a 태그로 구성된 링크를 모두 수정하는 방법으로 방향을 돌리기까지 많은 시간이 소요되었다. 획득하여 수정된 소스를 본 어플리케이션 내부 블럭에 삽입하고, 모든 링크에 이벤트를 걸어, 클릭 시 그 정보를 모두 확인하고 history 를 남기면서 클릭한 링크의 페이지로 연결하였다.

위와 같은 방식을 사용하면서 해결되지 못한 두 가지 문제는 아래와 같다.

1. 본 어플리케이션과 외부 사이트의 코드의 혼합

   외부 사이트의 css 스크립트로 인해 본 어플리케이션의 view 가 영향을 받는 사례가 자주 발생함. 또한 외부 사이트의 header 등 특정 요소가 임베딩 모듈을 벗어나는 경우도 발생함.

2. 추가 리소스 요청에 대한 거절 (Same origin policy)

   이미지와 일부 js, css 스크립트 등을 제외하고는 DOM 생성 과정에서 데이터 요청에 실패하게 되어, 결국 웹페이지의 동적 기능은 구현되지 않음. google 이나 naver 등의 검색 포털에서도 검색 동작이 불가능함. 특히 완전히 client side rendering 되는 페이지의 경우에는 거의 표시되는 요소가 없게 되는 문제가 있음.

당장은 별도의 검색창을 통해 google 이나 naver 등의 포털 사이트에서 검색이 가능하도록 하여, 사용자가 별도의 탭을 열어야 하는 경우를 최소화 하였으나, 보다 개선이 필요한 부분이다.

### Recoil

Recoil 은 지난 프로젝트에서도 사용했으나, 그 편리한 기능과 단방향 데이터 흐름을 지향하는 코딩 스타일을 충분히 활용하지 못했다고 판단이 되었다. 이번 프로젝트에서도 전역 상태 관리 라이브러리가 필요하여 도입하였으며, 단방향 데이터 흐름이 어떻게 구현되는지 이해할 수 있는 기회가 되었다.

Recoil 에서의 단방향 데이터 흐름은 atom 과 selector 의 구분을 통해 이루어지는데, 본 프로젝트에서는 element 에 대한 원본 데이터가 atom 형태로 저장되면, 이를 내부 조직에서 바로 활용 가능하도록 selector 에서 변환하게 된다.

작업을 진행하며 느낀 점은, 각 데이터의 직접적인 수정이 불가능하고 원본 데이터의 수정만 가능하므로 어플리케이션 내 변수 상태를 일관되도록 유지하기 용이하고, 원본 데이터만 수정해도 이로부터 파생된 모든 데이터가 자동으로 업데이트 되어 관리 포인트가 줄어든다는 점이다. 또한 특정 recoil 변수에 대한 로직이 recoil 변수 선언부에 존재하게 되어 추후 내용을 파악하고 관리하기 편리하다.
