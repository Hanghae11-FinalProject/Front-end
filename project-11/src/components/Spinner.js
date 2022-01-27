import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrap>
      <div className="spinners">
        <MutatingDots
          color="#FF8B95"
          secondaryColor="#FF626F"
          height={100}
          width={100}
        />
      </div>
    </Wrap>
  );
};

export default Spinner;
const Wrap = styled.div`
  height: 100vh;
  .spinners {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
