import React from 'react';
import NavBar from './NavBar';
import './About.css';


function About() {
  return (
    <div className="about-container">
      <NavBar />
      <h2>About StreamList</h2>
      <p>
        StreamList is a simple, user-friendly app for tracking movies you want to watch.
        Navigate to the Home page and then just type in a movie or film title, and we’ll fetch information about the movie.
      </p>
      <p>
        You can log in with Google, reorder your list manually, and edit or delete entries anytime.
        Your list is saved locally, so it stays with you even after refreshing.
      </p>
      <p>
        Built with React and powered by The Movie Database (TMDb) API, StreamList is designed for speed, clarity, and control.
      </p>
      <p>
        Created by Charles Benson — passionate about clean UI, secure login flows, and polished user experiences.
      </p>
      <p>
        Developed as part of the INT499 course at the University of Arizona Global Campus.
      </p>


    </div>
  );
}

export default About;
