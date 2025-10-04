import React, { useState, useEffect } from 'react';

function StreamList() {
  const [input, setInput] = useState('');
  const [streams, setStreams] = useState(() => {
    const saved = localStorage.getItem('streamList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streams));
  }, [streams]);

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

  return (
    <div className="streamlist-container">
      <img src="/movieheader.png" alt="Movie Header" className="logo" />
      <h2>Welcome to StreamList</h2>
      <p className="instructions">
        Type in the name of a movie you'd like to watch, then hit "Add" to save it to your list.
        Keep titles short and clear. No need for punctuation or release years.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or film name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="stream-list">
        {streams.map((stream) => (
          <li key={stream.id}>
            {editingId === stream.id ? (
              <>
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
              </>
            ) : (
              <>
                <p>
                  <strong>{stream.title}</strong> — {stream.year} — {stream.director}
                </p>
                <button onClick={() => {
                  setEditingId(stream.id);
                  setEditText(stream.title);
                }}>Edit</button>
                <button onClick={() => handleDelete(stream.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;