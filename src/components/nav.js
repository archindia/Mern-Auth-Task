import React, { Component } from 'react'
import {Link} from 'react-router-dom';
var auth = JSON.parse(localStorage.getItem('auth-token'));
export default class Nav extends Component {
    render() {
        return (
            <div>
            {auth ? <Link to="dashboard" tag="a">Dashboard</Link> : ""}
            {auth ? <Link to="home" tag="a">Home</Link> : ""}
           
         

           {auth ? <Link to="logout" tag="a">Logout</Link>:""}
            </div>
        )
    }
}


// {!auth ? <Link to="/" tag="a">Login</Link> : ""} 