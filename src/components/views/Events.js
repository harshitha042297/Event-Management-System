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
import { useNavigate } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles.css";
import ChatEng from "./ChatEng";
import ChatNav from "./ChatNav";

function Events() {
  const [Events, setEvents] = useState([]);
  const [copyEvents, setCopyEvents] = useState([]);

  const isAdmin =
    JSON.parse(sessionStorage.getItem("userDetails")) &&
    JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner
      ? JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner
      : "";
  const details = JSON.parse(sessionStorage.getItem("userDetails"));

  const [venueName, setVenueName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");

  const navigate = useHistory();
  // console.log(isAdmin,sessionStorage.getItem("userDetails"),"isAdmin")
  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/Event")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setEvents(response?.data);
        setCopyEvents(response?.data);
        console.log(response);
      });
  }, []);

  const submitReservation = (event) => {
    // if booking == capacity throw error otherwise call

    axios
      .post("https://se-event-management.azurewebsites.net/booking/bookevent", {
        userID: details.userID,
        Email: details.email,
        FirstName: details.firstName,
        EventID: event.eventID,
      })

      .then((response) => {
        if (response?.status === 200) {
          alert("Successfull booking");
        }
      });
  };
  const submitBookmark = (event) => {
    axios
      .post("https://se-event-management.azurewebsites.net/bookmarks/create", {
        userID: details.userID,
        EventID: event.eventID,
      })

      .then((response) => {
        if (response?.status === 200) {
          console.log(response);
          alert("bookmarked successfully");
          navigate.push("/Events");
        }
      });
  };
  const submitDelete = (event) => {
    axios
      .post("https://se-event-management.azurewebsites.net/event/delete", {
        EventID: event.eventID,
      })

      .then((response) => {
        if (response?.status === 200) {
          alert("Deleted event");
          navigate.push("/Events");
        }
      });
  };

  const handleVenue = (e) => {
    setVenueName(e.target.value);
  };
  const handleCity = (e) => {
    setCityName(e.target.value);
  };
  const handleState = (e) => {
    setStateName(e.target.value);
  };

  
  function filterByValue(array, value, field) {
    return array.filter(
      (data) =>
        JSON.stringify(data[field])
          .toLowerCase()
          .indexOf(value.toLowerCase()) !== -1
    );
  }

  const searchEvent = () => {
    let temp = [];
    temp = filterByValue(copyEvents, cityName, "eventCity");
    temp = filterByValue(temp, stateName, "eventState");
    temp = filterByValue(temp, venueName, "eventDescription");
    setEvents(temp);
    console.log(venueName, cityName, stateName, temp);
  };

  const clearEvent = () => {
    setEvents(copyEvents);
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

      <div style={{ display: "flex" }} className="row">
        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "37px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by venue"
            value={venueName}
            onChange={(e) => handleVenue(e)}
          ></input>
        </div>

        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "65px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by city"
            value={cityName}
            onChange={(e) => handleCity(e)}
          ></input>
        </div>

        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "60px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by state"
            value={stateName}
            onChange={(e) => handleState(e)}
          ></input>
        </div>

        <div className="col-md-1">
          <Button style={{ marginLeft: "52px" }} onClick={() => searchEvent()}>
            Search
          </Button>
        </div>
        <div className="col-md-1">
          <Button style={{ marginLeft: "140px" }} onClick={() => clearEvent()}>
            Clear
          </Button>
        </div>
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

                    {!isAdmin && (
                      <Button
                        onClick={() => submitBookmark(event)}
                        variant="primary"
                      >
                        BOOKMARK
                      </Button>
                    )}

                    {details.userID == event.userID && (
                      <Button
                        onClick={() => submitDelete(event)}
                        variant="primary"
                      >
                        DELETE
                      </Button>
                    )}
                  </Card.Body>
                  {!isAdmin && (
                    <Button
                      onClick={() => submitReservation(event)}
                      variant="primary"
                    >
                      BOOK
                    </Button>
                  )}
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      {/* <div> 
      <ChatEng />
      </div> */}
      <ChatNav />
    </>
  );
}

export default Events;
