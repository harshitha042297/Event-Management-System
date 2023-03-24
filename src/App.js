
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import {useState,useRef} from 'react';
import landing from "./components/views/landing";
import Navbar from "./components/views/Navbar";
import UploadProduct from "./components/views/UploadProduct";
import Events from "./components/views/Events";
import UserProfile from "./components/views/UserProfile";
import Reservations from "./components/views/Reservations";
import UploadActivity from "./components/views/UploadActivity";
import Players from "./components/views/Players";
import Activity from "./components/views/Activity";
// import ChatEng from "./components/views/ChatEng";

const Auth = () => {
  return (
    <Router>
      {/* <Navbar/> */}
      <Switch>
        {/* <Route path="/" component={landing} /> */}
        <Route path="/landing" component={landing} />
        {/* <Route path="/" component={Login} />  */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={Forgot} /> 
        <Route path="/UploadProduct" component={UploadProduct} /> 
        <Route path="/Events" component={Events} /> 
        <Route path="/UserProfile" component={UserProfile} /> 
        <Route path="/Reservations" component={Reservations} /> 
        <Route path="/UploadActivity" component={UploadActivity} /> 
        <Route path="/Players" component={Players} /> 
        <Route path="/Activity" component={Activity} /> 

      </Switch>
    </Router>
  );
};

export default Auth;
