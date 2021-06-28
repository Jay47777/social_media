import React from "react";
import LZString from "lz-string";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Popover, Image } from "antd";

const FriendsAlbum = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const data = localStorage.getItem("Users");
  const resp = JSON.parse(data);
  const duplicate2 = resp;
  const active = localStorage.getItem("Active_User");
  const active_resp = JSON.parse(active);
  const { friends } = active_resp;
  const friend_arr = [];
  const findLogin = resp.find((val) => {
    return val.id == active_resp.id;
  });

  let i;
  let Find;
  for (i = 0; i < friends.length; i++) {
    Find = resp.find((e) => {
      return e.id == friends[i];
    });
    friend_arr.push(Find);
  }

  function handleFriendPopOver(e) {
    return (
      <div style={{ height: "150px", width: "200px" }}>
        <Image
          width={100}
          src={e.image}
          style={{ marginLeft: "50px", borderRadius: "50px", height: "100px" }}
        />
        <p style={{marginLeft:'30px',fontWeight:"bold",fontSize:'20px'}}>
          {e.username.charAt(0).toUpperCase() + e.username.slice(1) + "  "}
          {e.lastname.charAt(0).toUpperCase() + e.lastname.slice(1)}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="photoAlbum-title">
        <p>Friends</p>
        <p
         
          className="seeAllPhoto"
          onClick={() => history.push(`/${active_resp.username}/friends`)}
        >
          See All Friends
        </p>
      </div>
      <div className="photoAlbum_gridList">
        {friend_arr.map((e) => {
          return (
            <>
              <Popover content={handleFriendPopOver(e)}>
                <div
                  className="img-cole"
                  style={{
                    background: `url(${e.image}) no-repeat center/cover`,
                  }}
                >
                  <p style={{ marginTop: "100px" }}>
                    {e.username.charAt(0).toUpperCase() +
                      e.username.slice(1) +
                      "  "}
                    {e.lastname.charAt(0).toUpperCase() + e.lastname.slice(1)}
                  </p>
                </div>
              </Popover>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FriendsAlbum;
