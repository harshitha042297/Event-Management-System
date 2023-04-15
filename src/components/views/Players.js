import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import "../../styles.css";

function Players() {
  const [Players, setPlayers] = useState([]);
  const [copyPlayers, setCopyPlayers] = useState([]);
  const [invite,setInvite]=useState("");
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;
  
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [skill, setSkill] = useState("");
  
  useEffect(() => {
    axios
      .get("https://se-event-management.azurewebsites.net/User")
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        setPlayers(response?.data);
        setCopyPlayers(response?.data);
        console.log(response);
      });
  }, []);

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleInterests = (e) => {
    setInterests(e.target.value);
  };
  const handleSkill = (e) => {
    setSkill(e.target.value);
  };

  const submitInvite = (user) => {
    console.log(user);
    alert("testing invite")
  };
  const inviteFunction = (e) => {
    setInvite(e.target.value);
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
    temp = filterByValue(copyPlayers, skill, "userDescription");
    temp = filterByValue(temp, interests, "userDescription");
    temp = filterByValue(temp, gender, "gender");
    setPlayers(temp);
    console.log(skill, interests, gender, temp);
  };

  const clearEvent = () => {
    setPlayers(copyPlayers);
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
        <h2>ALL USERS</h2>
      </div>

      <div style={{ display: "flex" }} className="row">
        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "130px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by skill"
            value={skill}
            onChange={(e) => handleSkill(e)}
          ></input>
        </div>

        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "15px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by interests"
            value={interests}
            onChange={(e) => handleInterests(e)}
          ></input>
        </div>

        <div
          className="form-outline"
          style={{ width: "300px", marginLeft: "15px", marginBottom: "25px" }}
        >
          <input
            class="form-control"
            placeholder="Search by gender"
            value={gender}
            onChange={(e) => handleGender(e)}
          ></input>
        </div>

        <div className="col-md-1">
          <Button style={{ marginLeft: "60px" }} onClick={() => searchEvent()}>
            Search
          </Button>
        </div>
        <div className="col-md-1">
          <Button style={{ marginLeft: "40px" }} onClick={() => clearEvent()}>
            Clear
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          className: "userdisplay",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "38px",
        }}
      >
        <Row xs={4} md={4}>
          {Players.length &&
            Players.map((user) => (
              <Col style={{ marginBottom: "32px" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body
                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                  >
                    <Card.Title styles={{ className: "userdisplay" }}>
                      {user.firstName}
                    </Card.Title>
                    {/* <Card.Text>{user.lastName}</Card.Text> */}
                    <Card.Text>Email: {user.email} </Card.Text>
                    <Card.Text>Age: {user.age}</Card.Text>
                    <Card.Text>Gender: {user.gender}</Card.Text>
                    <Card.Text>Interests: {user.userDescription}</Card.Text>

                    <form className="mt-5 mb-5">
                          <label>Fill to invite</label>
                          <input
                            id={user.eventID}
                            className="form-control"
                            // onChange={onReviewChange(event.eventID)}
                            onChange={(e) =>
                              inviteFunction(e)
                            }
                            Value={invite}
                            type="text"
                          />
                          <br></br>
                        </form>

                  </Card.Body>
                  <Button onClick={() => submitInvite(user)} variant="primary">
                    INVITE
                  </Button>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

export default Players;
