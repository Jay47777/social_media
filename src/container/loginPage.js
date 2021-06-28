import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import User from "./user";
import { startOfQuarter, sub,parseISO, formatDistanceToNow } from 'date-fns'
// import addData from "../action/action";
import {addData} from "../reducer/userReducer"


const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(Boolean);

  const onLogin = () => {
  
    const old_record = localStorage.getItem(`Users`);
    const active_user = localStorage.getItem('Active_User')
    const active_resp = JSON.parse(active_user)
    const data = JSON.parse(old_record);
    data.map((res)=>{
      if (!old_record) {
        history.push("/Login");
      } else {
        if (res.password === password && res.username === name) {
          setError(true);
          history.push(`/${name}`);
          history.push(`/${name}/post`);
          const index = data.indexOf(res);
          localStorage.setItem('Active_User',JSON.stringify(res))
          console.log(res)
          dispatch(addData(index));
        }
      }

    })
    console.log(data)
   
  };

  const date  =  new Date().toISOString();
  const timePeriod = formatDistanceToNow(parseISO(date));
  console.log(timePeriod)
  
  // console.log(TimeAgo(date))
  // const TimeAgo = ( date ) => {
  //   let timeAgo = ''
  //   if (date) {
  //     const Date = parseISO(date)
  //     const timePeriod = formatDistanceToNow(Date)
  //     timeAgo = `${timePeriod} ago`
  //   }
    

  return (
    <>
      <div className="login-main">
        <div className="field-1">
          <label>UserName</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="UserName"
            style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
        {error === false || !password.length === 0 ? (
          <p className="error-msg">Input A Valid User Name</p>
        ) : null}
        <div className="field-1">
          <label>PassWord</label>
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PassWord"
            style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
        {error === false || !password.length === 0 ? (
          <p className="error-msg">Input A Valid Pssword</p>
        ) : null}
        <div className="reg-btn">
          <Button
            size="large"
            onClick={onLogin}
            style={{ borderRadius: "10px", color: "#ff6666", border: "0" }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
