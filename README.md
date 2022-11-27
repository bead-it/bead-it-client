# README

# 저장소

[Front-end git repository](https://github.com/bead-it/bead-it-client)

[Back-end git repository](https://github.com/bead-it/bead-it-server) : API document

# 배포

배포 준비 중

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
- 2022.11.26 v1.0.0 prototype

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

### D3.js

### Web page embedding

### Recoil

### Next.js
