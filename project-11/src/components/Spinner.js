import styled from "styled-components";

const Spinner = () => {
  return (
    <>
      <SpinnerBox>
        <img
          src="/static/Loading.gif"
          style={{ width: "130px", height: "120px" }}
          alt=""
        />
        <img
          src="/static/pingpong.png"
          style={{ width: "170px", height: "50px" }}
          alt=""
        />
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loading-box {
    display: flex;
  }
`;
