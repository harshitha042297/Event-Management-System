import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles.css'

const EventsNavbar = ({isAdmin}) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className='logo'>
            <h2>VENUE GENIE</h2>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/Events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/Activity">Activities</NavLink>
            </li>
            <li>
              <NavLink to="/Players">Players</NavLink>
            </li>
            { isAdmin&&
            <li>
              <NavLink to="/UploadProduct">Upload Events</NavLink>
            </li>}
            <li>
              <NavLink to="/UploadActivity">Upload Activity</NavLink>
            </li>
            { !isAdmin&&
            <li>
              <NavLink to="/Reservations">Reservations</NavLink>
            </li>}
            <li>
              <NavLink to="/UserProfile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/Landing">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* <img src="landing_page.jpg" width="1450" height="700"></img> */}
    </nav>

  )
}

export default EventsNavbar