import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import UserList from './components/Userlist/UserList';
import EditUser from './components/Edituser/EditUser';
import PrivateRoute from './components/PrivateRoute';
import './utils/axios-config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        } />
        <Route path="/edit/:id" element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;