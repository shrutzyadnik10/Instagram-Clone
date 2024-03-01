import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = useState([]);
  const [ismodal, setisModal] = useState(false);
  const navigate = useNavigate();
  const getUser = async () => {
    const resp = await axios.post("http://localhost:2903/getAllUser");
    setUser(resp.data);
  };

  const navigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = (userId) => async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    await axios.post("http://localhost:2903/user/delete", formData);
    setisModal(!Modal);
    getUser();
  };
  return (
    <>
      <Main>
        <h1>Admin Panel</h1>
        <Logout onClick={navigateHome}>Logout</Logout>
      </Main>
      <Wrapper>
        {user.map((el) => (
          <>
            <Data>
              <User
                profile={el.profile_image}
                key={el._id}
                onDoubleClick={() => setisModal(!ismodal)}
              ></User>
              <UserName>{el.username}</UserName>
            </Data>
            <OpenModal ismodal={ismodal}>
              <ModalContent>
                <Text>Do You want to delete this User?</Text>
                <ButtonWrapper>
                  <DeleteBtn onClick={deleteUser(el._id)}>Delete</DeleteBtn>
                  <CancelBtn onClick={() => setisModal(!Modal)}>
                    Cancel
                  </CancelBtn>
                </ButtonWrapper>
              </ModalContent>
            </OpenModal>
          </>
        ))}
      </Wrapper>
    </>
  );
};

export default Admin;

const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 16px;
  font-family: "Lato-Medium";
  text-align: center;
`;

const Logout = styled.button`
  position: absolute;
  top: 20px;
  cursor: pointer;
  right: 80px;
  width: 150px;
  border-radius: 10px;
  border: none;
  padding: 20px;
`;

const CancelBtn = styled.div`
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Lato-Regular";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
`;

const DeleteBtn = styled.button`
  background-color: initial;
  background-image: linear-gradient(-180deg, #ff7e31, #e62c03);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Lato-Bold";
  height: 40px;
  line-height: 40px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  width: 100px;
  z-index: 9;
  border: 0;
  transition: box-shadow 0.2s;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  align-items: baseline;
`;
const Text = styled.div`
  display: flex;
  padding: 20px;
  font-family: "Lato-Bold";
  font-size: 16px;
`;
const OpenModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
  display: none;
  opacity: 0.5;
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  ${({ ismodal }) =>
    ismodal &&
    css`
      display: flex;
    `}
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 23rem;
  border-radius: 0.5rem;
  min-height: 150px;
`;

const User = styled.div`
  ${({ profile }) =>
    profile &&
    css`
      background-image: url(${profile});
    `}
  height: 275px;
  width: 274px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  margin: 150px;
`;
