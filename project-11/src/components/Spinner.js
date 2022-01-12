import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Grid } from "../elements/index";
import styled from "styled-components";

const Spinner = () => {
  return (
    <>
      <SpinnerBox>
           <ClimbingBoxLoader size="15"  color="#FF626F" />
           
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
