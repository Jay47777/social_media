import "./App.css";
import FrontPage from "./container/frontPage";
import LoginPage from "./container/loginPage";
import RegisterPage from "./container/registerPage";
import User from "./container/user";
import Protected from "./container/protected";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/SigunUp" component={RegisterPage} />
          <Route path="/Login" component={LoginPage} />
          <Protected path="/:name"  component={User}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
