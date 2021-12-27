import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrMap } from "react-icons/gr";

const LocationSelectBox = () => {
  const option = [
    { value: "구", name: "전체" },
    { value: "강남구", name: "강남구" },
    { value: "서초구", name: "서초구" },
    { value: "동대문구", name: "동대문구" },
  ];

  return (
    <React.Fragment>
      <SelectBoxWrapper>
        <FaMapMarkerAlt className="icon" />
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
  align-items: center;

  .icon {
    color: var(--point-color);
  }
`;

const LocationSelect = styled.select`
  width: 75px;
  height: 30px;
  border-radius: 6px;
  outline: none;
  border: 0;
  font-family: "NanumSquareRound";
  cursor: pointer;
  color: var(--point-color);
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
`;

export default LocationSelectBox;
