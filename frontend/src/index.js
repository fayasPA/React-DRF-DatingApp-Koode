import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import "./index.css"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AdminApp from './AdminApp/AdminApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider >
      <Router>
        <Routes >
        <Route path='/*' element={<App />} />
            <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Router>
    </AuthProvider >
  // </React.StrictMode> 
);


