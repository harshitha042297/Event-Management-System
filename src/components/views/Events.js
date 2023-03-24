import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import CheckboxLand from "./CheckboxLand";
import "../../styles.css";
import ChatEng from "./ChatEng";

function Events() {
  const [Events, setEvents] = useState([]);
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;
  const details = JSON.parse(sessionStorage.getItem("userDetails"));

  // console.log(isAdmin,sessionStorage.getItem("userDetails"),"isAdmin")
  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/Event")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setEvents(response?.data);
        console.log(response);
      });
  }, []);

  const submitReservation = (event) => {
    // if booking == capacity throw error otherwise call

      axios
        .post(
          "https://se-event-management.azurewebsites.net/booking/bookevent",
          {
            userID: details.userID,
            Email: details.email,
            FirstName: details.firstName,
            EventID: event.eventID,
          }
        )

        .then((response) => {
          if (response?.status === 200) {
            alert("Successfull booking");
          }
        });
    
  };

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
        <h2>ALL EVENTS</h2>
      </div>

      <div>
        {" "}
        <CheckboxLand />
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
          {Events.length &&
            Events.map((event) => (
              <Col style={{ marginBottom: "32px" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="event1.jpeg" />
                  <Card.Body
                    style={{ maxHeight: "207px", overflowY: "scroll" }}
                  >
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Text>{event.eventDescription}</Card.Text>
                    <Card.Text> City:{event.eventCity} </Card.Text>
                    <Card.Text>State: {event.eventState}</Card.Text>
                    <Card.Text>Address:{event.eventAddress}</Card.Text>
                    <Card.Text>Occupied:{event.occupied}</Card.Text>
                    <Card.Text>Capacity:{event.capacity}</Card.Text>
                  </Card.Body>
                  <Button
                    onClick={() => submitReservation(event)}
                    variant="primary"
                  >
                    BOOK
                  </Button>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      {/* <div> */}
      {/* <ChatEng /> */}
      {/* </div> */}
    </>
  );
}

export default Events;
