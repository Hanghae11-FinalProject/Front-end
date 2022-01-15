import styled from "styled-components";

export const icons = [
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5sXof%2FbtrpQSjrN1i%2FK5lwGk9FVONRvTksAYvyJ1%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdb14Hv%2FbtrpPwOHpZj%2FSWlrCCeQrXqmckgCBqTtek%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FU810H%2FbtrpW7zBU2n%2F1OdQ7ZOldieLRjz5ICVaik%2Fimg.png",
  "https://media.vlpt.us/images/leejh4197/post/ecbc741d-15fa-4264-8326-a028e0b3d512/KakaoTalk_20220114_223040300.png",
  "https://media.vlpt.us/images/leejh4197/post/6183c264-2e2b-45f5-8542-1efa7fde0463/KakaoTalk_20220114_223040300_01.png",
  "https://media.vlpt.us/images/leejh4197/post/31d68ed0-d39f-42f0-b804-13e9913de2a0/KakaoTalk_20220114_223040300_02.png",
  "https://media.vlpt.us/images/leejh4197/post/176dcf83-572f-4867-8602-6b72a7e0c1f4/KakaoTalk_20220114_223040300_03.png",
  "https://media.vlpt.us/images/leejh4197/post/c305d436-e2c3-4945-9697-1e4444633926/KakaoTalk_20220114_223040300_04.png",
  "https://media.vlpt.us/images/leejh4197/post/d4b5813d-5628-41be-ac72-357e114b4d52/KakaoTalk_20220114_223040300_05.png",
  "https://media.vlpt.us/images/leejh4197/post/18015073-ed0b-4780-93ce-854608cc683e/KakaoTalk_20220114_223040300_06.png",
  "https://media.vlpt.us/images/leejh4197/post/dee67423-8759-4b2c-b752-4ab28789b1b4/KakaoTalk_20220114_223040300_07.png",
  "https://media.vlpt.us/images/leejh4197/post/f974c1cf-63b9-43ca-b1b1-32500d9afcab/KakaoTalk_20220114_223040300_08.png",
  "https://media.vlpt.us/images/leejh4197/post/c5911952-562f-4f5e-866e-e1f956b2713e/KakaoTalk_20220114_223040300_09.png",
  
];

export const copyUrlToClip = () => {
  const dummy = document.createElement("input");
  const text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

