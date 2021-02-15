import React, { Component } from 'react'
import {ToastContainer,toast} from 'react-toastify';
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {}
        };
       
      }
      componentDidMount() {
       let id = localStorage.getItem('id');
        const URL = `http://localhost:8080/api/users/${id}`;
        console.log(`url`,URL)
        fetch(URL)
          .then(res => res.json())
          .then(
            (result) => {
                console.log('Dashboard',result)
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() {
    let user = this.state.items;
        return (
            <div>
                <h1>Welcome to Dashboard {user.firstname}</h1>
                <p><strong className="dashboard-detail">First Name:</strong>{user.firstname}</p>
                <p><strong className="dashboard-detail">Last Name:</strong>{user.lastname}</p>
                <p><strong className="dashboard-detail">Email:</strong>{user.email}</p>
                <p><strong className="dashboard-detail">DOB:</strong>{user.dob}</p>
                <p><strong className="dashboard-detail">Gender:</strong>{user.gender}</p>
                <ToastContainer/>
            </div>
        )
    }
}
