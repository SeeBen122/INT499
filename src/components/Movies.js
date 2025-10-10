import React from 'react';
import NavBar from './NavBar'; // optional, if you want NavBar here
import './Movies.css';

function Movies() {
  return (
    <div className="movies-container">
      <NavBar />

      <h2>Movie Player Page</h2>
      <p>This is where the movie player will be located.</p>
      <p>Coming soon in the next update!</p>
            <img
        src="/movieheader.png"
        alt="Movie Header"
        className="movie-header"
      />
    </div>


  );
}

export default Movies;