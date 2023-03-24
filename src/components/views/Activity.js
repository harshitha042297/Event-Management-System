import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Activity() {
  const [Activity, setActivity] = useState([]);
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;

  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/Activity")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setActivity(response?.data);
        console.log(response, "setActivity");
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
        <h2>ALL ACTIVITIES</h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "38px",
        }}
      >
        <Row xs={4} md={4}>
          {Activity.length &&
            Activity.map((event) => (
              <Col style={{ marginBottom: "32px" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="event1.jpeg" />
                  <Card.Body
                    style={{ maxHeight: "207px", overflowY: "scroll" }}
                  >
                    <Card.Title>{event.activityName}</Card.Title>
                    <Card.Text>{event.activityDescription}</Card.Text>
                    <Card.Text> City:{event.activityCity} </Card.Text>
                    <Card.Text>State: {event.activityState}</Card.Text>
                    <Card.Text>Address:{event.activityAddress}</Card.Text>
                  </Card.Body>
                  <Button variant="primary">BOOK</Button>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

export default Activity;
