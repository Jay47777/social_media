import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button } from "antd";
import { CameraFilled } from "@ant-design/icons";
import { addImage } from "../reducer/infoReducer";
import "./style.css";
import "./ipadStyle.css"
import "./phonStyle.css"
import HeaderDiv from "./header";
import Post from "./post";
import Friend from "./friends";
import Photo from "./photo";
import SuggestedFriend from "./suggestedFriend";
import Notification from "./notification";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
// const { Header, Footer, Sider, Content } = Layout;

const User = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const data = localStorage.getItem("Active_User");
  const info = localStorage.getItem("Users");
  const activeResponse = JSON.parse(data);
  const response = JSON.parse(info);
  const duplicate = [...response];
  const [userCoverImage,setUserCoverImage] = useState(activeResponse.coverImage)
  const [profileImage, setProfileImage] = useState(activeResponse.image);

  const name = activeResponse.username;
  const lastname = activeResponse.lastname;
  const usernameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  const lastnameCapital = lastname.charAt(0).toUpperCase() + lastname.slice(1);

  const Find = duplicate.find((e) => {
    return e.id === activeResponse.id;
  });
  const index = duplicate.indexOf(Find);

  const handleChange = (e) => {
    const select = e.target.files[0];
    const ALL_TYPE = ["image/png", "image/jpeg", "image/jpg"];
    if (select && ALL_TYPE.includes(select.type)) {
      const render = new FileReader();
      render.readAsDataURL(select);
      render.onloadend = () => {
        duplicate[index].image = render.result;
        // duplicate[index].friends.push("m82oo4lnv");
        // duplicate[index].friends.push("pk6fqam9r");
        activeResponse.image = render.result;
        localStorage.setItem("Users", JSON.stringify(duplicate));
        localStorage.setItem("Active_User", JSON.stringify(activeResponse));
        setProfileImage(render.result);
      };
    }
  };
   const coverChange = (e)=>{
    const select = e.target.files[0];
    const ALL_TYPE = ["image/png", "image/jpeg", "image/jpg"];
    if (select && ALL_TYPE.includes(select.type)) {
      const render = new FileReader();
      render.readAsDataURL(select);
      render.onloadend = () => {
        duplicate[index].coverImage = render.result;
        // duplicate[index].friends.push("m82oo4lnv");
        // duplicate[index].friends.push("pk6fqam9r");
        activeResponse.coverImage = render.result;
        localStorage.setItem("Users", JSON.stringify(duplicate));
        localStorage.setItem("Active_User", JSON.stringify(activeResponse));
        setUserCoverImage(activeResponse.coverImage);
      }
    }
   }

  return (
    <>
      <div className="profile-main">
        <div className="bacground_photo" style={{ background: `url("${userCoverImage}") no-repeat center/cover`,}}>
          <div
            className="avtar-div"
            style={{
              background: `url("${profileImage}") no-repeat center/cover`,
            }}
          >
            <label htmlFor="fileUpload">
              <Avatar size="small" style={{marginTop:"-15px"}} icon={<CameraFilled style={{color:"black"}}/>} />
            </label>
            <input type="file" onChange={handleChange} id="fileUpload" />
          </div>
          {/* <button className="cover_photo_btn"></button> */}
          <div className="cover_photo_btn">
          <label htmlFor="fileUpload_1" >
            
            <p style={{ marginLeft:'3px',  fontSize: "18px" }}>
              <CameraFilled style={{ fontSize: "20px", color: "black" }} />
            </p>
            <p
              style={{
                marginLeft: "30px",
                marginTop: "-45px",
                fontSize: "20px",
              }}
            >
              Edit Cover Photo
            </p>
          
          </label>
          <input type="file" onChange={coverChange} id="fileUpload_1" />
          </div>
        </div>
        <h1 className="username">
          {lastnameCapital} {usernameCapital}
        </h1>
        <div className="header-div">
          <HeaderDiv />
        </div>
        <div className="info-bac">
          <div className="info-area">
            <div className="banner">
              <Switch>
                <Route path={`/:name/post`} component={Post} />
                <Route path={`/:name/friends`} component={Friend} />
                <Route path={`/:name/photos`} component={Photo} />
                <Route
                  path={`/:name/suggestedfriend`}
                  component={SuggestedFriend}
                />
                <Route path={`/:name/notification`} component={Notification} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
