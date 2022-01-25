# Pingpong

현대인을 위한 물물교환 서비스 '핑퐁'
<br></br>
<img src="https://i0.wp.com/www.midnightinsomewhere.com/wp-content/uploads/2022/01/ping.gif?resize=640%2C357&ssl=1" alt="front"  width="90%" />
<br></br>

🏓 [사이트 바로가기](https://pingpong-market.shop/) <br/>
💻 시연영상 보러가기

<br></br>

# '핑퐁' 팀원 소개

### FrontEnd

- [우민기](https://github.com/WooMinGy) 👨🏻‍✈️
- [이주형](https://github.com/leejh4197)
- [정민경](https://github.com/keimindev)

### BackEnd

- [김우진](https://github.com/woojin126)
- [서유리](https://github.com/uriseozz)
- [정영빈](https://github.com/jybin96)

### Designer

- 이인영
- 정혜지

<br></br>

# 개발 기간

프로젝트 : 핑퐁(Pingpong)

기획 & 개발 기간 : 21.12.27 - 22.01.23 (총 5주)

개발 인원 총 8 명 (프론트 3명 백엔드 3명 디자이너 2명)

프론트 개발 언어 : Javascript

프론트 개발 라이브러리 : React.js , Redux, SockJS-client

프론트 개발툴 : VSC, git, figma

<br></br>

# FrontEnd 기술 스택

- React.Js
  - Styled-component
  - react-router-dom
  - react-hook-form
  - react-stomp / sockJs-client
  - swiper
- Redux
- Axiox

<br></br>

# 프로젝트 구조

<img src="https://i0.wp.com/www.midnightinsomewhere.com/wp-content/uploads/2022/01/KakaoTalk_20220122_160559834.jpg?resize=768%2C432&ssl=1" alt="architecture"  width="90%" />
<br></br>
<br></br>

# 프로젝트 주요 기능

1. [로그인, 회원가입, 소셜 로그인(카카오)](<#로그인,-회원가입,-소셜-로그인(카카오)>)
2. [게시물 카테고리, 지역별 필터 기능](#게시물-카테고리,지역별-필터-기능)
3. [게시물 검색](#게시물-검색)
4. [게시물 댓글, 대댓글, 해시태그,즐겨찾기 추가](#게시물-댓글,-대댓글,-해시태그,즐겨찾기-추가)
5. [유저 프로필 변경](#유저-프로필-변경)
6. [실시간 채팅](#실시간-채팅)
   <br></br>
   <br></br>

# 로그인, 회원가입, 소셜 로그인(카카오)

- JWT 토큰 기반으로 구성된 로그인을 지원하고, 인증이 완료된 토큰을 쿠키에 담아서 사용합니다.
- 사용자 친화적인 서비스 제공을 위하여 카카오 소셜 로그인을 구현하였습니다.
- 회원가입 페이지에서는 사이트에서 사용할 이메일과 닉네임을 설정하고 중복확인이 충족되어야 가입이 가능합니다.
  <br></br>

# 게시물 카테고리,지역별 필터 기능

- 전체 게시물을 볼 수 있고 지역과 카테고리로 게시물을 필터링 할 수 있습니다.
- API로 카테고리 / 지역 값을 보내고 게시물을 6개씩 페이지 순으로 받아와서 무한스크롤로 보여줍니다.
  <br></br>

# 게시물 검색

- 검색 키워드를 입력하면 게시물의 제목, 내용, 교환물품, 해시태그에 사용된 키워드를 기반으로 해당 게시물을 찾아서 보여줍니다.
- 한 키워드에 많은 게시물이 나올 수 있기에 무한 스크롤을 적용하고 페이지별로 6개씩 게시물을 보여줄 수 있게 구현했습니다.
- 자신이 검색한 최신 키워드 총 5 개와 현재 인기 검색어 랭크를 볼 수 있습니다.
  <br></br>

# 게시물 댓글, 대댓글, 해시태그,즐겨찾기 추가

- 채팅을 하지 않더라도 물물교환을 원하는 사용자가 게시글 작성자에게 궁금한 것들을 댓글로 물어볼 수 있고, 게시글 작성자는 답을 해줄 수 있게 사용자들의 편의성을 위해서 댓글과 대댓글을 구현했습니다.
- 관심있는 게시물을 즐겨찾기로 추가해두고 마이 페이지에서 확인하실 수 있습니다
  <br></br>

# 유저 프로필 변경

- 새 닉네임은 중복 확인 후 변경이 가능
- 프로필 이미지는 만들어져 있는 프로필 이미지 중 선택하여 변경이 가능합니다.
- 닉네임,프로필 이미지 개별적으로 변경가능
  <br></br>

# 실시간 채팅

- 상세 게시글에서 작성자에게 교환 거래를 하기 위해서 채팅을 걸 수 있습니다.
- 상세글의 댓글과 대댓글에서도 교환하고 싶은 품목에 대해 게시자가 채팅을 걸 수도 있습니다.
- 실시간으로 채팅을 할 수 있으며 메뉴바에서 새로 들어온 채팅 알림을 보실 수 있습니다.

  <br></br>
  <br></br>

# User Flow Chart

<img src="https://i0.wp.com/www.midnightinsomewhere.com/wp-content/uploads/2022/01/userflow-1.png?resize=768%2C782&ssl=1" alt="flowchart" width="90%"/>
<br></br>
<br></br>
<br></br>

# PingPong Page

<p text-align="center">
<img src="https://user-images.githubusercontent.com/25544668/150818035-4499a92c-0d19-4ce2-b4fa-b9efedf4229d.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150818262-adc691ac-7b51-452f-9059-b1b0f275be6e.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150818526-ec5f2fad-6b9c-4fad-80c5-e633ccf9dd38.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150818618-8b093db6-7cf5-409f-92f5-9623d3cfe8bb.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819254-853dab4b-2db6-46fe-8a23-926d331c5a58.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819362-d2fe9a64-cfe5-483e-a27a-3a9b679be6c2.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819576-650785a0-cfaf-4b6a-9b04-b4f5d1dc2295.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819583-7bde66f2-2d4a-4917-8308-b2dcc7b52fcf.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819584-1dbb3226-4931-4a02-b7fe-2088bf4c0635.png" width="150px" alt="page" />
<img src="https://user-images.githubusercontent.com/25544668/150819587-2a431876-845e-4e3f-9c37-c2a75af69b20.png" width="150px" alt="page" />
<img src="https://i0.wp.com/www.midnightinsomewhere.com/wp-content/uploads/2022/01/page12.png?resize=248%2C482&ssl=1" width="150px" alt="page" />
<img src="https://i0.wp.com/www.midnightinsomewhere.com/wp-content/uploads/2022/01/page13.png?resize=248%2C482&ssl=1" width="150px" alt="page" />
</p>
