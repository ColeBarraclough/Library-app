import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Recommended from './pages/Recommended/Recommended';
import Navbar from './navbar/Navbar'
import Login from './pages/Login/Login'
import ReservationLibrarian from './pages/ReservationLibrarian/ReservationLibrarian';
import ReservationClient from './pages/ReservationClient/ReservationClient';
import Media from './pages/Media/Media';
import Library from './pages/Library/Library';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Administration from './pages/Administration/Administration';
import AddMedia from './pages/AddMedia/AddMedia';
import AccountInfo from './pages/AccountInfo/AccountInfo';

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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/reservation/librarian">
          <ReservationLibrarian />
        </Route>
        <Route exact path="/reservation/client">
          <ReservationClient />
        </Route>
        <Route exact path="/media">
          <Media />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route exact path="/administration">
          <Administration />
        </Route>
        <Route exact path="/add-media">
          <AddMedia />
        </Route>
        <Route exact path="/account-info">
          <AccountInfo />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
