import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("hjjkjkj",isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm/>} />
        <Route exact path="/list" element={<UserList/>} />
        <Route exact path="/create-user" element={<CreateUser/>} />
        <Route exact path="/edit-user/:id" element={<EditUser/>} />
      </Routes>
    </Router>
  );
};

export default App;
