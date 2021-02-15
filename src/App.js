import React from 'react';
import './App.css';
import Login from "./components/login.component";
import Signup from './components/signup.component';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Dashboard from './components/dashboard.component';
import Home from './components/home.component';
import Protected from './components/protected';
import Nav from './components/nav';
import Logout from './components/logout.component';
import {Redirect} from 'react-router-dom';
function App() {
  var auth = JSON.parse(localStorage.getItem('auth-token'));
  return (
    <div className="App">
      <h1>React-Node-Authentication Application</h1>
     
      <Router>
      {auth ? <Redirect to="dashboard"/>: <Redirect to="/"/>}
      {auth ? <Nav/> : ""} 
        <Switch>
        <Route path="/dashboard" exact>
        <Protected cmp={Dashboard}/>
        </Route>
        <Route path="/home" exact>  <Protected cmp={Home}/></Route>
        <Route path="/register" exact><Signup/></Route>
        <Route path="/logout" exact><Logout/></Route>
        <Route path="/" exact><Login/></Route>
        </Switch>
      </Router>
      
  
    </div>
  );
}

export default App;
