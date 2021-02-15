import React, { Component } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            emailerr: "",
            passworderr: "",
            login:false,
            token:null
        }
    }
    submitLoginForm() {
        this.setState({emailerr: "",passworderr: "" });
        if (this.valid()) {
            // console.log(`login data`, this.state);
            //fetch api
            const URL = "http://localhost:8080/api/users/login";
            fetch(URL, {
             method: "post",
             headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            json: true,
             body: JSON.stringify(this.state)
            
             }).then((result)=>{
                 console.log(`firsrt log`,result)
                    result.json().then((response)=>{
                        // console.warn(`result`);
                        console.log("RESPONSE-",response);
                        if(response.status){
                            toast.success("User login successfully.",{
                                position:"top-right"
                            });
                            localStorage.setItem('auth-token',JSON.stringify(response.token));
                            localStorage.setItem('id',response.user.id);
                            localStorage.setItem('email',response.user.email);
                            this.setState({login:true,token:response.token})
                            console.log('ID-',localStorage.getItem('id'));
                            console.log('EMAIL',localStorage.getItem('email'));
                            console.log('TOKEN',localStorage.getItem('token'));
                        }
                        else{
                            toast.error(response.msg,{
                                position:"top-right"
                            });

                        }
                    })
                }).catch((err)=>{
                    console.warn('err',err);
                    toast.error('Something went wrong failed to load response data',{
                        position:"top-right"
                    });
                });
        }

    }
    valid() {
        if(!this.state.email.includes('@')  && this.state.password.length < 5){
            this.setState({emailerr: "Email is required",passworderr: "Password is required" });
        }
      else  if (!this.state.email.includes('@')) {
            this.setState({ emailerr: "Email not valid"});
        }
      else if(this.state.password.length < 5) {
            this.setState({passworderr: "password length should be more than 5" });
        }
        else{
            this.setState({emailerr: "",passworderr: "" });
            return true;
        }
    }
    render() {
      
        var auth = JSON.parse(localStorage.getItem('auth-token'));
        
        return (
            <div className="container">
            {auth ? <Redirect to="dashboard"/>: <Redirect to="/"/>}
                <h3>Log in</h3>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="d-flex justify-content-start">Email</label>
                            <input type="email" className="form-control"
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                placeholder="Enter email" autoComplete="off" />
                            <p className="error">{this.state.emailerr}</p>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label className="d-flex justify-content-start">Password</label>
                            <input type="password" className="form-control"
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                placeholder="Enter password" />
                                <p className="error">{this.state.passworderr}</p>
                        </div>
                        <button className="btn btn-dark btn-lg btn-block"
                            onClick={() => this.submitLoginForm()}>Sign in</button>
                            <p className="forgot-password text-right">
                         Not Registered  <Link to="register" tag="a">Register</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}

export default Login;
