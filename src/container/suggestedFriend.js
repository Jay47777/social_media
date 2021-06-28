import React, { useEffect, useState } from "react";
import { Card, Col, Button } from "antd";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const SuggestedFriend = () => {
  const [current, setCurrent] = useState(Boolean);
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = response;
  const active = localStorage.getItem("Active_User");
  const activeResponse = JSON.parse(active);
  const { friendRequest, friends } = activeResponse;
  console.log(friends.length);

  ///////////////...Find all member available in users boject...//////////
  const allFriends = response.filter((e) => {
    return e.id !== activeResponse.id;
  });
  console.log(allFriends);

  //////////////...FInd friend Object in available member ni user object ....////
  var friendsArray = [];
  let a;
  let Find1;
  for (a = 0; a < friends.length; a++) {
    Find1 = response.find((e) => {
      return e.id == friends[a];
    });
    friendsArray.push(Find1);
  }

  ///////////....pull out object which is not include in frined list ....../////
  const removeCommon = (first, second) => {
    const spreaded = [...first, ...second];
    return spreaded.filter((el) => {
      return !(first.includes(el) && second.includes(el));
    });
  };
  const allUnfriend = removeCommon(allFriends, friendsArray);
  console.log(allUnfriend);

  ////////....................send friend REquest to member of this app ....///////
  function sendId(e) {
    const requestedId = response.find((val) => {
      return val.id == e.id;
    });
    const index1 = duplicate2.indexOf(requestedId);
    duplicate2[index1].friendRequest.push(`${activeResponse.id}`);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setCurrent(false);
  }

  //////////..................Cancle request if you sent ...............///////////
  function deleteRequest(e, index) {
    const requestedId = response.find((val) => {
      return val.id == e.id;
    });
    const index1 = duplicate2.indexOf(requestedId);
    duplicate2[index1].friendRequest.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setCurrent(true);
  }

  return (
    <>
      <div className="frind_main_div">
        {allUnfriend.length == 0 ? (
          <h2 className="friend-error">No Suggested Friend</h2>
        ) : (
          <div className="friend_main">
            {allUnfriend.map((e, index) => {
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
                        {e.lastname.charAt(0).toUpperCase() +
                          e.lastname.slice(1)}
                      </p>
                      <Menu
                        mode="horizontal"
                        style={{
                          border: "0",
                          marginLeft: "90px",
                          marginTop: "-20px",
                        }}
                      >
                        <SubMenu icon={<EllipsisOutlined />}>
                          {!e.friendRequest.includes(activeResponse.id) ||
                          current === true ? (
                            <Menu.Item
                              key="setting:1"
                              onClick={() => sendId(e)}
                            >
                              Add Friend
                            </Menu.Item>
                          ) : (
                            <Menu.Item
                              key="setting:2"
                              onClick={() => deleteRequest(e, index)}
                            >
                              Cancle Request
                            </Menu.Item>
                          )}
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

export default SuggestedFriend;

/////
{
  /* <div className="frind_image">
  <Card
    hoverable
    style={{ width: 240, height: 350 }}
    cover={<img src={e.image} style={{ height: 200 }} />}
  >
    <Meta title={e.username} />
    {!e.friendRequest.includes(activeResponse.id) || current === true ? (
      <Button
        type="primary"
        style={{ marginTop: "30px" }}
        onClick={() => {
          sendId(e);
        }}
      >
        Add Friend
      </Button>
    ) : (
      <Button
        type="primary"
        style={{ marginTop: "30px" }}
        onClick={() => {
          deleteRequest(e, index);
        }}
      >
        Cancle Request
      </Button>
    )}
  </Card>
</div>; */
}
