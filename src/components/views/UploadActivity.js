import React from 'react'
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../../utilities/FileUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventsNavbar from "./EventsNavbar";
import CheckboxLand from "./CheckboxLand";
import axios from "axios";

function UploadActivity() {
  const [TitleValue, setTitleValue] = useState("");
  const [CapacityValue, setCapacitytValue] = useState("");
  const [SportValue, setSportValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [CityValue, setCityValue] = useState("");
  const [StateValue, setStateValue] = useState("");
  const [AddressValue, setAddressValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const venueOwner=JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner
  
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  const onSportChange = (event) => {
    setSportValue(event.currentTarget.value);
  };
  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };
  const onCapacityChange = (event) => {
    setCapacitytValue(event.currentTarget.value);
  };
  // const onVenueChange = (event) => {
  //   setVenueValue(event.currentTarget.value);
  // };
  const onCityChange = (event) => {
    setCityValue(event.currentTarget.value);
  };

  const onStateChange = (event) => {
    setStateValue(event.currentTarget.value);
  };

  const onAddressChange = (event) => {
    setAddressValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // if (!TitleValue || !DescriptionValue || !CityValue ||
    //   !StateValue || !SportValue) {
    //   return alert('Fill all the fields')
    //   }
    const userID=JSON.parse(sessionStorage.getItem("userDetails")).userID
    // const venueOwner=JSON.parse(sessionStorage.getItem("userDetails")).venue_Owner
    
    const variables = {
      userID: userID,
      ActivityName: TitleValue,
      ActivityDescription: DescriptionValue,
      ActivityCity: CityValue,
      ActivitySportName:SportValue,
      ActivityState: StateValue,
      ActivityStart:startDate,
      ActivityEnd:endDate,
      Occupied: 0,
      Capacity:CapacityValue,
      ActivityAddress: AddressValue
  }
      
  axios.post("https://se-event-management.azurewebsites.net/Activity/create", variables)
      .then(response => {
          alert("success")
      })
  };

  return (
  <div>
  <EventsNavbar isAdmin={venueOwner} />
<div style={{ maxWidth: "700px", margin: "2rem auto" }}>
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <h2 level={2} className="text-center mt-5 mb-5">
      Upload Activity
    </h2>
  </div>

  <form onSubmit={onSubmit} className="mt-5 mb-5">
    {/* DropZone */}

    <label>Activity Name</label>
    <input
      className="form-control"
      onChange={onTitleChange}
      value={TitleValue}
    />
    <br />
    <label>Sport Name</label>
    <input
      className="form-control"
      onChange={onSportChange}
      value={SportValue}
    />
    <br/>
    <label>Activity Description</label>
    <textarea
      class="form-control"
      rows="5"
      onChange={onDescriptionChange}
      value={DescriptionValue}
    />
    <br></br>
    
    <label>Activity Capacity</label>
    <input
      className="form-control"
      onChange={onCapacityChange}
      value={CapacityValue}
    />
    <br></br>
    <label>Activity Start Time</label>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy hh:mm:ss aa"
      showTimeInput
    />
    <br></br>
    <br></br>
    <label>Activity End Time</label>
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy hh:mm:ss aa"
      showTimeInput
    />
    <br></br>
    <br/>
    <label>City</label>
    <input
      className="form-control"
      onChange={onCityChange}
      value={CityValue}
    />
    <br />
    <label>State</label>
    <input
      className="form-control"
      onChange={onStateChange}
      value={StateValue}
    />
    <br />
    
    <label>Address</label>
    <input
      className="form-control"
      onChange={onAddressChange}
      value={AddressValue}
    />
    <br />
    
    <button textAlign="center" className="btn btn-primary" onClick={onSubmit}>
      SUBMIT
    </button>
  </form>
</div>
</div>
);
}

export default UploadActivity