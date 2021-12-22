import React from "react";
import styled from "styled-components";
import { GrMap } from "react-icons/gr";

const LocationSelectBox = () => {
  const option = [
    { value: "구", name: "구" },
    { value: "강남구", name: "강남구" },
    { value: "서초구", name: "서초구" },
    { value: "동대문구", name: "동대문구" },
  ];

  return (
    <React.Fragment>
      <SelectBoxWrapper>
        <LocationSelect>
          {option.map((option) => (
            <option
              key={option.value}
              value={option.value}
              hidden={option.value === "구" ? true : false}
            >
              {option.name}
            </option>
          ))}
        </LocationSelect>
        {/* <GrMap
          style={{
            marginLeft: "-20px",
            fill: "none",
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

export default LocationSelectBox;
