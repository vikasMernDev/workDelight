import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<LoginForm/>} />
    //     <Route exact path="/list" element={<UserList/>} />
    //     <Route exact path="/create-user" element={<CreateUser/>} />
    //     <Route exact path="/edit-user/:id" element={<EditUser/>} />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/private"
          element={<PrivateRoute />}
        >
          <Route path="create-user" element={<CreateUser />} />
          <Route exact path="list" element={<UserList />} />
          <Route exact path="create-user" element={<CreateUser />} />
          <Route exact path="edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
