import React, { useState } from "react";
import styled from "styled-components/macro";
import Slider from "react-slick";
import pp from "../images/icon/pp.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile from "./Profile";
import Main from "./Main";
function Post() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Wrapper>
      <Story>
        {/* <Slider {...settings}>
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>{" "}
          <ImageWrapper>
            <StoryPhoto src={pp} />
            <Text>shubham_lilawala</Text>
          </ImageWrapper>
        </Slider> */}
        <Main />
      </Story>
      <Profile />
    </Wrapper>
  );
}

export default Post;
const Text = styled.div`
  font-size: 12px;
  margin-left: -11px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const StoryPhoto = styled.img`
  height: 66px;
  width: 66px;
  border: 2px solid #d02f68;
  border-radius: 50%;
  cursor: pointer;
`;
const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  display: flex;
  padding-top: 65px;
  @media (max-width: 1024px) {
    width: auto;
    justify-content: center;
    border: none;
    padding-left: 25px;
    padding-right: 65px;
  }
`;
const Story = styled.div`
  background-color: white;
  margin-top: 25px;
  height: 100px;
  width: 55%;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 40px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 5px;
`;
