import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
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
import AccountInfoLibrarian from './pages/AccountInfo/AccountInfoLibrarian';
import MediaLibrarian from './pages/Media/MediaLibrarian';

const customer_d = {
  cardId: -1,
  firstName: "",
  lastName: "",
  password: "",
  address: "",
  dateOfBirth: "",
}

const librarian_d = {
  employee_id: "-1",
  first_name: "",
  last_name: "",
  phone_no: "",
  address: "",
  social_insurance_no: "",
  library_address: "",
  password: "",
}


function App() {
  const [token, setToken] = useState("");
  const [create, setCreate] = useState(false);
  const [customer, setCustomer] = useState(customer_d);
  const [librarian, setLibrarian] = useState(librarian_d);
  const [searchTerms, setSearchTerms] = useState();



  if(!token) {
    if (create) {
      return <CreateAccount setToken={setToken} setCustomer={setCustomer}/>
    }
    return <Login setToken={setToken} setCustomer={setCustomer} setCreate={setCreate} setLibrarian={setLibrarian}/>
  }

  if (token.includes("C")) {
    return (
      <Router>
      <Navbar token={token} setSearchTerm={setSearchTerms}/>
      <Switch>
        <Route exact path="/">
          <Recommended customer={customer}/>
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} setCustomer={setCustomer} setCreate={setCreate} setLibrarian={setLibrarian}/>
        </Route>
        <Route exact path="/reservation-librarian">
          <ReservationLibrarian />
        </Route>
        <Route exact path="/reservation-client">
          <ReservationClient customer={customer}/>
        </Route>
        <Route path="/media">
          <Media customer={customer}/>
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount setToken={setToken} setCustomer={setCustomer}/>
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
          <SearchResults searchTerms={searchTerms}/>
        </Route>

      </Switch>
    </Router>
    )
  } else {
    return (
      <Router>
      <Navbar token={token} setSearchTerm={setSearchTerms}/>
      <Switch>
        <Route exact path="/">
          <Recommended librarian={librarian}/>
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} setCustomer={setCustomer} setCreate={setCreate} setLibrarian={setLibrarian}/>
        </Route>
        <Route exact path="/reservation-librarian">
          <ReservationLibrarian librarian={librarian}/>
        </Route>
        <Route exact path="/reservation-client">
          <ReservationClient customer={customer}/>
        </Route>
        <Route path="/media">
          <MediaLibrarian librarian={librarian}/>
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount setToken={setToken} setCustomer={setCustomer}/>
        </Route>
        <Route exact path="/administration">
          <Administration />
        </Route>
        <Route exact path="/add-media">
          <AddMedia />
        </Route>
        <Route exact path="/account-info">
          <AccountInfoLibrarian librarian={librarian} setLibrarian={setLibrarian}/>
        </Route>
        <Route exact path="/search-results">
          <SearchResults searchTerms={searchTerms}/>
        </Route>

      </Switch>
    </Router>
    )
  }
}

export default App;
