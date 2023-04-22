import React from "react";
import { ReactDOM } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Reservations() {
  const [bookingDetails, setbookingDetails] = useState([]);
  const [oldBookingDetails, setOldBooking] = useState([]);
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const userID = JSON.parse(sessionStorage.getItem("userDetails")).userID;
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;
  const [Review, setReview] = useState("");
  const [Rating, setRating] = useState("");
  const [formData, setFormData] = useState([]);
  const [tempID, setTempID] = useState(null);

  const onReviewChange = (val, event) => {
    
    if (formData.length > 0) {
      setTempID(event.eventID);
     
      const objIndex = formData.findIndex((obj) => obj.eventID == event.eventID);
      console.log(objIndex,event.eventID,val)
        if (
          val &&
          val.target &&
          val.target.value 
          
        ) {
          formData[objIndex].Review = val.target.value;
        }
    }
  };
  const onRatingChange = (val, event) => {
    if (formData.length > 0) {
      setTempID(event.eventID);
     
      const objIndex = formData.findIndex((obj) => obj.eventID == event.eventID);
      console.log(objIndex,event.eventID,val)
        if (
          val &&
          val.target &&
          val.target.value 
          
        ) {
          formData[objIndex].Rating = val.target.value;
        }
    }  };
  const variables = {
    userId: userID,
  };

  useEffect(() => {
    axios
      .post(
        "https://se-event-management.azurewebsites.net/Booking/get",
        variables
      )
      .then((response) => {
        const sampledata = response.data.map((a) => {
          return {
            title: a.eventName,
            date: moment(a.eventStart).utc().format("YYYY-MM-DD"),
          };
        });
        setbookingDetails(sampledata);
      });
  }, []);

  useEffect(() => {
    // console.log(bookingDetails, "testing bookingDetails");
  }, [bookingDetails]);

  useEffect(() => {
    axios
      .post(
        "https://se-event-management.azurewebsites.net/Booking/old",
        variables
      )
      .then((response) => {
        setOldBooking(response?.data);

        console.log(response, "old booking details");
      });
  }, []);

  useEffect(() => {
    if (oldBookingDetails.length > 0) {
      const data = oldBookingDetails.map((a) => {
        return { Rating: "", Review: "", eventID: a.eventID };
        // setFormData({...formData,obj})
        console.log(formData, "testing form");
      });
      setFormData(data);
      console.log(formData, "o testing form");
    }
  }, [oldBookingDetails]);

  const onSubmit = (event) => {
    // eventID, userID, venueownerID, rating, review
    const objIndex = formData.findIndex((obj) => obj.eventID == event.eventID);
    axios
      .post("https://se-event-management.azurewebsites.net/Rating/create", {
        userID: details.userID,
        EventID: event.eventID,
        VenueOwnerID: "1",
        Ratingvalue: formData[objIndex].Rating,
        Review: formData[objIndex].Review
      })

      .then((response) => {
        if (response?.status === 200 && response.data) {
          console.log(response, "review and rating");
          alert("review and rating");
        }
      });
  };

  return (
    <>
      <EventsNavbar isAdmin={!isAdmin} />
      <div>
        <div className="col-md-12" style={{ height: "900px" }}>
          <h3 style={{paddingLeft: "110px", marginTop:"30px"}}>Event and Activity reservations</h3>
          <div style={{ width: "1000px", height: "10px" , paddingLeft: "110px"}}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={bookingDetails}
              style={{backgroundColor:"ghostwhite"}}
            />
          </div>
        </div>
        {!isAdmin &&
        <div className="col-md-12">
          <h3 style={{paddingLeft: "110px"}}>Past Event Reservations</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "100px",
              paddingRight: "100px",
              marginBottom: "40px"
            }}
          >
            <Row xs={4} md={4}>
              {oldBookingDetails.length &&
                oldBookingDetails.map((event) => (
                  <Col style={{ marginBottom: "32px" }}>
                    <Card key={event.eventID} style={{ width: "18rem" }}>
                      <Card.Body
                        style={{ maxHeight: "400px", overflowY: "scroll",backgroundColor:"ghostwhite" }}
                      >
                        <Card.Title>{event.eventName}</Card.Title>
                        <Card.Text>{event.eventDescription}</Card.Text>
                        <Card.Text> City:{event.eventCity} </Card.Text>
                        <Card.Text>State: {event.eventState}</Card.Text>
                        <Card.Text>Address:{event.eventAddress}</Card.Text>

                        <form onSubmit={onSubmit} className="mt-5 mb-5">
                          <label>Review</label>
                          <input
                            id={event.eventID}
                            className="form-control"
                            // onChange={onReviewChange(event.eventID)}
                            onChange={(e) =>
                              onReviewChange(e, event)
                            }
                            // value={Review}
                            type="text"
                          />
                          <br></br>
                          <label>Rating</label>
                          <input
                            id={event.eventID}
                            className="form-control"
                            onChange={(e) =>
                              onRatingChange(e, event)
                            }
                            // value={Rating}
                            type="number"
                          />
                          <br></br>
                        </form>
                      </Card.Body>
                      <Button onClick={() => onSubmit(event)} variant="primary">
                        Post Review
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
}
{!isAdmin &&
        <div className="col-md-12">
          <h3 style={{paddingLeft: "110px"}}>Activity Reservations</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "100px",
              paddingRight: "100px",
              marginBottom: "40px"
            }}
          >
            <Row xs={4} md={4}>
              {oldBookingDetails.length &&
                oldBookingDetails.map((event) => (
                  <Col style={{ marginBottom: "32px" }}>
                    <Card key={event.eventID} style={{ width: "18rem" }}>
                      <Card.Body
                        style={{ maxHeight: "400px", overflowY: "scroll",backgroundColor:"ghostwhite" }}
                      >
                        <Card.Title>{event.eventName}</Card.Title>
                        <Card.Text>{event.eventDescription}</Card.Text>
                        <Card.Text> City:{event.eventCity} </Card.Text>
                        <Card.Text>State: {event.eventState}</Card.Text>
                        <Card.Text>Address:{event.eventAddress}</Card.Text>

                        <form onSubmit={onSubmit} className="mt-5 mb-5">
                          <label>Review</label>
                          <input
                            id={event.eventID}
                            className="form-control"
                            // onChange={onReviewChange(event.eventID)}
                            onChange={(e) =>
                              onReviewChange(e, event)
                            }
                            // value={Review}
                            type="text"
                          />
                          <br></br>
                          <label>Rating</label>
                          <input
                            id={event.eventID}
                            className="form-control"
                            onChange={(e) =>
                              onRatingChange(e, event)
                            }
                            // value={Rating}
                            type="number"
                          />
                          <br></br>
                        </form>
                      </Card.Body>
                      <Button onClick={() => onSubmit(event)} variant="primary">
                        Post Review
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
}
      </div>
    </>
  );
}

export default Reservations;
