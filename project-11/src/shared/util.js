import styled from "styled-components";

export const icons = [
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5sXof%2FbtrpQSjrN1i%2FK5lwGk9FVONRvTksAYvyJ1%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdb14Hv%2FbtrpPwOHpZj%2FSWlrCCeQrXqmckgCBqTtek%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FU810H%2FbtrpW7zBU2n%2F1OdQ7ZOldieLRjz5ICVaik%2Fimg.png",
  "https://media.vlpt.us/images/leejh4197/post/3d3b2894-c5c2-4bba-973a-a2fe0933a147/KakaoTalk_20220107_011858475_02.png",
  "https://media.vlpt.us/images/leejh4197/post/46de7b53-fb22-48b6-8d52-83a8de17ce04/KakaoTalk_20220107_011858475_03.png",
  "https://media.vlpt.us/images/leejh4197/post/9a97781e-ba15-487f-998a-b8674756334e/KakaoTalk_20220107_011858475_01.png",
  "https://media.vlpt.us/images/leejh4197/post/12b3a894-3a95-4d6b-8ac9-8e1a32f98477/KakaoTalk_20220107_011858475.png",
  "https://media.vlpt.us/images/leejh4197/post/40304179-4e54-4b48-8607-37b6517c9957/KakaoTalk_20220107_011858475_04.png",
  "https://media.vlpt.us/images/leejh4197/post/4a9943f3-439e-4c2a-957d-a811a0b6509a/KakaoTalk_20220107_011858475_05.png",
  "https://media.vlpt.us/images/leejh4197/post/140cb6aa-bd86-47e6-b9c9-dce7e9a3a5ef/KakaoTalk_20220107_011858475_06.png",
  "https://media.vlpt.us/images/leejh4197/post/4bb30db3-ea5a-4779-8949-96ca40de1a40/KakaoTalk_20220107_011858475_07.png",
  "https://media.vlpt.us/images/leejh4197/post/88e2ff69-4390-4550-9f16-f461f208a4c8/KakaoTalk_20220107_012315795.png",
  "https://media.vlpt.us/images/leejh4197/post/cf8912a1-a9b5-4570-9cdd-7d6bbc03b067/KakaoTalk_20220107_012315795_01.png",

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

