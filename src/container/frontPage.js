import React from "react";
import "./style.css";
import {useHistory} from "react-router-dom"


 const FrontPage = () => {
     const history = useHistory();

    return(
        <>
        <div className="main-div">
            <div className="sub-div">
                <p>Wel Come to FakeBook</p>
                <button className="btn-1" onClick={()=> history.push("/SigunUp")}> Sign Up</button>
                <button className="btn-2" onClick={()=> history.push("/Login")}>Login</button>
            </div>
        </div>
        </>
    )

}
export default FrontPage;