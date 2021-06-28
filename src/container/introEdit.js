import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const IntroEditForm = () => {
  const [univercityName, setUnivercityName] = useState(false);
  const [univercityVal, setUnivercityVal] = useState("");
  const [currStateName, setCurrStateName] = useState("");
  const [currCityName, setCurrCityName] = useState("");
  const [currCity, setCurrCity] = useState(false);
  const [home, setHome] = useState(false);
  const [homeStateName, setHomeStateName] = useState("");
  const [homeCityName, setHomeCityName] = useState("");
  const [relation, setRelation] = useState(false);
  const [relationValue, setRelationValue] = useState("");
  const data = localStorage.getItem("Users");
  const response = JSON.parse(data);
  const duplicate2 = [...response];
  const active = localStorage.getItem("Active_User");
  const activeResponse = JSON.parse(active);

  const findLogin = response.find((val) => {
    return val.id == activeResponse.id;
  });
  const loginUserIndex = duplicate2.indexOf(findLogin);

  const handleUnivercity = () => {
    duplicate2[loginUserIndex].intro.univercity.push(univercityVal);
    activeResponse.intro.univercity.push(univercityVal);
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setUnivercityName(false);
  };

  const handleCurrCity = () => {
    duplicate2[loginUserIndex].intro.currentTown.state = currStateName;
    duplicate2[loginUserIndex].intro.currentTown.city = currCityName;
    activeResponse.intro.currentTown.state = currStateName;
    activeResponse.intro.currentTown.city = currCityName;
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setCurrCity(false);
  };

  const handleHomeCity = () => {
    duplicate2[loginUserIndex].intro.homeTown.state = homeStateName;
    duplicate2[loginUserIndex].intro.homeTown.city = homeCityName;
    activeResponse.intro.homeTown.state = homeStateName;
    activeResponse.intro.homeTown.city = homeCityName;
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setHome(false);
  };

  const handleRelation = () => {
    duplicate2[loginUserIndex].intro.relation = relationValue;
    activeResponse.intro.relation = relationValue;
    localStorage.setItem("Users", JSON.stringify(duplicate2));
    localStorage.setItem("Active_User", JSON.stringify(activeResponse));
    setRelation(false);
  };

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setUnivercityName(true)}
      >
        <PlusCircleOutlined style={{ fontSize: "25px", color: "#4da6ff" }} />
        <p
          style={{
            marginTop: "-29px",
            marginLeft: "35px",
            fontSize: "20px",
            color: "#4da6ff",
          }}
        >
          Add a univercity
        </p>
      </div>
      {univercityName ? (
        <>
          <Input
            placeholder="Add Univercity"
            className="univerCity-input"
            // style={{ width: "400px", marginBottom: "10px" }}
            onChange={(e) => setUnivercityVal(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: "10px", marginBottom: "10px" }}
            onClick={handleUnivercity}
          >
            Set
          </Button>
        </>
      ) : null}
      {/* // current city Town */}
      <div style={{ cursor: "pointer" }} onClick={() => setCurrCity(true)}>
        <PlusCircleOutlined style={{ fontSize: "25px", color: "#4da6ff" }} />
        <p
          style={{
            marginTop: "-29px",
            marginLeft: "35px",
            fontSize: "20px",
            color: "#4da6ff",
          }}
        >
          Add a Current town/city
        </p>
      </div>
      {currCity ? (
        <>
          <div >
            <Input
              placeholder="Add state"
              className="currCityInput-1"
              style={{ width: "200px", marginBottom: "10px" }}
              onChange={(e) => setCurrStateName(e.target.value)}
            />
            </div>
            <div>
            <Input
              placeholder="Add city/town"
              className="currCityInput-2"
              style={{
                width: "200px",
                // marginBottom: "-10px"
                // marginLeft: "-200px",
              }}
              onChange={(e) => setCurrCityName(e.target.value)}
            />
            </div>
            <div>
            <Button
              type="primary"
              style={{ marginTop:'10px', marginBottom:'10px' }}
              onClick={handleCurrCity}
            >
              Set
            </Button>
          </div>
        </>
      ) : null}
      {/* // current home town */}
      <div style={{ cursor: "pointer" }} onClick={() => setHome(true)}>
        <PlusCircleOutlined style={{ fontSize: "25px", color: "#4da6ff" }} />
        <p
          style={{
            marginTop: "-29px",
            marginLeft: "35px",
            fontSize: "20px",
            color: "#4da6ff",
          }}
        >
          Add a Home town
        </p>
      </div>
      {home ? (
        <>
        <div>
          <Input
            placeholder="Add Home State"
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setHomeStateName(e.target.value)}
          />
          </div>
          <div>
          <Input
            placeholder="Add Home City"
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setHomeCityName(e.target.value)}
          />
          </div>
          <div>
          <Button
            type="primary"
            style={{ marginBottom:'10px',marginTop:"10px" }}
            onClick={handleHomeCity}
          >
            Set
          </Button>
          </div>
        </>
      ) : null}
      <div style={{ cursor: "pointer" }} onClick={() => setRelation(true)}>
        <PlusCircleOutlined style={{ fontSize: "25px", color: "#4da6ff" }} />
        <p
          style={{
            marginTop: "-29px",
            marginLeft: "35px",
            fontSize: "20px",
            color: "#4da6ff",
          }}
        >
          Relation
        </p>
      </div>
      {relation ? (
        <>
          <select
            id="lang"
            className="select-relation"
            onChange={(e) => setRelationValue(e.target.value)}
          >
            <option value="select">select</option>
            <option value="Single">Single</option>
            <option value="Merried">Merried</option>
            <option value="In relation">In relation</option>
            <option value="Engaged">Engaged</option>
          </select>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleRelation}
          >
            Set
          </Button>
        </>
      ) : null}
    </>
  );
};
export default IntroEditForm;
