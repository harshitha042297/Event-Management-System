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

  const [copyEvents, setCopyEvents] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");

  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/Activity")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setActivity(response?.data);
        setCopyEvents(response?.data);
        console.log(response, "setActivity");
      });
  }, []);

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
    temp = filterByValue(copyEvents, cityName, "activityCity");
    temp = filterByValue(temp, stateName, "activityState");
    temp = filterByValue(temp, venueName, "activityName");
    setActivity(temp);
    console.log(venueName, cityName, stateName, temp);
  };

  const clearEvent = () => {
    setActivity(copyEvents);
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
        <h2>ALL ACTIVITIES</h2>
      </div>

      <div style={{ display: "flex" }} className="row">
        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "130px", marginBottom: "30px" }}
        >
          <input
            class="form-control"
            placeholder="Search by name"
            value={venueName}
            onChange={(e) => handleVenue(e)}
          ></input>
        </div>

        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "30px", marginBottom: "30px" }}
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
          style={{ width: "300px", marginLeft: "40px", marginBottom: "30px" }}
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
          <Button style={{ marginLeft: "30px" }} onClick={() => clearEvent()}>
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
