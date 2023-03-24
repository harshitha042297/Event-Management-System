import React from "react";
import { ReactDOM } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EventsNavbar from "./EventsNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";

function Reservations() {
  const [bookingDetails, setbookingDetails] = useState([]);
  const userID = JSON.parse(sessionStorage.getItem("userDetails")).userID;
  const isAdmin = JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner;

  const variables = {
    userId: userID,
  };

  useEffect(() => {
    axios
      .post(
        "https://se-event-management.azurewebsites.net/Booking/get",
        variables
      )
      // .then((data) => data.json())
      // .then((response) => console.log(response, "api response"));
      .then((response) => {
        // setbookingDetails(response.data);
        // console.log(response,bookingDetails,"booking response");
        // console.log(response.data[0].userID);
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
    console.log(bookingDetails, "testing bookingDetails");

    // console.log(sampledata,"sampledata")
  }, [bookingDetails]);

  return (
    <>
      <EventsNavbar isAdmin={isAdmin} />
      <h4>Reservations</h4>
      <div style={{ width: "1000px", height: "10px" }}>
        <FullCalendar 
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          // eventContent={renderEventContent}
          // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
          events={bookingDetails}
          // event={bookingDetails}
        />
      </div>
    </>
  );
}

export default Reservations;
