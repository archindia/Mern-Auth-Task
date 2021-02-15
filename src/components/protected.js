import React from 'react'
import {Redirect} from 'react-router-dom';

export default function Protected(props) {
    const Cmp = props.cmp;
    var auth = JSON.parse(localStorage.getItem('auth-token'));
    return (
        <div>
          {auth ? <Cmp/> : <Redirect to="login"/>}
        </div>
    )
}
