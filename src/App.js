import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello! I\'m a chatbot. How can I assist you today?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const newMessage = { text: inputValue, isBot: false };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setTimeout(() => {
      const botMessage = { text: 'I\'m sorry, I don\'t understand.', isBot: true };
      setMessages([...messages, botMessage]);
    }, 1000);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Chatbot</h1>
        </div>
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={message.isBot ? 'bot-message' : 'user-message'}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyUp={handleKeyUp} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;