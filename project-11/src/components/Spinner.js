import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrap>
      <div className="cssload-dots">
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="12"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 18 -7"
              result="goo"
            ></feColorMatrix>
            {/* <feBlend in2="goo" in="SourceGraphic" result="mix" ></feBlend> */}
          </filter>
        </defs>
      </svg>
    </Wrap>
  );
};

export default Spinner;

const Wrap = styled.div`

  height: 100vh;

  .cssload-dots {
    width: 0;
    height: 0;
    position: absolute;

    top: 0;

    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    outline: 1px solid red;
  }

  .cssload-dot {
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .cssload-dot:before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 39px;
    background: rgb(255, 98, 111);
    position: absolute;
    left: 50%;
    transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    margin-left: -13.5px;
    margin-top: -13.5px;
  }

  .cssload-dot:nth-child(5):before {
    z-index: 100;
    width: 33px;
    height: 33px;
    margin-left: -17.75px;
    margin-top: -17.75px;
    animation: cssload-dot-colors 4s ease infinite;
    -o-animation: cssload-dot-colors 4s ease infinite;
    -ms-animation: cssload-dot-colors 4s ease infinite;
    -webkit-animation: cssload-dot-colors 4s ease infinite;
    -moz-animation: cssload-dot-colors 4s ease infinite;
  }

  .cssload-dot:nth-child(1) {
    animation: cssload-dot-rotate-1 4s 0s linear infinite;
    -o-animation: cssload-dot-rotate-1 4s 0s linear infinite;
    -ms-animation: cssload-dot-rotate-1 4s 0s linear infinite;
    -webkit-animation: cssload-dot-rotate-1 4s 0s linear infinite;
    -moz-animation: cssload-dot-rotate-1 4s 0s linear infinite;
  }
  .cssload-dot:nth-child(1):before {
    background-color: rgb(255, 139, 149);
    animation: cssload-dot-move 4s 0s ease infinite;
    -o-animation: cssload-dot-move 4s 0s ease infinite;
    -ms-animation: cssload-dot-move 4s 0s ease infinite;
    -webkit-animation: cssload-dot-move 4s 0s ease infinite;
    -moz-animation: cssload-dot-move 4s 0s ease infinite;
  }

  .cssload-dot:nth-child(2) {
    animation: cssload-dot-rotate-2 4s 1s linear infinite;
    -o-animation: cssload-dot-rotate-2 4s 1s linear infinite;
    -ms-animation: cssload-dot-rotate-2 4s 1s linear infinite;
    -webkit-animation: cssload-dot-rotate-2 4s 1s linear infinite;
    -moz-animation: cssload-dot-rotate-2 4s 1s linear infinite;
  }
  .cssload-dot:nth-child(2):before {
    background-color: rgb(179, 187, 236);
    animation: cssload-dot-move 4s 1s ease infinite;
    -o-animation: cssload-dot-move 4s 1s ease infinite;
    -ms-animation: cssload-dot-move 4s 1s ease infinite;
    -webkit-animation: cssload-dot-move 4s 1s ease infinite;
    -moz-animation: cssload-dot-move 4s 1s ease infinite;
  }

  .cssload-dot:nth-child(3) {
    animation: cssload-dot-rotate-3 4s 2s linear infinite;
    -o-animation: cssload-dot-rotate-3 4s 2s linear infinite;
    -ms-animation: cssload-dot-rotate-3 4s 2s linear infinite;
    -webkit-animation: cssload-dot-rotate-3 4s 2s linear infinite;
    -moz-animation: cssload-dot-rotate-3 4s 2s linear infinite;
  }
  .cssload-dot:nth-child(3):before {
    background-color: rgb(224, 179, 236);
    animation: cssload-dot-move 4s 2s ease infinite;
    -o-animation: cssload-dot-move 4s 2s ease infinite;
    -ms-animation: cssload-dot-move 4s 2s ease infinite;
    -webkit-animation: cssload-dot-move 4s 2s ease infinite;
    -moz-animation: cssload-dot-move 4s 2s ease infinite;
  }

  .cssload-dot:nth-child(4) {
    animation: cssload-dot-rotate-4 4s 3s linear infinite;
    -o-animation: cssload-dot-rotate-4 4s 3s linear infinite;
    -ms-animation: cssload-dot-rotate-4 4s 3s linear infinite;
    -webkit-animation: cssload-dot-rotate-4 4s 3s linear infinite;
    -moz-animation: cssload-dot-rotate-4 4s 3s linear infinite;
  }
  .cssload-dot:nth-child(4):before {
    background-color: rgb(255, 98, 111);
    animation: cssload-dot-move 4s 3s ease infinite;
    -o-animation: cssload-dot-move 4s 3s ease infinite;
    -ms-animation: cssload-dot-move 4s 3s ease infinite;
    -webkit-animation: cssload-dot-move 4s 3s ease infinite;
    -moz-animation: cssload-dot-move 4s 3s ease infinite;
  }

  @keyframes cssload-dot-move {
    0% {
      transform: translateY(0);
    }
    18%,
    22% {
      transform: translateY(-54px);
    }
    40%,
    100% {
      transform: translateY(0);
    }
  }

  @-o-keyframes cssload-dot-move {
    0% {
      -o-transform: translateY(0);
    }
    18%,
    22% {
      -o-transform: translateY(-54px);
    }
    40%,
    100% {
      -o-transform: translateY(0);
    }
  }

  @-ms-keyframes cssload-dot-move {
    0% {
      -ms-transform: translateY(0);
    }
    18%,
    22% {
      -ms-transform: translateY(-54px);
    }
    40%,
    100% {
      -ms-transform: translateY(0);
    }
  }

  @-webkit-keyframes cssload-dot-move {
    0% {
      -webkit-transform: translateY(0);
    }
    18%,
    22% {
      -webkit-transform: translateY(-54px);
    }
    40%,
    100% {
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes cssload-dot-move {
    0% {
      -moz-transform: translateY(0);
    }
    18%,
    22% {
      -moz-transform: translateY(-54px);
    }
    40%,
    100% {
      -moz-transform: translateY(0);
    }
  }

  @keyframes cssload-dot-colors {
    0% {
      background-color: rgb(255, 98, 111);
    }
    25% {
      background-color: rgb(255, 139, 149);
    }
    50% {
      background-color: rgb(179, 187, 236);
    }
    75% {
      background-color: rgb(224, 179, 236);
    }
    100% {
      background-color: rgb(255, 98, 111);
    }
  }

  @-o-keyframes cssload-dot-colors {
    0% {
      background-color: rgb(255, 98, 111);
    }
    25% {
      background-color: rgb(255, 139, 149);
    }
    50% {
      background-color: rgb(179, 187, 236);
    }
    75% {
      background-color: rgb(224, 179, 236);
    }
    100% {
      background-color: rgb(255, 98, 111);
    }
  }

  @-ms-keyframes cssload-dot-colors {
    0% {
      background-color: rgb(255, 98, 111);
    }
    25% {
      background-color: rgb(255, 139, 149);
    }
    50% {
      background-color: rgb(179, 187, 236);
    }
    75% {
      background-color: rgb(224, 179, 236);
    }
    100% {
      background-color: rgb(255, 98, 111);
    }
  }

  @-webkit-keyframes cssload-dot-colors {
    0% {
      background-color: rgb(255, 98, 111);
    }
    25% {
      background-color: rgb(255, 139, 149);
    }
    50% {
      background-color: rgb(179, 187, 236);
    }
    75% {
      background-color: rgb(224, 179, 236);
    }
    100% {
      background-color: rgb(255, 98, 111);
    }
  }

  @-moz-keyframes cssload-dot-colors {
    0% {
      background-color: rgb(255, 98, 111);
    }
    25% {
      background-color: rgb(255, 139, 149);
    }
    50% {
      background-color: rgb(179, 187, 236);
    }
    75% {
      background-color: rgb(224, 179, 236);
    }
    100% {
      background-color: rgb(255, 98, 111);
    }
  }

  @keyframes cssload-dot-rotate-1 {
    0% {
      transform: rotate(-105deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }

  @-o-keyframes cssload-dot-rotate-1 {
    0% {
      -o-transform: rotate(-105deg);
    }
    100% {
      -o-transform: rotate(270deg);
    }
  }

  @-ms-keyframes cssload-dot-rotate-1 {
    0% {
      -ms-transform: rotate(-105deg);
    }
    100% {
      -ms-transform: rotate(270deg);
    }
  }

  @-webkit-keyframes cssload-dot-rotate-1 {
    0% {
      -webkit-transform: rotate(-105deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
    }
  }

  @-moz-keyframes cssload-dot-rotate-1 {
    0% {
      -moz-transform: rotate(-105deg);
    }
    100% {
      -moz-transform: rotate(270deg);
    }
  }

  @keyframes cssload-dot-rotate-2 {
    0% {
      transform: rotate(165deg);
    }
    100% {
      transform: rotate(540deg);
    }
  }

  @-o-keyframes cssload-dot-rotate-2 {
    0% {
      -o-transform: rotate(165deg);
    }
    100% {
      -o-transform: rotate(540deg);
    }
  }

  @-ms-keyframes cssload-dot-rotate-2 {
    0% {
      -ms-transform: rotate(165deg);
    }
    100% {
      -ms-transform: rotate(540deg);
    }
  }

  @-webkit-keyframes cssload-dot-rotate-2 {
    0% {
      -webkit-transform: rotate(165deg);
    }
    100% {
      -webkit-transform: rotate(540deg);
    }
  }

  @-moz-keyframes cssload-dot-rotate-2 {
    0% {
      -moz-transform: rotate(165deg);
    }
    100% {
      -moz-transform: rotate(540deg);
    }
  }

  @keyframes cssload-dot-rotate-3 {
    0% {
      transform: rotate(435deg);
    }
    100% {
      transform: rotate(810deg);
    }
  }

  @-o-keyframes cssload-dot-rotate-3 {
    0% {
      -o-transform: rotate(435deg);
    }
    100% {
      -o-transform: rotate(810deg);
    }
  }

  @-ms-keyframes cssload-dot-rotate-3 {
    0% {
      -ms-transform: rotate(435deg);
    }
    100% {
      -ms-transform: rotate(810deg);
    }
  }

  @-webkit-keyframes cssload-dot-rotate-3 {
    0% {
      -webkit-transform: rotate(435deg);
    }
    100% {
      -webkit-transform: rotate(810deg);
    }
  }

  @-moz-keyframes cssload-dot-rotate-3 {
    0% {
      -moz-transform: rotate(435deg);
    }
    100% {
      -moz-transform: rotate(810deg);
    }
  }

  @keyframes cssload-dot-rotate-4 {
    0% {
      transform: rotate(705deg);
    }
    100% {
      transform: rotate(1080deg);
    }
  }

  @-o-keyframes cssload-dot-rotate-4 {
    0% {
      -o-transform: rotate(705deg);
    }
    100% {
      -o-transform: rotate(1080deg);
    }
  }

  @-ms-keyframes cssload-dot-rotate-4 {
    0% {
      -ms-transform: rotate(705deg);
    }
    100% {
      -ms-transform: rotate(1080deg);
    }
  }

  @-webkit-keyframes cssload-dot-rotate-4 {
    0% {
      -webkit-transform: rotate(705deg);
    }
    100% {
      -webkit-transform: rotate(1080deg);
    }
  }

  @-moz-keyframes cssload-dot-rotate-4 {
    0% {
      -moz-transform: rotate(705deg);
    }
    100% {
      -moz-transform: rotate(1080deg);
    }
  }
`;