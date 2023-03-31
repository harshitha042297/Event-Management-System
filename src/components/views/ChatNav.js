import React from 'react'
import '../../styles.css' 
import { NavLink } from 'react-router-dom'

function ChatNav() {
  return (
    <div className='chatnavbar'>
        <li>
              <NavLink to="/Chat">CHAT</NavLink>
            </li>
    </div>
  )
}

export default ChatNav