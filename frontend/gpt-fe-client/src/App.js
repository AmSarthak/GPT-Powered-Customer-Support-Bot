import logo from './logo.svg';
import './App.css';
import ChatBot from './components/chatbox';

import React from 'react';


function App() {

  return (
    <div className="App">
      <div className="chatbot-btn-div">
        <ChatBot></ChatBot>
      </div>
    </div>
  );
}

export default App;
