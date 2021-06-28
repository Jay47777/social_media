import React, { useState } from "react";
import "./style.css";
import "antd/dist/antd.css";
import { fs } from "browserfs";
import LZString from "lz-string";
import jsscompress from "js-string-compression";

// import DateTime from "./dateTime"
// this is photo function

const Photo = () => {
  const data = localStorage.getItem("Active_User");
  const info = localStorage.getItem("Users");
  const activeResponse = JSON.parse(data);
  const { photos } = activeResponse;
  const dublicateResp = Object.assign(activeResponse);
  const response = JSON.parse(info);
  const allPhotos = [];
  const duplicate = [...response];
  const [uploadedPhoto, setUploadedPhoto] = useState(allPhotos);
  const [error, setError] = useState(false);

  const Find = response.find((e) => {
    return e.id === activeResponse.id;
  });
  const Index = activeResponse.toString().indexOf(Find);
  photos.filter((e) => {
    if (!e.src.includes("data:")) {
      e.src = LZString.decompress(e.src);
      allPhotos.push(e);
    } else {
      allPhotos.push(e);
    }
  });

  const name = activeResponse.username;
  const lastname = activeResponse.lastname;
  const usernameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  const lastnameCapital = lastname.charAt(0).toUpperCase() + lastname.slice(1);

  //Date time
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minut = date.getMinutes();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const CurrentTime =
    date.getDate() +
    " " +
    months[month] +
    " " +
    year +
    "   " +
    hour +
    ":" +
    minut;
  console.log(date.getDay());

  //uploadPhoto

  const uploadPhoto = (e) => {
    try {
      console.log(e.target.files[0]);
      const select = e.target.files[0];
      const render = new FileReader();
      render.onloadend = () => {
        const Photo = {
          src: "",
          date: "",
          name: "",
          like: 0,
          commmnet: [],
          id: activeResponse.id,
          commentId: `${Math.random().toString(36).substr(2, 9)}`,
        };
        const imgCur = render.result;
        var str = `${imgCur}`;
        var compressed = LZString.compress(str);

        Photo.src = compressed;
        Photo.date = CurrentTime;
        Photo.name = `${usernameCapital} ${lastnameCapital}`;
        duplicate[Index].photos.push(Photo);
        console.log(dublicateResp);
        dublicateResp.photos.push(Photo);
        console.log(uploadedPhoto);
        try {
          localStorage.setItem(`Active_User`, JSON.stringify(dublicateResp));
          localStorage.setItem(`Users`, JSON.stringify(duplicate));
        } catch {
          setError(true);
        }

        setUploadedPhoto([
          ...allPhotos,
          {
            src: render.result,
            date: CurrentTime,
            name: `${usernameCapital} ${lastnameCapital}`,
          },
        ]);
      };
      render.readAsDataURL(select);
    } catch {
      setError(true);
    }
  };

  //deletePhot
  function deletePhoto(e, index) {
    const dummyInde = allPhotos.indexOf(e);
    const photIndex = photos.indexOf(e);
    // var upload = allPhotos;
    console.log(index);
    allPhotos.splice(index, 1);
    setUploadedPhoto([...allPhotos]);
    duplicate[Index].photos.splice(index, 1);
    activeResponse.photos.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(duplicate));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
  }

  return (
    <>
      <div>
        {error ? (
          <h1 className="error_msg">localStorage is Full Please delete some item</h1>
        ) : (
          <div className="photo-main">
            <div className="photo-box">
              <div className="title">
                <p className="p1">Photos</p>
                <p className="p2">
                  <label htmlFor="photoUpload">
                    <p>Add Photo</p>
                  </label>
                  <input type="file" id="photoUpload" onChange={uploadPhoto} />
                </p>
              </div>
              <div className="photos-div">
                {uploadedPhoto.map((e, index) => {
                  return (
                    <div className="img-row">
                      <div
                        className="img-col"
                        style={{
                          background: `url(${e.src}) no-repeat center/cover`,
                        }}
                      >
                        <p
                          className="rmv-p"
                          onClick={() => deletePhoto(e, index)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Photo;
