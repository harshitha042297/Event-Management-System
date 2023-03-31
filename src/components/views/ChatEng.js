import React from 'react'
import { useState, useRef, useEffect } from "react";
import { ChatEngine,getOrCreateChat } from 'react-chat-engine';
// import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

function ChatEng() {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
        console.log(creds)
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}
    
    return (
        <ChatEngine
            projectID="b6a27fd8-49e1-4c22-be2b-aef85de187c3"
            userName="acirgir"
            userSecret="admin@123"
            renderNewChatForm={(creds) => renderChatForm(creds)}
            style={{ height: '150vh' }}
        />
    );
}


export default ChatEng