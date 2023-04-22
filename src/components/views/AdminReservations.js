import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
// import Container from "react-bootstrap/Container";
import CheckboxLand from "./CheckboxLand";
import { useNavigate } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles.css";
import ChatEng from "./ChatEng";
import ChatNav from "./ChatNav";
import MapComp from "./MapComp";

function AdminReservations() {
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [Events, setEvents] = useState([]);
  // const [userDialog,setUserDiag]=useState(false);
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;

  useEffect(() => {
    axios
      .post("https://se-event-management.azurewebsites.net/VenueOwner", {
        userID: details.userID,
      })
      .then((response) => {
        setEvents(response?.data);
        console.log(response);
      });
  }, []);

  const [userlist, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (eventID) => {
    axios
      .post(
        "https://se-event-management.azurewebsites.net/VenueOwner/registered",
        {
          eventID: eventID,
        }
      )
      .then((response) => {
        setUserList(response?.data);
        setShow(true);
        console.log(response);
      });
  };

  return (
    <>
      <EventsNavbar isAdmin={isAdmin} />
      <br></br>
      <h3 style={{ paddingLeft: "38px", marginBottom: "25px" }}>
        User reservations for each venue
      </h3>
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

                    <Button onClick={() => handleShow(event.eventID)}>
                      List of users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>List of users registered for this event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userlist.length &&
                  userlist.map((uList) => (
                    <tr>
                      <>
                        <td>{uList.userName}</td>
                        <td>{uList.email}</td>
                      </>
                    </tr>
                  ))}
              </tbody>
              
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default AdminReservations;
