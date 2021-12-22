import React, { useMemo } from "react";
import styled from "styled-components";

const LocationSelectBox = () => {
  const option = [
    { value: "지역", name: "지역" },
    { value: "강남구", name: "강남구" },
    { value: "서초구", name: "서초구" },
    { value: "송파구", name: "송파구" },
  ];

  return (
    <React.Fragment>
      <LocationSelect>
        {option.map((option) => (
          <option
            key={option.value}
            value={option.value}
            hidden={option.value === "지역" ? true : false}
          >
            {option.name}
          </option>
        ))}
      </LocationSelect>
    </React.Fragment>
  );
};

const LocationSelect = styled.select`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  margin-top: -2px;
  border-radius: 6px;
`;

export default LocationSelectBox;
