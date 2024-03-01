import React from "react";
import styled, { css } from "styled-components/macro";
import Photo from "../images/Photo";
const Modal = ({ ismodal, handleUser, fileUpload, Text }) => {
  return (
    <OpenModal ismodal={ismodal}>
      <ModalContent>
        <Head>
          {Text}
          <CloseButton onClick={handleUser}>X</CloseButton>
        </Head>
        <CotentWrapper>
          <SvgWrapper>
            <Photo />
          </SvgWrapper>
          <div>
            <FileInput type="file" onChange={fileUpload} />
          </div>
        </CotentWrapper>
      </ModalContent>
    </OpenModal>
  );
};

export default Modal;

const FileInput = styled.input`
  margin-left: 80px;
`;
const SvgWrapper = styled.div`
  margin-bottom: 20px;
`;

const CotentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
`;
const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseButton = styled.div`
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
  position: absolute;
  right: 18px;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
  min-height: 500px;
`;

const OpenModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
  display: none;
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  ${({ ismodal }) =>
    ismodal &&
    css`
      display: flex;
    `}
`;
