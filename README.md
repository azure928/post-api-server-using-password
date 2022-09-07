# 비밀번호 설정 가능한 비회원 게시판 RESTful API Server

> 원티드 프리온보딩 백엔드 코스 - 띵스플로우 기업 과제를 위한 레포지토리 입니다.

<br>

## 📢 서비스 개요 (요구사항 분석)

**비밀번호 설정 가능한 비회원 게시판**

- 게시글은 제목과 본문으로 구성
- 제목은 최대 20자, 본문은 최대 200자로 제한된다.
- 사용자는 게시글을 올릴 때 비밀번호를 설정할 수 있다.
- 본인이 작성한 게시물에 비밀번호 입력 후 수정, 삭제 가능
- 비밀번호는 6자 이상 / 숫자 1개 이상 반드시 포함되어야 하며 데이터베이스에 암호화된 형태로 저장된다.
- 한 페이지 내에서 모든 게시글을 최신 글 순서로 확인할 수 있다.
  - 무한 스크롤로 구현 (추가 로드는 20개씩)
- 사용자가 게시글을 업로드한 시점의 날씨(예: 맑음, 흐림, 소나기, 눈 등) 정보가 게시글에 포함된다.
  <br>

### 📚 ERD

![image](https://i.imgur.com/6CGiAjq.png)

### ⚒ 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `MySQL`
- ORM : `Prisma`

### 📂 폴더 구조

```
├── 📁components
│   ├── indexRouter.js
│   └── 📁posts
│	    └── postController.js
│	    └── postRepository.js
│	    └── postRouter.js
│	    └── postService.js
├── 📁middleware
│   └── validator.js
├── 📁node_modules
├── 📁prisma
│   ├── prisma-client.js
│   └── schema.prisma
├── .env
├── .gitignore
├── .eslintrc
├── .prettierrc
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

### 🔐 환경 변수 설정

```JSON
PORT="10010"  // 포트번호
DATABASE_URL="mysql://user:mysql비밀번호@localhost:mysql설정된port/데이터베이스이름"
WEATHER_API_KEY=1234567 //발급 받은 Weather API key
```

<br>

## 📃 API DOCS

**[🔗 PostMan API Document](https://documenter.getpostman.com/view/21288917/VVBS1o9Z)**

<br>

## 💬 요구사항 구현 내용

### 1. 게시물 등록

- 제시된 제약 조건에 대해 express-validator를 이용하여 validation 구현했습니다.

  - 제목은 최대 20자, 본문은 최대 200자로 제한
  - 비밀번호는 6자 이상 / 숫자 1개 이상 반드시 포함

- 이용자가 입력한 비밀번호를 bcrypt를 이용하여 암호화된 형태로 데이터베이스에 저장하도록 구현했습니다.

- Real-time Weather API 이용하여 게시글을 업로드한 시점의 날씨 정보가 게시글에 포함되도록 구현했습니다.

- **Method** : POST
- **URI** : /posts
- **Requset**

  ```json
  // req.body :
  {
    "title": "게시물을 작성하는 기능 구현중😀",
    "content": "재밌네요🎈 현재 날씨도 입력되도록 구현했어요.",
    "writer": "육지",
    "password": "123사오육"
  }
  ```

- **Response**
  - 성공 : 201 Created
  - 제목을 입력하지 않았을 때 : 400 Bad Request
  - 비밀번호를 입력하지 않았을 때 : 400 Bad Request
  - 비밀번호가 6자 미만일 때 : 400 Bad Request
  - 비밀번호에 숫자가 포함되어 있지 않을 때 : 400 Bad Request
  - 제목이 20자를 초과했을 때 : 400 Bad Request
  - 본문이 200자를 초과했을 때 : 400 Bad Request

---

### 2. 게시물 수정

- 입력받은 비밀번호와 DB에 저장된 비밀번호를 비교하여 일치할 경우에만 수정 가능하도록 구현했습니다.

- **Method** : PUT
- **URI** : /posts/:id
- **Requset**

  ```json
  // req.body :
  {
    "title": "졸리네요 🐷",
    "content": "졸립니다...👻",
    "password": "일이삼456"
  }
  ```

- **Response**
  - 성공 : 201 Created
  - 제목을 입력하지 않았을 때 : 400 Bad Request
  - 비밀번호를 입력하지 않았을 때 : 400 Bad Request
  - 해당하는 게시물이 존재하지 않을 때 : 404 Not Found
  - 제목이 20자를 초과했을 때 : 400 Bad Request
  - 본문이 200자를 초과했을 때 : 400 Bad Request
  - 비밀번호가 일치하지 않을 때 : 401 Unauthorized

---

### 3. 게시물 삭제

- 입력받은 비밀번호와 DB에 저장된 비밀번호를 비교하여 일치할 경우에만 삭제 가능하도록 구현했습니다.

- **Method** : DELETE
- **URI** : /posts/:id
- **Requset**

  ```json
  // req.body :
  {
    "password": "일12345"
  }
  ```

- **Response**
  - 성공 : 200 OK
  - 비밀번호를 입력하지 않았을 때 : 400 Bad Request
  - 해당하는 게시물이 존재하지 않을 때 : 404 Not Found
  - 비밀번호가 일치하지 않을 때 : 401 Unauthorized

---

### 4. 게시물 목록

- query string 으로 page number를 받아서 게시물 목록을 최신순으로 20개씩 조회합니다.

- **Method** : GET
- **URI** : posts?page=1
- **Requset**

  ```json
  // req.query:
  {
    "page": "1"
  }
  ```

- **Response**
  - 성공 : 200 OK
  ```json
  [
    {
      "id": 23,
      "title": "제목23",
      "content": "내용",
      "writer": "작성자",
      "password": "비밀번호",
      "weather": null,
      "status": 1,
      "created_at": "2022-09-06T22:46:07.000Z",
      "updated_at": "2022-09-06T22:46:07.000Z"
    },
    {
      "id": 22,
      "title": "제목22",
      "content": "내용",
      "writer": "작성자",
      "password": "비밀번호",
      "weather": null,
      "status": 1,
      "created_at": "2022-09-06T22:46:02.000Z",
      "updated_at": "2022-09-06T22:46:02.000Z"
    }
  ]
  ```
  - 게시물이 하나도 없을 때 : 204 No Content

<br>

## 💡 실행 방법

```
npm install
```

```
npm start
```

<br>

## 📝 커밋 컨벤션

- `Init:` 프로젝트 초기 세팅
- `Feat:` 새로운 기능 추가
- `Modify:` 코드 수정 (버그 x)
- `Fix:` 버그 수정 (올바르지 않은 동작을 고친 경우에 사용)
- `Docs:` 문서 작성, 수정
- `Style:` 코드 스타일 수정 (개행 등)
- `refactor:` 코드 리팩토링 (코드의 기능 변화 없이 수정)
- `Test:` 테스트 코드 추가
- `Chore:` 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
