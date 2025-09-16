import React, { useState } from 'react';

function StreamList() {
  const [input, setInput] = useState('');
  const [streams, setStreams] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setStreams([...streams, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="streamlist-container">
      <img src="/EZTechMovie.png" alt="EZTechMovie Logo" className="logo" />
      <h2>Welcome to StreamList</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a stream name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="stream-list">
        {streams.map((stream, index) => (
          <li key={index}>{stream}</li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;