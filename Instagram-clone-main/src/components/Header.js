import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import logo from "../images/logo.png";
import searchIcon from "../images/search-icon.png";
import home from "../images/icon/home-icon.png";
import like from "../images/icon/like-icon.png";
import message from "../images/icon/message-icon.png";
import navigation from "../images/icon/navigation-icon.png";
import post from "../images/icon/post-icon.png";
import Post from "./Post";
import Modal from "./Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ismodal, setisModal] = useState(false);
  const [data, setData] = useState();

  const navigate = useNavigate();
  const handleUser = () => {
    setisModal(!ismodal);
  };

  const navigateUser = () => {
    navigate({
      pathname: "/Profile",
      search: `?id=${user}`,
    });
  };

  useEffect(() => {
    getOneUser();
  }, []);
  const getOneUser = async () => {
    const resp = await axios.get(`http://localhost:2903/getOneUser/${user}`);
    setData(resp.data);
  };

  const fileUpload = async (e) => {
    const formData = new FormData();
    formData.append("userId", user);
    formData.append("post_image", e.target.files[0]);
    const resp = await axios.post("http://localhost:2903/addPost", formData);
    setisModal(!ismodal);
  };

  const LogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const deleteUser = async () => {
    const formData = new FormData();
    formData.append("userId", user);
    const resp = await axios.post(
      "http://localhost:2903/user/delete",
      formData
    );
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <MainWrapper>
        <Nav>
          <LogoWrapper></LogoWrapper>
          <InputWrapper>
            <SerachIconWrapper />
            <Input type="text" placeholder="Search" />
          </InputWrapper>
          <Icon>
            <Home />
            <Message />
            <StyledPost onClick={handleUser} />
            <Modal
              ismodal={ismodal}
              handleUser={handleUser}
              fileUpload={fileUpload}
            />
            <Navigation />
            <Like />
            <DropDown>
              <PP image={data?.profile_image} onClick={navigateUser} />
              <DropDownContent>
                <Content onClick={LogoutUser}>Log Out</Content>
                <Content onClick={deleteUser}>Delete Account</Content>
              </DropDownContent>
            </DropDown>
          </Icon>
        </Nav>
      </MainWrapper>
      <Post />
    </>
  );
}

export default Header;

const Content = styled.div``;

const DropDownContent = styled.div`
  cursor: pointer;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 5px;
  > div {
    padding-bottom: 10px;
  }
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${DropDownContent} {
      display: flex;
      flex-direction: column;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  padding-left: 10px;
  background-color: white;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const PP = styled.div`
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `}
  background-size: cover;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  margin-left: 22px;
  border-radius: 50%;
  background-position: center;
  cursor: pointer;
`;
const Like = styled.div`
  background-image: url(${like});
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  margin-left: 22px;
  cursor: pointer;
`;
const Navigation = styled.div`
  background-image: url(${navigation});
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  margin-left: 22px;
  cursor: pointer;
`;
const StyledPost = styled.div`
  background-image: url(${post});
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  margin-left: 22px;
  cursor: pointer;
`;
const Message = styled.div`
  background-image: url(${message});
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  margin-left: 22px;
  cursor: pointer;
`;
const Home = styled.div`
  background-image: url(${home});
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
const Icon = styled.div`
  display: flex;
  background-color: white;
`;
const SerachIconWrapper = styled.div`
  background-image: url(${searchIcon});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  width: 17px;
  height: 20px;
  top: 10px;
  left: 15px;
  background-color: #efefef;
`;
const Input = styled.input`
  background-color: #efefef;
  font-size: 15px;
  border: none;
  border-radius: 7px;
  height: 35px;
  width: 250px;
  &:focus {
    outline: none;
  }
  padding-left: 30px;
`;
const Nav = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  width: 60%;
  padding-bottom: 10px;
  justify-content: space-between;
  background-color: white;
  @media (max-width: 1000px) {
    justify-content: space-between;
    width: max-content;
    padding-bottom: 6px;
  }
`;
const MainWrapper = styled.div`
  background-color: white;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  width: 100%;
  z-index: 3;
  position: fixed;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;
const LogoWrapper = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px;
  background-color: white;
`;
