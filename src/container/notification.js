import React, { useState } from "react";
import { Card, Col, Button } from "antd";
import "antd/dist/antd.css";
import "./style.css"

const { Meta } = Card;

const Notification = () => {
  const [current, setCurrent] = useState(true);
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = [...response];
  const active = localStorage.getItem("Active_User");
  const activeResponse = JSON.parse(active);
  const { friendRequest } = activeResponse;
  var friendsArray = [];
  const [notificationList, setNotificationList] = useState(friendsArray);

  const findLogin = response.find((val) => {
    return val.id == activeResponse.id;
  });
  const loginUserIndex = duplicate2.indexOf(findLogin);
  //   console.log(loginUserIndex)
  let i;
  let Find;
  for (i = 0; i < friendRequest.length; i++) {
    Find = response.find((e) => {
      return e.id == friendRequest[i];
    });
    friendsArray.push(Find);
  }
  console.log(notificationList);

  //////........................................................./////////
  function sendToFriend(e, index) {
    const dumy = notificationList;
    dumy.splice(index, 1);
    setNotificationList([...dumy]);
    const requestedUser = duplicate2.indexOf(e);
    duplicate2[loginUserIndex].friends.push(`${e.id}`);
    activeResponse.friends.push(`${e.id}`);
    duplicate2[requestedUser].friends.push(`${activeResponse.id}`);
    // const deleteId = friendRequest.indexOf(e.id);
    duplicate2[loginUserIndex].friendRequest.splice(index, 1);
    activeResponse.friendRequest.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setCurrent(false);
  }

  /////.....................................................//////////////
  function deleteRequest(e, index) {
    const dumy = notificationList;
    dumy.splice(index, 1);
    setNotificationList([...dumy]);
    const deleteId = friendRequest.indexOf(e.id);
    duplicate2[loginUserIndex].friendRequest.splice(index, 1);
    activeResponse.friendRequest.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setCurrent(false);
  }

  return (
    <>
    <div className="frind_main_div">
      {friendRequest.length === 0 ? (
        <h2 className="friend-error">No Friends Request</h2>
      ) : (
        <div className="friend_main">
          {notificationList.map((e, index) => {
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
                    <p className="noti-friend-name">
                      {e.username.charAt(0).toUpperCase() +
                        e.username.slice(1) +
                        "  "}
                      {e.lastname.charAt(0).toUpperCase() + e.lastname.slice(1)}
                    </p>
                    <div
                    className="AcceptRejectDiv"

                    >
                      <Button
                        type="primary"
                        style={{ marginTop: "30px" }}
                        onClick={() => sendToFriend(e, index)}
                      >
                        Accept
                      </Button>
                      <Button
                        type="primary"
                        style={{ marginTop: "30px", marginLeft: "20px" }}
                        onClick={() => deleteRequest(e, index)}
                        danger
                      >
                        Reject
                      </Button>
                    </div>
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

export default Notification;

{
  /* <div className="friend_main">
  {notificationList.map((e, index) => {
    return (
      <div className="frind_image">
        <Card
          hoverable
          style={{ width: 240, height: 350 }}
          cover={<img src={e.image} style={{ height: 200 }} />}
        >
          <Meta title={e.username} />
          <Button
            type="primary"
            style={{ marginTop: "30px" }}
            onClick={() => sendToFriend(e, index)}
          >
            Accept
          </Button>
          <Button
            type="primary"
            style={{ marginTop: "30px", marginLeft: "20px" }}
            onClick={() => deleteRequest(e, index)}
            danger
          >
            Reject
          </Button>
        </Card>
      </div>
    );
  })}
</div>; */
}
