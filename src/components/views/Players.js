import React from 'react'
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import '../../styles.css';


function Players() {
  const [Players, setPlayers] = useState([]);
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;
  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/User")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setPlayers(response?.data);
        console.log(response);
      });
  }, []);

  return (
    <>
      <EventsNavbar isAdmin={isAdmin} />
      
      <div
        style={{
          display: "flex",
          height: "100px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>ALL USERS</h2> 
      </div>

      <div
        style={{
          display: "flex",
          className: "userdisplay",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "38px"
        }}
      >
        <Row xs={4} md={4}>
          {Players.length &&
            Players.map((user) => (
              <Col style={{marginBottom:"32px"}}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body style={{ maxHeight: "200px", overflowY: "scroll" }}>
                    <Card.Title styles={{ className: "userdisplay"}}>{user.firstName}</Card.Title>
                    <Card.Text>{user.lastName}</Card.Text>
                    <Card.Text>{user.email} </Card.Text>
                    <Card.Text>{user.age}</Card.Text>
                    <Card.Text>{user.userDescription}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

export default Players