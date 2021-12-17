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
import SearchResults from './pages/SearchResults/SearchResults';


import { useState } from 'react'

const customer_d = {
  cardId: -1,
  firstName: "",
  lastName: "",
  password: "",
  address: "",
  dateOfBirth: "",
}

function App() {
  const [token, setToken] = useState("");
  const [create, setCreate] = useState(false);
  const [customer, setCustomer] = useState(customer_d);



  if(!token) {
    if (create) {
      return <CreateAccount setToken={setToken} setCustomer={setCustomer}/>
    }
    return <Login setToken={setToken} setCustomer={setCustomer} setCreate={setCreate}/>
  }
  return (
    <Router>
      <Navbar token={token}/>
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
        <Route path="/media">
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
          <AccountInfo customer={customer} setCustomer={setCustomer}/>
        </Route>
        <Route exact path="/search-results">
          <SearchResults />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
