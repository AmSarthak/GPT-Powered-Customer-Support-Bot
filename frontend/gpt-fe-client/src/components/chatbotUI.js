import React from "react";
import './chatbot.css'

function ChatBotUi () {
    return(
        <div>
            <div class="chat-container">
        <div class="chat-header">
            <h2><i class="fas fa-robot animated"></i> Chatbot</h2>
        </div>
        <div class="chat-log" id="chatLog">
            <div class="chat-message bot">
                <p>Hello! How can I assist you?</p>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="Type your message..."/>
            <button id="sendBtn"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

        </div>
    )
}

export default ChatBotUi