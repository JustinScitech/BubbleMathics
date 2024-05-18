import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MathPage from './pages/MathPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import { AuthProvider } from "@propelauth/react";
import './index.css'

const authUrl = "https://8665905.propelauthtest.com"

//process.env.REACT_APP_AUTH_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider authUrl={authUrl}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/compete" element={<MathPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
