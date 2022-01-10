import ScaleLoader from "react-spinners/ScaleLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { Grid } from "../elements/index";
import styled from "styled-components";

const Spinner = () => {
  return (
    <>
      <SpinnerBox>
           <PuffLoader size="60px" color="#FF626F" margin="2px" />
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
