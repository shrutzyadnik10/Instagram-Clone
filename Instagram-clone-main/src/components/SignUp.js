/** @format */

import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
import axios from "axios";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
const SignUp = ({ setData, data }) => {
  const navigate = useNavigate();

  const [ismodal, setisModal] = useState(false);
  const formData = new FormData();
  const handleLogin = () => {
    navigate("/");
  };
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleUser = () => {
    setisModal(!ismodal);
  };

  const fileUpload = (e) => {
    data.profile_image = e.target.files[0];
    formData.append("profile_image", data.profile_image);
    formData.append("phone_number", data.phone_number);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("password", data.password);
    axios
      .post("http://localhost:2903/addUser", formData)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data._id));
        navigate("/Home");
        handleUser();
      }
      );
  };
  return (
    <Main>
      <Wrapper>
        <LogoWrapper>
          <img src={logo} width="200px" alt="image" />
        </LogoWrapper>
        <FormWrapper>
          <Input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Phone number"
            value={data.phone_number}
            onChange={handleData}
          />
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleData}
          />
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={data.username}
            onChange={handleData}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={data.password}
            onChange={handleData}
          />
          <Button onClick={handleUser}>SignUp</Button>
        </FormWrapper>
        <TextWrapper>
          Already an account?<A onClick={handleLogin}>Login</A>
        </TextWrapper>
      </Wrapper>
      <Modal
        ismodal={ismodal}
        handleUser={handleUser}
        fileUpload={fileUpload}
        Text="Pick Your Profile Pic"
      />
    </Main>
  );
};

export default SignUp;

const A = styled.a`
  padding-left: 5px;
  cursor: pointer;
  color: #0095f6;
  font-family: "Lato-Bold";
`;
const TextWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const Button = styled.button`
  width: 65%;
  height: 40px;
  padding: 10px;
  font-family: "Lato-Bold";
  color: #fff;
  cursor: pointer;
  background-color: #0095f6;
  border: none;
  border-radius: 5px;
`;
const Input = styled.input`
  height: 40px;
  padding: 10px;
  width: 65%;
  border-radius: 3px;
  border: 2px solid #e3e3e3;
  font-family: "Lato-Medium";
  color: #8e9cbb;
  margin-bottom: 10px;
  background-color: #fafafa;
`;
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  width: 200px;
  margin: 40px auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  border: 1px solid #000;
  width: 25%;
  background-color: #fff;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
`;
