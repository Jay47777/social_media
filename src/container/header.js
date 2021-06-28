import { Menu, Modal, Button,Popover } from "antd";
import React, { useState } from "react";
import {
  LogoutOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import EditForm from "./editForm";

import "./style.css"

const HeaderDiv = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('Active_User');
    history.push("/Login")
  }

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item
          key="mail"
          onClick={() => history.push(`${url}/post`)}
          className="header-menu"
        >
          Post
        </Menu.Item>
        <Menu.Item
          key="app"
          onClick={() => history.push(`${url}/friends`)}
          className="header-menu"
        >
          Friends
        </Menu.Item>
        <Menu.Item
          key="alipay"
          onClick={() => history.push(`${url}/photos`)}
          className="header-menu"
        >
          Photos
        </Menu.Item>
        <Menu.Item
          key="suggest"
          onClick={() => history.push(`${url}/suggestedfriend`)}
          className="header-menu"
        >
          Suggested Friend
        </Menu.Item>
        <Menu.Item
          key="notification"
          onClick={() => history.push(`${url}/notification`)}
          className="header-menu"
        >
          Friend Notification
        </Menu.Item>
      </Menu>
      <div className="edit_profile_btn_div">
        <button className="edit_profile_btn" onClick={() => setIsVisible(true)}>
          Edit Profile
        </button>
      </div>
     
      <div>
        <Modal
          title={<h2 style={{ marginLeft: "50px",fontWeight:"bold" }}>Edit Bio</h2>}
          visible={isVisible}
          className="ant-modal"
          // onOk={handleOk}
          onCancel={() => setIsVisible(false)}
          // width={800}
          footer={[
            <Button
              style={{width:"500px",marginRight:'120px'}}
            onClick={() => setIsVisible(false)}
            >
              cancle
            </Button>,
          ]}
        >
          <EditForm />
        </Modal>
      </div>
      <div className="logout-div">
        <Popover content={"Logout"}>
        <button className="logout_btn" onClick={handleLogout} >
        <LogoutOutlined style={{paddingBottom:"5px"}} />
        </button>
        </Popover>
      </div>
    </>
  );
};

export default HeaderDiv;
