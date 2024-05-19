import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MathPage from './pages/MathPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import { AuthProvider } from "@propelauth/react";
import Serverlist from './pages/ServerList.jsx';
import './index.css'
import WaitingRoom from './pages/WaitingRoom.jsx';

const authUrl = import.meta.env.VITE_PROPEL_APP_AUTH_URL;
console.log('Auth URL:', authUrl);
console.log(authUrl)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider authUrl={authUrl}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/compete" element={<MathPage />} />
        <Route path="/servers" element={<Serverlist />} />
        <Route path="/waitingroom" element={<WaitingRoom />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
