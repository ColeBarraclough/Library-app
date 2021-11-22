import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Recommended from './pages/Recommended';
import Navbar from './navbar/Navbar'
import Login from './pages/Login'

import { useState } from 'react'

function App() {
  const [token, setToken] = useState(true);

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Recommended />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
