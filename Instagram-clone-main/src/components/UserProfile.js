import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import styled, { css } from "styled-components/macro";
import searchIcon from "../images/search-icon.png";
import home from "../images/icon/home-icon.png";
import post from "../images/icon/post-icon.png";
import message from "../images/icon/message-icon.png";
import Modal from "./Modal";
import axios from "axios";
import PostIcon from "../images/PostIcon";
import like from "../images/icon/like-icon.png";
import navigation from "../images/icon/navigation-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ismodal, setisModal] = useState(false);
  const [isUser, setIsUser] = useState();
  const [profile, setProfile] = useState();
  const [data, setData] = useState([]);
  const [delModal, setDelModal] = useState(false);
  const [openPost, setOpenPost] = useState(null);
  let formData = new FormData();
  const deleteData = new FormData();
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();
  let Id = query.get("id");
  const navigate = useNavigate();
  const handleUser = () => {
    setisModal(!ismodal);
  };
  const postById = async () => {
    let resp = null;
    if (user == Id) {
      resp = await axios.get(`http://localhost:2903/getPostById/${user}`);
    } else {
      resp = await axios.get(`http://localhost:2903/getPostById/${Id}`);
    }
    setData(resp.data);
  };
  useEffect(() => {
    postById();
    getOneUser();
  }, []);

  const getOneUser = async () => {
    let resp = null;
    if (user == Id) {
      resp = await axios.get(`http://localhost:2903/getOneUser/${user}`);
      setProfile(resp.data.profile_image);
    } else {
      resp = await axios.get(`http://localhost:2903/getOneUser/${Id}`);
    }
    setIsUser(resp.data);
  };
  const navigateHome = () => {
    navigate("/Home");
  };
  const fileUpload = async (e) => {
    formData.append("userId", user);
    formData.append("post_image", e.target.files[0]);
    const resp = await axios.post("http://localhost:2903/addPost", formData);
    setisModal(!ismodal);
    postById();
  };

  const LogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const deleteModal = () => {
    setOpenPost(!openPost);
    setDelModal(!delModal);
  };

  const deletePost = (postId) => async () => {
    deleteData.append("postId", postId);
    const resp = await axios.post(
      "http://localhost:2903/post/delete",
      deleteData
    );
    setDelModal(!delModal);
    postById();
  };

  return (
    <div>
      <Wrapper>
        <Nav>
          <LogoWrapper />
          <InputWrapper>
            <SerachIconWrapper />
            <Input type="text" placeholder="Search" />
          </InputWrapper>
          <Icon>
            <Home onClick={navigateHome} />
            <Message />
            <StyledPost onClick={handleUser} />
            <Modal
              ismodal={ismodal}
              handleUser={handleUser}
              fileUpload={fileUpload}
              Text="Choose Your Photo"
            />
            <Navigation />
            <Like />
            <DropDown>
              <PP image={profile} />
              <DropDownContent onClick={LogoutUser}>Logout</DropDownContent>
            </DropDown>
          </Icon>
        </Nav>
      </Wrapper>
      <UserSection>
        <Post>
          <ProfilePic>
            <Pp image={isUser?.profile_image}></Pp>
          </ProfilePic>
          <UserData>
            <UserInfo>
              <Username>{isUser?.name}</Username>
            </UserInfo>
            <Info>
              <Text>
                <Span>{data?.length}</Span>posts
              </Text>
              <Text>
                <Span>{isUser?.followers.length}</Span>followers
              </Text>
              <Text>
                <Span>{isUser?.following.length}</Span>following
              </Text>
            </Info>
          </UserData>
        </Post>
        <PostSection>
          <SvgWrapper>
            <PostIcon />
          </SvgWrapper>
          <Text>POSTS</Text>
        </PostSection>
        <PostWrapper>
          {data
            ?.slice(0)
            .reverse()
            .map((el) => (
              <Pic
                image={el.post_image}
                key={el._id}
                onClick={() => setOpenPost(el)}
              >
                <PicWrapper>
                  <Wrap></Wrap>
                  <Main>
                    <span>{el.likes.length} Like</span>
                    <span>{el.comments.length} Comment</span>
                  </Main>
                  <OpenModal delModal={delModal}>
                    <ModalContent>
                      <Head>Do You Want To Delete This Post?</Head>
                      <ButtonWrapper>
                        <DeleteBtn onClick={deletePost(el._id)}>
                          Delete
                        </DeleteBtn>
                        <CancelBtn onClick={deleteModal}>Cancel</CancelBtn>
                      </ButtonWrapper>
                    </ModalContent>
                  </OpenModal>
                </PicWrapper>
              </Pic>
            ))}
        </PostWrapper>
      </UserSection>
      {!!openPost && (
        <PostModal>
          <ModalBackDrop onClick={() => setOpenPost(null)}></ModalBackDrop>
          <Box>
            <Left>
              <img src={openPost.post_image} />
            </Left>
            <Right>
              <HeadPost>
                <Logo image={isUser.profile_image}></Logo>
                <RighTitle>{isUser.username}</RighTitle>
                <MoreOption onClick={deleteModal}>
                  <Dot></Dot>
                  <Dot></Dot>
                  <Dot></Dot>
                </MoreOption>
              </HeadPost>
              <CommentPost>
                {openPost.comments.map((k, i) => (
                  <CommentWrapper>
                    <Logo image={k.profile_image}></Logo>
                    <RighTitle>
                      {k.userName} <span>{" " + k.comment}</span>
                    </RighTitle>
                  </CommentWrapper>
                ))}
                {openPost.comments.length === 0 && (
                  <Error>No comments yet.</Error>
                )}
              </CommentPost>
            </Right>
          </Box>
        </PostModal>
      )}
    </div>
  );
};

const Dot = styled.div`
  display: inline-block;
  height: 5px;
  width: 5px;
  background-color: #262626;
  border-radius: 50%;
`;

const MoreOption = styled.div`
  display: flex;
  gap: 3px;
  margin-left: auto;
  padding-right: 8px;
`;

const Error = styled.div`
  font-family: "Lato-Bold";
  font-size: 25px;
  margin: auto;
`;

const CommentWrapper = styled.div`
  display: flex;
  padding: 12px 0;
`;

const CommentPost = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  height: 100%;
`;

const RighTitle = styled.div`
  margin-left: 14px;
  font-size: 14px;
  font-family: "Lato-Bold";
  display: flex;
  align-items: center;
  span {
    margin-left: 3px;
    font-family: "Lato-Regular";
  }
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
      background-size: cover;
      background-position: center;
    `}
`;

const HeadPost = styled.div`
  padding: 14px 4px 14px 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  display: flex;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  background-color: #000;
`;

const Right = styled.div`
  align-items: stretch;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 2;
  font: inherit;
  font-size: 100%;
  margin: 0;
  max-width: 500px;
  min-width: 405px;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  min-height: calc(100vh - 40px);
  background-color: #fff;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 9999;
  margin: auto;
  max-height: calc(100vh - 40px);
  justify-content: center;
  img {
    max-height: calc(100vh - 40px);
    max-width: calc(90vw - 500px);
  }
`;

const ModalBackDrop = styled.div`
  background-color: black;
  opacity: 0.5;
  position: fixed;
  inset: 0;
  cursor: pointer;
`;

const PostModal = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 55;
`;

const CancelBtn = styled.button`
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
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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
  width: 100%;
  z-index: 9;
  border: 0;
  transition: box-shadow 0.2s;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 10%;
  display: flex;
  gap: 20px;
  align-items: baseline;
`;

const Head = styled.div`
  font-size: 20px;
  color: #1d1e22;
  font-family: "Lato-Bold";
  padding-bottom: 30px;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px;
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

const OpenModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
  display: none;
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  ${({ delModal }) =>
    delModal &&
    css`
      display: flex;
    `}
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
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${DropDownContent} {
      display: flex;
    }
  }
`;

const Main = styled.div`
  z-index: 5;
  display: flex;
  gap: 20px;
`;

const Wrap = styled.div`
  background-color: #525252;
  position: absolute;
  opacity: 0.7;
  width: 100%;
  z-index: 3;
  height: 100%;
`;
const PicWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Lato-Regular";
  font-size: 18px;
`;
const Pic = styled.div`
  height: 275px;
  width: 274px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;
  &:hover {
    z-index: 3;
    ${PicWrapper} {
      display: flex;
    }
  }
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `};
`;

const PostWrapper = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const SvgWrapper = styled.div`
  margin-right: 10px;
`;
const UserSection = styled.div`
  padding-top: 100px;
  max-width: 1180px;
  width: 100%;
  margin: auto;
`;

const PostSection = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #dbdbdb;
`;

const Span = styled.span`
  margin-right: 10px;
`;

const Text = styled.div`
  font-family: "Lato-Regular";
  font-size: 16px;
  line-height: 24px;
  color: #262626;
  font-weight: 400;
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  gap: 40px;
  text-align: left;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  height: fit-content;
`;

const Username = styled.div`
  font-size: 28px;
  line-height: 32px;
  font-family: "Lato-Regular";
  color: #262626;
  width: 100%;
`;

const Pp = styled.div`
  ${({ image }) =>
    image &&
    css`
      background-image: url(${image});
    `}
  height:160px;
  width: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
`;
const ProfilePic = styled.div`
  width: 290px;
  margin-right: 30px;
`;

const Post = styled.div`
  display: flex;
  justify-content: center;
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

const Icon = styled.div`
  display: flex;
  background-color: white;
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

const InputWrapper = styled.div`
  position: relative;
  padding-left: 10px;
  background-color: white;
  @media (max-width: 1000px) {
    display: none;
  }
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
const Wrapper = styled.div`
  background-color: white;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  z-index: 1;
  @media (max-width: 1000px) {
    justify-content: center;
  }
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

const LogoWrapper = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px;
  background-color: white;
`;

export default UserProfile;
