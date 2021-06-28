import React, { useEffect, useState } from "react";
import { Card, Col, Button } from "antd";
import "antd/dist/antd.css";
import { EllipsisOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

const Friend = () => {
  const history = useHistory();
  // const {url} = useRouteMatch();
  const [current, setCurrent] = useState(true);
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = [...response];
  const active = localStorage.getItem("Active_User");
  const activeaResponse = JSON.parse(active);
  const { friends } = activeaResponse;
  var friendArray = [];
  const [friendsList, setFriendsList] = useState(friendArray);
  console.log(friends.length);

  ////////.........Find active user object and its index .........//////
  const findLogin = response.find((a) => {
    return a.id == activeaResponse.id;
  });
  const loginUserIndex = duplicate2.indexOf(findLogin);

  ///////...........find firnd object in user object ...../////////////
  let i;
  let Find;
  for (i = 0; i < friends.length; i++) {
    Find = response.find((e) => {
      return e.id == friends[i];
    });
    friendArray.push(Find);
  }

  ////////////.................delete friend from friend list ........//////////
  function deletFriend(e, index) {
    const FriendList = friendsList;
    FriendList.splice(index, 1);
    setFriendsList([...FriendList]);
    const deletedFriendIndex = duplicate2.indexOf(e);
    const deleteFromUser = e.friends.indexOf(activeaResponse.id);
    duplicate2[deletedFriendIndex].friends.splice(deleteFromUser, 1);
    duplicate2[loginUserIndex].friends.splice(index, 1);
    activeaResponse.friends.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeaResponse));
  }

  return (
    <>
    <div className="frind_main_div">
      {friends.length === 0 ? (
        <h2 className="friend-error">No friends</h2>
      ) : (
        <div className="friend_main">
          {friendsList.map((e, index) => {
            return (
              <div className="frind_image">
                <div className="friend-list">
                  <div className="friend-list-sub">
                    <img
                      src={e.image}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "5px",
                      }}
                    />
                    <p className="friend-name">
                      {e.username.charAt(0).toUpperCase() +
                        e.username.slice(1) +
                        "  "}
                      {e.lastname.charAt(0).toUpperCase() + e.lastname.slice(1)}
                    </p>
                    <Menu
                      mode="horizontal"
                      style={{
                        border: "0",
                        marginLeft: "90px",
                        marginTop: "-20px",
                      }}
                    >
                      <SubMenu key="SubMenu" icon={<EllipsisOutlined />}>
                        <Menu.Item
                          key="setting:1"
                          onClick={() => deletFriend(e, index)}
                        >
                          UnFriend
                        </Menu.Item>
                      </SubMenu>
                    </Menu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
};

export default Friend;
