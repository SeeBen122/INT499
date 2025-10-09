import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Movies from './components/Movies';
import Cart from './components/Cart';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StreamList from './components/StreamList';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "354254809621-8s4q0nue99hmjik6q8itvrjk6b0akr36.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();

