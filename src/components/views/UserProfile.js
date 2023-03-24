import React from 'react'
import { ReactDOM } from 'react'
import EventsNavbar from './EventsNavbar'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import Events from './Events'

function UserProfile() {
const userID=JSON.parse(sessionStorage.getItem("userDetails"))

  return (
    <>
    <EventsNavbar />
    <div>
        <h4>User Details</h4>
        FirstName: {userID.firstName}
        <br></br>
        LastName: {userID.lastName}
        <br></br>
        Email: {userID.email}
        <br></br>
        UserName: {userID.userName}
        <br></br>
        Age: {userID.age}
        <br></br>
        Gender: {userID.gender}
        <br></br>
        Interests: {userID.userDescription}
        <br></br>
    </div>
    </>
  )
}

export default UserProfile