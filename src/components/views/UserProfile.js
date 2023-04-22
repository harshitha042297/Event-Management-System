import React from "react";
import { ReactDOM } from "react";
import EventsNavbar from "./EventsNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Events from "./Events";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

function UserProfile() {
  const [bookmarkDetails, setbookmarkDetails] = useState([]);
  const userID = JSON.parse(sessionStorage.getItem("userDetails"));
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;
  const navigate = useHistory();

  const variables = {
    userId: userID.userID,
  };

  useEffect(() => {
    axios
      .post(
        "https://se-event-management.azurewebsites.net/bookmarks",
        variables
      )
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setbookmarkDetails(response?.data);
        console.log(response);
      });
  }, []);

  const submitReservation = (event) => {
    // if booking == capacity throw error otherwise call

    axios
      .post("https://se-event-management.azurewebsites.net/booking/bookevent", {
        userID: userID.userID,
        Email: userID.email,
        FirstName: userID.firstName,
        EventID: event.eventID,
      })

      .then((response) => {
        if (response?.status === 200) {
          alert("Successfull booking");
        }
      });
  };

  return (
    <>
      <EventsNavbar isAdmin={isAdmin}/>
      <br></br>
      <div style={{marginBottom:"25px", paddingLeft:"30px"}}>
        <h3>User Details</h3>
        <Table style={{width:"300px"}} bordered hover  striped>
        <thead>
          <tr>
            <th>First Name</th>
            <td>{userID.firstName}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>Last Name</th>
            <td>{userID.lastName}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>UserName</th>
            <td>{userID.userName}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>Email</th>
            <td>{userID.email}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>Age</th>
            <td>{userID.age}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>Gender</th>
            <td>{userID.gender}</td>
          </tr>
          </thead>
          <thead>
          <tr>
            <th>Interests</th>
            <td>{userID.userDescription}</td>
          </tr>
          </thead>
        </Table>
      </div>
      <br></br>
      {!isAdmin &&
      <div style={{paddingLeft:"30px"}}>
      <h3>Bookmarks</h3>
      <Row xs={4} md={4}>
        {bookmarkDetails.length &&
          bookmarkDetails.map((event) => (
            <Col style={{ marginBottom: "32px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="event1.jpeg" />
                <Card.Body style={{ maxHeight: "207px", overflowY: "scroll" }}>
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
}
    </>
  );
}

export default UserProfile;
