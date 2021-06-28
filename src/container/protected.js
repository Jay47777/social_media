import React from "react";
import { Route, Redirect,Switch } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ component: Cmp, ...rest }) => {
  // const User = useSelector((state) => state.reducer.user);
  const active_user = localStorage.getItem('Active_User')
  return (
    <>
      <Switch>
      <Route
        {...rest}
        render={(props) =>
          !active_user ? (
            <Redirect to={{ pathname: "/Login" }} />
          ) : (
            <Cmp {...props} />
          )
        }
      />
      <Route
        {...rest}
        render={(props) =>
          active_user ? console.log("data is available") : <Redirect to={{ pathname: "/user" }} />
        }
      />
      </Switch>
     
    </>
  );
};

export default Protected;
