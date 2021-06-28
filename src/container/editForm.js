import React, { useEffect, useState } from "react";
import {
  BookFilled,
  HomeFilled,
  EnvironmentFilled,
  HeartFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import { Menu, Modal, Button } from "antd";
import IntroEditForm from "./introEdit";

const EditForm = () => {
    const [isVisible,setIsVisible] = useState(false);
    const data = localStorage.getItem("Users");
    const response = JSON.parse(data);
    const active = localStorage.getItem("Active_User");
    const activeResponse = JSON.parse(active);
    const { intro } = activeResponse;
    const {univercity ,currentTown,homeTown,relation,joined} = intro;
    // const[ secondViseble,setSecondViseble] = useState(false)
  return (
    <>
      <div>
        {/* <h4 className="add-intro" onClick={()=> setIsVisible(true)}>Add/Edit</h4> */}
        <p className="intro-title" style={{marginTop:'5px'}}>Costomize Your intro</p>
      </div>
      <div>
      {
        univercity.length === 0 ? <h2>no Detail </h2> : (
          <>
           {univercity.map((e) => {
                return (
                  <div >
                    <BookFilled
                      style={{ fontSize: "18px", color: "#8c8c8c" }}
                    />
                    <p className="intro-list">Studi at {e}</p>
                  </div>
                );
              })}
      {/* <div>
        <BookFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
        <p className="intro-list">Studi at {univercity}</p>
      </div> */}
      <div>
        <HomeFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
        <p className="intro-list">Live in ,{currentTown.city} {currentTown.state}</p>
      </div>
      <div>
        <EnvironmentFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
        <p className="intro-list">From,{homeTown.city} {homeTown.state}</p>
      </div>
      <div>
        <HeartFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
        <p className="intro-list">{relation}</p>
      </div>
      <div>
        <ClockCircleFilled style={{ fontSize: "18px", color: "#8c8c8c" }} />
        <p className="intro-list">Joined on {joined}</p>
      </div>
      </>
      

        )
      }
      </div>
     
      <Button
              style={{width:"200px",marginRight:'120px'}}
              onClick={()=> setIsVisible(true)}
            >
              Add/Edit
            </Button>,
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
        <IntroEditForm/>
        </Modal>
      </div>
    </>
  );
};

export default EditForm;
