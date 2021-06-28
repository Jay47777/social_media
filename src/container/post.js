import React, { useState } from "react";
import "./style.css";
import {
  LikeOutlined,
  CommentOutlined,
  LikeFilled,
  BookFilled,
  HomeFilled,
  EnvironmentFilled,
  HeartFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import PhotoAlbum from "./photoAlbum";
import FriendsAlbum from "./friendsAlbum";
import LZString from "lz-string";
import { Avatar, Input, Layout, Modal, Button } from "antd";

const { Footer } = Layout;

const Post = () => {
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = [...response];
  const active = localStorage.getItem("Active_User");
  const activeResponse = JSON.parse(active);
  const { friends } = activeResponse;
  const { intro } = activeResponse;
  const { univercity, currentTown, homeTown, relation, joined } = intro;
  const [liked, setLiked] = useState(false);
  const [isComment, setIsComment] = useState("");
  const [comment, setComment] = useState("");
  var friend_arr = [];

  const name = activeResponse.username;
  const lastname = activeResponse.lastname;
  const usernameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  const lastnameCapital = lastname.charAt(0).toUpperCase() + lastname.slice(1);

  const findLogin = response.find((val) => {
    return val.id == activeResponse.id;
  });
  console.log(findLogin.photos);
  let i;
  let Find;
  for (i = 0; i < friends.length; i++) {
    Find = response.find((e) => {
      return e.id === friends[i];
    });
    Find.photos.filter((e) => {
      if (!e.src.includes("data:")) {
        e.src = LZString.decompress(e.src);
        friend_arr.push(e);
      } else {
        friend_arr.push(e);
      }
      // e.src = LZString.decompress(e.src);
      // return allPhotos.push(e);
    });
  }

  const findFriend = response.indexOf(Find);
  console.log(findFriend);
  var merged = [].concat.apply([], friend_arr);

  const orderedPosts = merged.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const [count, setCount] = useState(orderedPosts);
  const comentlistArray = [];
  count.map((e) => {
    comentlistArray.push(e.commmnet);
  });
  console.log(comentlistArray);

  // Adlike function
  function addLike(e, index) {
    const plusLike = e.like + 1;
    const minusLike = e.like - 1;
    const findPhotoFriend = response.find((val) => {
      return val.id == e.id;
    });
    const findphotoFriendIndex = response.indexOf(findPhotoFriend);
    //  const { photos } = findPhotoFriend
    const findPhoto = findPhotoFriend.photos.find((val) => {
      return val.commentId == e.commentId;
    });
    const findPhotoIndex = findPhotoFriend.photos.indexOf(findPhoto);
    duplicate2[findphotoFriendIndex].photos[findPhotoIndex].like = liked
      ? minusLike
      : plusLike;
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    const fakePhotos = count;
    fakePhotos[index].like = liked ? minusLike : plusLike;
    setCount([...fakePhotos]);
    setLiked(!liked);
  }
  function commentFunction(e, index) {
    count.find((j) => {
      if (j === e) {
        setIsComment(e.src);
        console.log(e.commmnet.length);
      }
    });
  }

  // send comment
  function sendPost(event, index, main) {
    if (event.key === "Enter") {
      const val = event.target.value;
      const commentObject = { profile: activeResponse.image, text: val };
      const findCommentsUSer = response.find((e) => {
        return e.id === main.id;
      });
      const findComment = findCommentsUSer.photos.find((i) => {
        return i.commentId === main.commentId;
      });

      console.log(findComment);

      const findCommentUserIndex = response.indexOf(findCommentsUSer);
      const { photos } = findCommentsUSer;
      const findPostIndex = photos.indexOf(findComment);
      console.log(findPostIndex);
      duplicate2[findCommentUserIndex].photos[findPostIndex].commmnet.push(
        commentObject
      );
      localStorage.setItem("Users", JSON.stringify(duplicate2));
      if (event.target.value) {
        event.target.value = "";
      }
      // console.log(val);
      const FakeComment = count;
      FakeComment[index].commmnet.push(commentObject);
      setCount([...FakeComment]);
      setLiked(!liked);
      document.getElementById("comment").value = "";
    }
  }

  return (
    <>
      <div className="float_container">
        <div className="intro-detail">
          <div className="bio-detail">
            <p className="bio-detail-title">Intro</p>
            {univercity.length === 0 ? (
              <p
                style={{
                  marginLeft: "20px",
                  paddingBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                NO intro
              </p>
            ) : (
              <>
                {univercity.map((e) => {
                  return (
                    <div style={{ marginLeft: "20px" }}>
                      <BookFilled
                        style={{ fontSize: "18px", color: "#8c8c8c" }}
                      />
                      <p className="intro-list">Studi at {e}</p>
                    </div>
                  );
                })}

                <div style={{ marginLeft: "20px" }}>
                  <HomeFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
                  <p className="intro-list">
                    Live in ,{currentTown.city} {currentTown.state}
                  </p>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <EnvironmentFilled
                    style={{ fontSize: "18px", color: "#8c8c8c" }}
                  />
                  <p className="intro-list">
                    From,{homeTown.city} {homeTown.state}
                  </p>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <HeartFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
                  <p className="intro-list">{relation}</p>
                </div>
                <div style={{ marginLeft: "20px", paddingBottom: "10px" }}>
                  <ClockCircleFilled
                    style={{ fontSize: "18px", color: "#8c8c8c" }}
                  />
                  <p className="intro-list">Joined on {joined}</p>
                </div>
              </>
            )}
          </div>
          <div className="bio-detail-2">
            <PhotoAlbum />
          </div>
          <div className="bio-detail-3">
            <FriendsAlbum />
          </div>
        </div>
        <div className="post_render">
          {count.length === 0 ? (
            <h2 className="post-error">No Posts</h2>
          ) : (
            <div className="post_main">
              {count.map((e, index) => {
                return (
                  <div className="post-sub-main">
                    <div className="post-sub">
                      <div className="info-div">
                        <p className="post-name">
                          <b>{e.name}</b> with
                          <b>
                            {usernameCapital} {lastnameCapital}
                          </b>
                        </p>
                        <p className="post-date">{e.date}</p>
                      </div>
                      <div className="post-im">
                        <img
                          alt="example"
                          className="post-img"
                          src={`${e.src}`}
                          // style={{
                          //   width: "400px",
                          //   height: "408px",
                          // }}
                        />
                        <LikeFilled
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            marginTop: "5px",
                            marginLeft: "10px",
                          }}
                        />
                        <p className="like_count">{e.like}</p>
                        <div className="like_span">
                          <div>
                            <p>
                              <LikeOutlined
                                style={{
                                  fontSize: "23px",
                                  marginLeft: "30px",
                                  marginTop: "10px",
                                }}
                              />
                            </p>
                            <p
                              className="like-text"
                              onClick={() => addLike(e, index)}
                            >
                              Like
                            </p>
                          </div>
                          <div className="comment_div">
                            <p>
                              <CommentOutlined
                                style={{
                                  fontSize: "23px",
                                  marginLeft: "30px",
                                  marginTop: "10px",
                                }}
                              />
                            </p>
                            <p
                              className="like-text"
                              onClick={() => commentFunction(e, index)}
                            >
                              Comment
                            </p>
                          </div>
                        </div>
                        <div>
                          {isComment === e.src ? (
                            <div className="comment_list">
                              <div className="user_photo">
                                <Input
                                  placeholder="Write a Comment...."
                                  id="comment"
                                  className="commentInput"
                                  onKeyPress={(event) =>
                                    sendPost(event, index, e)
                                  }
                                  style={{
                                    
                                    marginLeft: "50px",
                                    marginTop: "10px",
                                    borderRadius: "20px",
                                    backgroundColor: "#e6e6e6",
                                    color: "black",
                                  }}
                                />
                                <p style={{ marginLeft: "55px" }}>
                                  Press Enter to Send Post
                                </p>
                                <Avatar
                                  size="large"
                                  src={activeResponse.image}
                                  style={{ marginTop: "-120px" }}
                                />
                              </div>
                              <div>
                                {e.commmnet.length === 0 ? (
                                  <p>No comment</p>
                                ) : (
                                  <div>
                                    {e.commmnet.map((a) => {
                                      return (
                                        <div className="render_comment">
                                          <Avatar
                                            size="midium"
                                            src={a.profile}
                                            style={{
                                              marginTop: "-20px",
                                              marginLeft: "3px",
                                            }}
                                          />
                                          <p
                                            style={{
                                              marginLeft: "50px",
                                              marginTop: "-35px",
                                            
                                              wordWrap: "break-word",
                                              backgroundColor: "#d9d9d9",
                                              borderRadius: "15px",
                                              padding: "5px",
                                            }}
                                          >
                                            <p
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {usernameCapital}{" "}
                                              {lastnameCapital}
                                            </p>
                                            <p style={{ marginTop: "-15px" }}>
                                              {a.text}
                                            </p>
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
