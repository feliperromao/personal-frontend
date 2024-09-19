// old index

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Personal from './pages/Personal';
import Student from './pages/Student';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Students from './pages/personal/Students';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            {/* PERSONAL ROUTES */}
            <Route path="/personal" element={<ProtectedRoute element={<Personal />} />}/>
            <Route path="/students" element={<ProtectedRoute element={<Students />} />}/>
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
