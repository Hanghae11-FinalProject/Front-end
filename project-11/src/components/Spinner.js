import ScaleLoader from "react-spinners/ScaleLoader";
import { Grid } from "../elements/index";
import styled from "styled-components";

const Spinner = () => {
  return (
    <>
      <SpinnerBox>
        <ScaleLoader height="50" width="10" color="#FF626F" radius="8" />
      </SpinnerBox>
    </>
  );
};

export default Spinner;

const SpinnerBox = styled.div`
  width: 100%;
  max-width: 429px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;
