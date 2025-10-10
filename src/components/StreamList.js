import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
// adding in code for Google OAuth
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './StreamList.css';





function StreamList() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [input, setInput] = useState('');
  const [streams, setStreams] = useState(() => {
    const saved = localStorage.getItem('streamList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streams));
  }, [streams]);

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    setIsLoggedIn(true);
  }
}, []);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const apiKey = 'fe51d488e57058338a4e366bf164227a';

  const fetchMovieInfo = async (title) => {
    try {
      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
      );
      const searchData = await searchRes.json();
      const movie = searchData.results[0];
      if (!movie) return null;

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
      );
      const creditsData = await creditsRes.json();
      const directorObj = creditsData.crew.find((person) => person.job === 'Director');

      return {
        title: movie.title,
        year: movie.release_date?.slice(0, 4) || 'Unknown',
        director: directorObj?.name || 'Unknown',
      };
    } catch (error) {
      alert('Failed to fetch movie information. Please try again later.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const info = await fetchMovieInfo(input.trim());
      if (!info) {
        alert('Movie not found. Try a different title.');
        return;
      }

      const newStream = {
        id: Date.now(),
        ...info,
      };

      setStreams([...streams, newStream]);
      setInput('');
    }
  };

  const handleDelete = (id) => {
    setStreams(streams.filter((stream) => stream.id !== id));
  };

  const handleEdit = async (id, newTitle) => {
    const info = await fetchMovieInfo(newTitle);
    if (!info) {
      alert('Movie not found.');
      return;
    }

    setStreams(
      streams.map((stream) =>
        stream.id === id ? { ...stream, ...info } : stream
      )
    );
  };
  const moveUp = (index) => {
  if (index === 0) return;
  const updated = [...streams];
  [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
  setStreams(updated);
};

const moveDown = (index) => {
  if (index === streams.length - 1) return;
  const updated = [...streams];
  [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
  setStreams(updated);
};
  return (
    <div className="streamlist-container">
      <NavBar />
      <img src="/movieheader.png" alt="Movie Header" className="logo" />
      <h2>Welcome to StreamList</h2>
      <p className="instructions">
        Type in the name of a movie you'd like to watch, then hit "Add" to save it to your list.
        Keep titles short and clear. No need for punctuation or release years.
      </p>
      {/* Google Login Button for week 5 */}
      {!isLoggedIn && (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            setIsLoggedIn(true);
            console.log("Logged in as:", decoded.name);
            localStorage.setItem('user', JSON.stringify(decoded));
            setUser(decoded);
          }}
          onError={() => {
            console.log("OAuth Error");
          }}
        />
)}






      <form onSubmit={handleSubmit} className="add-stream-form">
        <div className="add-stream-row">
          <input
            type="text"
            placeholder="Enter a movie or film name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>



      <ul className="stream-list">
        {streams.map((stream, index) => (
  <li key={stream.id} className="stream-item">
    <div className="stream-details">
      <p>
        <strong>{stream.title}</strong> — {stream.year} — {stream.director}
      </p>
      <div className="stream-actions">
        <button onClick={() => moveUp(index)}>↑</button>
        <button onClick={() => moveDown(index)}>↓</button>
        <button onClick={() => {
          setEditingId(stream.id);
          setEditText(stream.title);
        }}>Edit</button>
        <button onClick={() => handleDelete(stream.id)}>Delete</button>
      </div>
    </div>
    {editingId === stream.id && (
      <div className="edit-row">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={() => {
          handleEdit(stream.id, editText);
          setEditingId(null);
        }}>Save</button>
        <button onClick={() => setEditingId(null)}>Cancel</button>
      </div>
    )}
  </li>
))}
      </ul>
    </div>
  );
}

export default StreamList;