import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

const RegisterPage = () => {
  const history = useHistory();
  const [info, setInfo] = useState({
    username: "",
    lastname: "",
    email: "",
    password: "",
    id: `${Math.random().toString(36).substr(2, 9)}`,
    image: "",
    coverImage: "",
    friends: [],
    friendRequest: [],
    posts: [],
    photos: [],
    intro: {
      univercity: [],
      currentTown: { state: "", city: "" },
      homeTown: { state: "", city: "" },
      relation: "",
      joined: "",
    },
  });
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
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
  const CurrentTime = months[month] + " " + year ;
  console.log(CurrentTime);

  const handleSignUp = () => {
    const record = { ...info };
    if (localStorage.getItem("Users") == null) {
      localStorage.setItem("Users", "[]");
    }
    var oldData = JSON.parse(localStorage.getItem("Users"));
    record.intro.joined = CurrentTime;
    oldData.push(record);
    localStorage.setItem(`Users`, JSON.stringify(oldData));
    history.push("/");
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInfo({ ...info, [name]: value });
  };

  return (
    <>
      <div className="reg-main">
        <div className="field-1">
          <label>Firstname</label>
          <Input
            placeholder="UserName"
            value={info.username}
            autoComplete="off"
            style={{ width: "300px", borderRadius: "10px" }}
            name="username"
            onChange={handleInput}
          />
        </div>
        <div className="field-2">
          <label>LastName</label>
          <Input
            placeholder="lastname"
            value={info.lastname}
            autoComplete="off"
            style={{ width: "300px", borderRadius: "10px" }}
            name="lastname"
            onChange={handleInput}
          />
        </div>

        <div className="field-1">
          <label>Email</label>
          <Input
            placeholder="Email"
            autoComplete="off"
            value={info.email}
            style={{ width: "300px", borderRadius: "10px" }}
            name="email"
            onChange={handleInput}
          />
        </div>
        <div className="field-2">
          <label>PassWord</label>
          <Input
            type="password"
            value={info.password}
            placeholder="PassWord"
            style={{ width: "300px", borderRadius: "10px" }}
            name="password"
            onChange={handleInput}
          />
        </div>
        <div className="reg-btn">
          <Button
            size="large"
            style={{ borderRadius: "10px", color: "#3399ff", border: "0" }}
            onClick={handleSignUp}
          >
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
