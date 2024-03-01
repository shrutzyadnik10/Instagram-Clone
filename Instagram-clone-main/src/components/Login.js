/** @format */

import React, { useState } from "react";
import styled from "styled-components/macro";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setData, data }) => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const handleData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    [e.target.value] == "admin" && navigate("/Admin");
  };
  const handleLogin = () => {
    navigate("/SignUp");
  };
  const isUser = async () => {
    try {
      const resp = await axios.post("http://localhost:2903/getUser", user);
      localStorage.setItem("user", JSON.stringify(resp.data._id));
      navigate("/Home");
    } catch (e) {
      alert("user not exist");
    }
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
            placeholder="Enter Username "
            name="username"
            autoComplete="on"
            id="username"
            onChange={handleData}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            autoComplete="on"
            onChange={handleData}
          />
        </FormWrapper>
        <Button onClick={isUser}>Login</Button>
        <Orsection>
          <Line></Line>
          <Text>OR</Text>
          <Line></Line>
        </Orsection>
        <TextWrapper>
          Did'nt have account?<A onClick={handleLogin}>Sign Up</A>
        </TextWrapper>
      </Wrapper>
    </Main>
  );
};

export default Login;

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
`;
const Text = styled.div`
  position: absolute;
  bottom: -7px;
  font-family: "Lato-bold";
  font-size: 12px;
  color: #8e8e8e;
`;

const Line = styled.div`
  height: 1px;
  background-color: #dbdbdb;
  width: 100px;
`;
const Orsection = styled.div`
  margin: 30px 40px 18px;
  display: flex;
  justify-content: space-around;
  position: relative;
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
  margin-left: auto;
  margin-right: auto;
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
const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 425px;
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
