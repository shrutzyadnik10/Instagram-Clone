import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import pp from "../images/icon/pp.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const [isUser, setIsUser] = useState();
  const followUserData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser();
    getOneUser();
  }, []);

  const getAllUser = async () => {
    const resp = await axios.post("http://localhost:2903/getAllUser");
    setData(resp.data);
  };
  const getOneUser = async () => {
    const resp = await axios.get(`http://localhost:2903/getOneUser/${user}`);
    setIsUser(resp.data);
  };
  const followUser = async (userId) => {
    followUserData.append("userId", user);
    followUserData.append("followUserId", userId);
    const resp = await axios.post(
      "http://localhost:2903/follow",
      followUserData
    );
    getAllUser();
  };
  const followUserById = async (userId) => {
    followUser(userId);
    await getAllUser();
  };

  const navigateUser = (userId) => () => {
    navigate({
      pathname: "/Profile",
      search: `?id=${userId}`,
    });
  };
  return (
    <Content>
      <StoryWrapper>
        <Story image={isUser?.profile_image} />
        <Namewrapper>
          <Name>{isUser?.name}</Name>
          <SubName>{isUser?.username}</SubName>
        </Namewrapper>
        <Switch>Switch</Switch>
      </StoryWrapper>
      <Container>
        <SuggestionWrapper>
          <Suggestion>Suggestions For You</Suggestion>
          <See>See All</See>
        </SuggestionWrapper>
        {data?.map((el) => {
          if (el._id === user) return;
          return (
            !isUser?.following?.includes(el._id) && (
              <People key={el._id}>
                <ProfilePP image={el.profile_image} />
                <Suggested>
                  <TitleName onClick={navigateUser(el._id)}>
                    {el.name}
                  </TitleName>
                </Suggested>
                <Follow onClick={() => followUserById(el._id)}>Follow</Follow>
              </People>
            )
          );
        })}
        <Footer>
          <li>
            <Span>About</Span>
          </li>
          <li>
            <Span>Help</Span>
          </li>
          <li>
            <Span>Press</Span>
          </li>
          <li>
            <Span>API</Span>
          </li>
          <li>
            <Span>Jobs</Span>
          </li>
          <li>
            <Span>Privacy</Span>
          </li>
          <li>
            <Span>Terms</Span>
          </li>
          <li>
            <Span>Locations</Span>
          </li>
          <li>
            <Span>Top Accounts</Span>
          </li>
          <li>
            <Span>Hashtags</Span>
          </li>
          <li>
            <Span>Language</Span>
          </li>
          <FooterName>© 2022 INSTAGRAM FROM Shubham_lilawala</FooterName>
        </Footer>
      </Container>
    </Content>
  );
}

export default Profile;
const FooterName = styled.div`
  margin-top: 25px;
  color: #dbdbdb;
  font-size: 12px;
`;
const Span = styled.span`
  position: relative;
  left: -10px;
`;
const Footer = styled.div`
  display: flex;
  color: #dbdbdb;
  font-size: 12px;
  flex-wrap: wrap;
  width: 65%;
  margin-top: 25px;
`;
const TitleName = styled.div`
  font-size: 15px;
  color: #262626;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Follow = styled.div`
  color: #0f9bf6;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-align: right;
  flex-grow: 1;
`;
const Suggested = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const ProfilePP = styled.div`
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `}
  background-size: cover;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
`;
const People = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  gap: 25px;
  width: 70%;
`;
const See = styled.div`
  font-size: 12px;
  cursor: pointer;
`;
const Suggestion = styled.div`
  color: #8e8e8e;
  font-size: 15px;
  font-weight: bold;
`;
const Switch = styled.div`
  color: #0f9bf6;
  font-size: 12px;
  font-weight: bold;
  padding-left: 19px;
  cursor: pointer;
  text-align: right;
  flex-grow: 0;
`;
const SuggestionWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  cursor: default;
  width: 64%;
`;
const Namewrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: revert;
  cursor: pointer;
`;
const SubName = styled.div`
  opacity: 0.7;
  font-size: 15px;
  margin-top: 5px;
`;

const StoryWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  gap: 25px;
`;
const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const Story = styled.div`
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `}
  background-size: cover;
  background-repeat: no-repeat;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-position: center;
  border: 3px solid #dedede;
`;
const Content = styled.div`
  margin-top: 100px;
  margin-left: auto;
  right: 0;
  position: fixed;
  width: 45%;
  @media (max-width: 1000px) {
    display: none;
  }
`;
