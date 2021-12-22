import React, { useState } from "react";
import ReactModal from "react-modal";
import { icons } from "../shared/util";
import { Image } from "../elements/index";

import styled from "styled-components";

const UserModal = (props) => {
  const { name, isOpen, onCancel } = props;
  const [newName, setNewName] = useState();

  const handleClose = () => {
    onCancel();
  };
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "340px",
            height: "400px",
            position: "absolute",
            top: "40%",
            left: " 50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #eee",
            borderRadius: "15px",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <ExtraIcon>
          {icons.map((item, i) => {
            return (
              <Image
                size="80"
                shape="circle"
                src={item}
                key={i}
                _className="icons"
              />
            );
          })}
        </ExtraIcon>
        <NameInput
          type="text"
          className="inputform"
          defaultValue={name}
          onChange={(e) => setNewName(e.target.value)}
        />
        <BtnBox>
          <Btn onClick={handleClose}>완료</Btn>
          <Btn onClick={handleClose}>닫기</Btn>
        </BtnBox>
      </ReactModal>
    </>
  );
};

export default UserModal;

const ExtraIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .icons {
    cursor: pointer;
  }
`;

const NameInput = styled.input`
  width: 100%;
  padding: 10px 10px;
  outline: 0;
  margin-top: 50px;
  border: 1px solid var(--border-color);
`;

const BtnBox = styled.div`
  width: 50%;
  padding: 20px 0;
  margin: 0 auto;
`;

const Btn = styled.button`
  padding: 10px 15px;
  background-color: var(--point-color);
  color: #fff;
  border-radius: 6px;
  margin: 0 5px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
