import React, { useState } from 'react';
import './App.css';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

  const sendMessage = async () => {
    const userMessage = { text: inputValue, isBot: false };
    const newMessage = { text: '...', isBot: true };
    setMessages((prevMessages) => [...prevMessages, userMessage, newMessage]);
    setInputValue('');
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputValue,
    });
    console.log(completion);
    fetch('https://example.com/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: inputValue })
    })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = { text: data.message, isBot: true };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = updatedMessages.findIndex((message) => message === newMessage);
        updatedMessages[messageIndex] = botMessage;
        return updatedMessages;
      });
    })
    .catch((error) => console.error(error));
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