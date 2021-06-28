import React from "react";
import LZString from "lz-string";
import {useHistory,useRouteMatch} from "react-router-dom";
import { Image} from "antd"

const PhotoAlbum = () => {
    const history = useHistory();
    const {url} = useRouteMatch();
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = response;
  const active = localStorage.getItem("Active_User");
  const activeResponse = JSON.parse(active);
  const photoArray = [];
  const findLogin = response.find((val) => {
    return val.id == activeResponse.id;
  });

  findLogin.photos.filter((e) => {
    if (!e.src.includes("data:")) {
      e.src = LZString.decompress(e.src);
      photoArray.push(e);
    } else {
      photoArray.push(e);
    }
    // e.src = LZString.decompress(e.src);
    // return allPhotos.push(e);
  });

  return (
    <>
      <div className="photoAlbum-title">
        <p>Photos</p>
        <p
           className="seeAllPhoto"
          onClick={()=>history.push(`/${activeResponse.username}/photos`)}
        >
          See All Photos
        </p>
      </div>
      <div className="photoAlbum_gridList">
        {photoArray.map((e) => {
          return <Image
            className="img-cole"
            src={e.src}
            style={{
              width:'120px',height:'100px',paddingRight:'5px',paddingBottom:'5px',borderRadius:'5px'
            }}
          ></Image>;
        })}
      </div>
    </>
  );
};

export default PhotoAlbum;
