import React from "react";
import { useState, useRef, useEffect } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
// import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'
import EventsNavbar from "./EventsNavbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatEng() {
  let [username, setUsername] = useState("");
  // username = JSON.parse(sessionStorage.getItem("userDetails")).userName;

  function createDirectChat(creds) {
    // console.log(creds)
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder="Search Username"
          value={username}
          className={"form-control"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button styles={{backgroundColor: "#12203a", textAlign:"center"}} onClick={() => createDirectChat(creds)}>Create Chat</Button>
        <br></br>
      </div>
    );
  }

  return (
    <>
      <div>
        <EventsNavbar />
      </div>
      <br></br>
      <br></br>
      <ChatEngine
        projectID="24cbc432-a707-484f-8e78-d7f2e86dd727"
        userName="acirgir"
        userSecret="admin@123"
        renderNewChatForm={(creds) => renderChatForm(creds)}
        style={{ height: "150vh" }}
      />
    </>
  );
}

export default ChatEng;
