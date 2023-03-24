import React from "react";
import "../../styles.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

export default function landing() {
  
  return (
    <div>
      <Navbar />
      <img src="landing_page.jpg" width="1450" height="750"></img>
    </div>
  );
}
