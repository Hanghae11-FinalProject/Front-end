import React, { useMemo } from "react";
import styled from "styled-components";
import { GrMap } from "react-icons/gr";

const SecondLocation = () => {
  const option = [
    { value: "동", name: "동" },
    { value: "파송송", name: "파송송" },
    { value: "계란탁", name: "계란탁" },
  ];

  return (
    <React.Fragment>
      <SelectBoxWrapper>
        <LocationSelect>
          {option.map((option) => (
            <option
              key={option.value}
              value={option.value}
              hidden={option.value === "동" ? true : false}
            >
              {option.name}
            </option>
          ))}
        </LocationSelect>
        {/* <GrMap
          style={{
            marginLeft: "-20px",
          }}
        /> */}
      </SelectBoxWrapper>
    </React.Fragment>
  );
};

const SelectBoxWrapper = styled.div`
  display: flex;
`;

const LocationSelect = styled.select`
  width: 75px;
  height: 30px;
  margin-left: 10px;
  margin-top: -6px;
  border-radius: 6px;
  cursor: pointer;
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
`;

export default SecondLocation;
