import styled from "styled-components";

export const icons = [
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5sXof%2FbtrpQSjrN1i%2FK5lwGk9FVONRvTksAYvyJ1%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdb14Hv%2FbtrpPwOHpZj%2FSWlrCCeQrXqmckgCBqTtek%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FU810H%2FbtrpW7zBU2n%2F1OdQ7ZOldieLRjz5ICVaik%2Fimg.png",
  "https://media.vlpt.us/images/leejh4197/post/68adb8ab-468e-4cc1-aa5f-c2bdf81be0cc/KakaoTalk_20220107_120404067.png",
  "https://media.vlpt.us/images/leejh4197/post/fe6efcab-ec14-4c34-84f5-9ca8cc235049/KakaoTalk_20220107_120404067_01.png",
  "https://media.vlpt.us/images/leejh4197/post/a00a22a8-04d3-4945-aa44-5470c001517e/KakaoTalk_20220107_120404067_02.png",
  "https://media.vlpt.us/images/leejh4197/post/f7757e02-4451-486c-b7ff-ccc8fb89e0e0/KakaoTalk_20220107_120404067_03.png",
  "https://media.vlpt.us/images/leejh4197/post/9d33fa8d-b67a-4263-a02f-d1a77f24afa7/KakaoTalk_20220107_120404067_04.png",
  "https://media.vlpt.us/images/leejh4197/post/e4d92909-3a20-4419-8478-1c364d712982/KakaoTalk_20220107_120404067_06.png",
  "https://media.vlpt.us/images/leejh4197/post/06cf25d1-c814-4d1e-89d3-f53e8b38b489/KakaoTalk_20220107_120404067_08.png",
  "https://media.vlpt.us/images/leejh4197/post/02d079f1-ddab-49fb-8f59-628d5c7fd1bf/KakaoTalk_20220107_120404067_05.png",
  "https://media.vlpt.us/images/leejh4197/post/4c4d3417-5906-40fe-bdb2-9616d87ee679/KakaoTalk_20220107_120404067_09.png",
  "https://media.vlpt.us/images/leejh4197/post/87971bdc-51ba-468c-9171-935f01966df2/KakaoTalk_20220107_120404067_07.png",
  
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

