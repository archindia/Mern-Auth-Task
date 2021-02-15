import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Logout extends Component {
    constructor(){
        super();
        this.state = {
            login:true
        }
    }
  
    render() {
        localStorage.clear();
        var auth = JSON.parse(localStorage.getItem('auth-token'));
        return (
            <div>
            {auth ? <Redirect to="dashboard"/>: <Redirect to="/"/>}
            </div>
        )
    }
}


