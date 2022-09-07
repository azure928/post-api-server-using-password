# 비밀번호 설정 가능한 비회원 게시판 RESTful API Server

> 원티드 프리온보딩 백엔드 코스 - 띵스플로우 기업 과제를 위한 레포지토리 입니다.

<br>

## 📢 서비스 개요

**비밀번호 설정 가능한 비회원 게시판**

- 게시글은 제목과 본문으로 구성
- 제목은 최대 20자, 본문은 최대 200자로 제한된다.
- 사용자는 게시글을 올릴 때 비밀번호를 설정할 수 있다.
- 본인이 작성한 게시물에 비밀번호 입력 후 수정, 삭제 가능
- 비밀번호는 6자 이상 / 숫자 1개 이상 반드시 포함되어야 하며 데이터베이스에 암호화된 형태로 저장된다.
- 한 페이지 내에서 모든 게시글을 최신 글 순서로 확인할 수 있다.
  - 무한 스크롤로 구현 (추가 로드는 20개씩)
- 사용자가 게시글을 업로드한 시점의 날씨(예: 맑음, 흐림, 소나기, 눈 등) 정보가 게시글에 포함된다.

### 📚 ERD

![image](https://i.imgur.com/JR5I5Pt.png)![image](https://i.imgur.com/0mnTZut.png)

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

## 💬 요구사항 구현 내용

### 요구사항1

**요구사항**

## 💡 실행 방법

```
npm install
```

```
npm start
```

## 📝 커밋 컨벤션

`Init:` 프로젝트 초기 세팅  
`Feat:` 새로운 기능 추가  
`Modify:` 코드 수정 (버그 x)  
`Fix:` 버그 수정 (올바르지 않은 동작을 고친 경우에 사용)  
`Docs:` 문서 작성, 수정  
`Style:` 코드 스타일 수정 (개행 등)  
`refactor:` 코드 리팩토링 (코드의 기능 변화 없이 수정)  
`Test:` 테스트 코드 추가  
`Chore:` 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
