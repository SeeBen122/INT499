import React from 'react';
import NavBar from './NavBar'; // optional, if you want NavBar here

function Movies() {
  return (
    <div className="movies-container">
      <NavBar />
      <h2>Movies Page</h2>
      {/* Add your content here */}
    </div>
  );
}

export default Movies;