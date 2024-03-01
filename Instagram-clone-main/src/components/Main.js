import React, { useEffect, useState } from "react";
import axios from "axios";
import like from "../images/icon/like-icon.png";
import comment from "../images/icon/comment-icon.png";
import share from "../images/icon/share-icon.png";
import styled, { css } from "styled-components/macro";
import save from "../images/icon/save-icon.png";
import LikeIcon from "../images/LikeIcon";
import { useNavigate } from "react-router-dom";

function Main() {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardPost();
  }, []);

  const getDashboardPost = async () => {
    const resp = await axios.get(
      `http://localhost:2903/getDashboarPost/${user}`
    );
    setPost(resp.data);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const navigateUser = (userId) => () => {
    navigate({
      pathname: "/Profile",
      search: `?id=${userId}`,
    });
  };

  const unFollowUser = (userId) => async () => {
    formData.append("userId", user);
    formData.append("unfollowUserId", userId);
    const resp = await axios.post("http://localhost:2903/unfollow", formData);
    getDashboardPost();
  };

  const addComment = (post) => async () => {
    formData.append("userId", user);
    formData.append("postId", post._id);
    formData.append("comment", comment);
    const resp = await axios.post("http://localhost:2903/comment", formData);
    setComment("");
    getDashboardPost();
  };

  const triggerLikeDisLike = (post) => () => {
    formData.append("userId", user);
    formData.append("postId", post._id);
    post.likes.includes(user)
      ? axios.post("http://localhost:2903/dislike", formData)
      : axios.post("http://localhost:2903/like", formData);
    getDashboardPost();
  };
  return (
    <>
      {post?.map((el) => (
        <Container key={el._id}>
          <Name>
            <StoryWrapper>
              <Back>
                <ProfilePhoto bg={el?.userId?.profile_image} />
              </Back>
            </StoryWrapper>
            <ProfileName onClick={navigateUser(el?.userId?._id)}>
              {el?.userId?.username}
            </ProfileName>
            <DropDown>
              <Menu>
                <Span></Span>
                <Span></Span>
                <Span></Span>
              </Menu>
              <DropDownContent onClick={unFollowUser(el?.userId?._id)}>
                Unfollow User
              </DropDownContent>
            </DropDown>
          </Name>
          <Photo image={el?.post_image} />
          <LikeSection>
            <SvgWrapper onClick={triggerLikeDisLike(el)}>
              <LikeIcon active={el?.likes.includes(user)} />
            </SvgWrapper>
            <Comment />
            <Share />
            <Save />
          </LikeSection>
          <CommnetSection>
            <LikeCount>{el?.likes.length}</LikeCount>
            <PersonName>
              <SpanName>{el?.userId?.username}</SpanName>Dev Tools ...{" "}
              <SpnaMore>More</SpnaMore>
            </PersonName>
            <CommentsList>
              {el.comments?.map((k, i) => (
                <CommentText>
                  <span>{k.userName}</span>
                  {" " + k.comment}
                </CommentText>
              ))}
            </CommentsList>
            <ViewAll>{el?.comments.length}</ViewAll>
            <Time>10 minutes ago</Time>
            <CommentWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Add Your Comment"
                  value={comment}
                  onChange={handleChange}
                />
              </InputWrapper>
              <div>
                <PostBtn onClick={addComment(el)}>Post</PostBtn>
              </div>
            </CommentWrapper>
          </CommnetSection>
        </Container>
      ))}
    </>
  );
}

export default Main;

const CommentText = styled.div`
  font-family: "Lato";
  font-size: 14px;
  margin-top: 4px;
  span {
    font-family: "Lato-Bold"
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 80%;
`;

const PostBtn = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  color: #0095f6;
  cursor: pointer;
`;
const Input = styled.input`
  max-height: 40px;
  width: 80%;
  font-size: 16px;
  padding: 10px;
  color: #8e8e8e;
  border: none;
  &:focus {
    outline: none;
  }
`;

const CommentWrapper = styled.div`
  margin-top: 5px;
  border-top: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
`;
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
`;

const DropDown = styled.div`
  position: relative;
  margin-left: auto;
  display: inline-block;
  &:hover {
    ${DropDownContent} {
      display: flex;
    }
  }
`;

const SvgWrapper = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const Time = styled.div`
  font-size: 10px;
  color: #c4cfd0;
  margin-top: 5px;
`;
const ViewAll = styled.div`
  font-size: 15px;
  color: #c4cfd0;
  cursor: pointer;
  margin-top: 5px;
`;
const SpnaMore = styled.span`
  cursor: pointer;
  color: #c4cfd0;
`;
const SpanName = styled.span`
  font-weight: bold;
  padding-right: 10px;
`;
const PersonName = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 200;
`;
const LikeCount = styled.div`
  font-size: 15px;
  font-weight: bold;
`;
const CommnetSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Save = styled.div`
  margin-left: 10px;
  background-image: url(${save});
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 24px;
  margin-left: auto;
  margin-right: 10px;
  cursor: pointer;
`;
const Share = styled.div`
  margin-left: 10px;
  background-image: url(${share});
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
const Comment = styled.div`
  margin-left: 10px;
  background-image: url(${comment});
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
const Like = styled.div`
  margin-left: 10px;
  background-image: url(${like});
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
const LikeSection = styled.div`
  margin-top: 10px;
  display: flex;
`;
const Photo = styled.div`
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `}
  background-size: contain;
  height: 100%;
  width: 100%;
  padding-bottom: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;
const Span = styled.div`
  display: inline-block;
  height: 5px;
  width: 5px;
  background-color: #262626;
  border-radius: 50%;
`;
const Menu = styled.div`
  display: flex;
  gap: 3px;
  margin-left: auto;
  padding-right: 8px;
`;
const ProfileName = styled.div`
  font-size: 15px;
  color: #2a2a2a;
  padding-left: 5px;
  cursor: pointer;
`;
const Back = styled.div`
  background-color: white;
`;
const StoryWrapper = styled.div`
  border-radius: 50%;
  border: 2px solid #c72d8f;
  height: 50px;
  width: 50px;
  position: relative;
`;
const ProfilePhoto = styled.div`
  ${({ bg }) =>
    bg &&
    css`
      background-image: url(${bg});
    `}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 14px 4px 14px 16px;
`;
const Container = styled.div`
  background-color: #ffffff;
  margin-top: 25px;
  border: 1px solid #dbdbdb;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  width: 100%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
