import React, { Component } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname:"",
            lastname:"",
            dob:"",
            email: "",
            password: "",
            gender:"",

            firstnameErr:"",
            lastnameErr:"",
            dobErr:"",
            emailErr: "",
            passwordErr: "",
            genderErr:"",
        }
        this.onCheckGender = this.onCheckGender.bind(this);
    }
    
    onCheckGender(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    //submit record to database
    submitLoginForm() {
        this.setState({ emailErr: "", passwordErr: "" });
        if (this.valid()) {
            // console.log(`login data`, this.state);
            // alert("form is valid");
            const URL = "http://localhost:8080/api/users/register";
            fetch(URL, {
             method: "post",
             headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            json: true,
             body: JSON.stringify(this.state)
            
             }).then((result)=>{
                //  console.log(`firsrt log`,result)
                    result.json().then((response)=>{
                        // console.warn(`result`,response);
                        if(response.status){
                            toast.success(response.msg,{
                                position:"top-right"
                            });
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

    //validation add for email,password,firstname
    valid() {
        if (!this.state.email.includes('@') && this.state.password.length < 5) {
            this.setState({ emailErr: "Email is required", passwordErr: "Password is required"
            });
        }
        else if (!this.state.email.includes('@')) {
            this.setState({ emailErr: "Email not valid" });
        }
        else if (this.state.password.length < 5) {
            this.setState({ passwordErr: "password length should be more than 5" });
        }
        // else if (this.state.firstname) {
        //     this.setState({ firstnameErr: "First Name is required" });
        // }
        else {
            return true;
        }
    }

    //render view template of signup
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <h3>Register</h3>

                        <div className="form-group">
                            <label className="d-flex justify-content-start">First Name</label>
                            <input type="email" className="form-control"
                                onChange={(e) => { this.setState({ firstname: e.target.value }) }}
                                placeholder="Enter First Name" autoComplete="off" />
                                
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="d-flex justify-content-start">Last Name</label>
                            <input type="text" className="form-control"
                            onChange={(e) => { this.setState({ lastname: e.target.value }) }}
                            placeholder="Enter Last Name" />
                        </div>

                        <div className="form-group">
                        <label className="d-flex justify-content-start">Email</label>
                        <input type="email" className="form-control"
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            placeholder="Enter Email" autoComplete="off" />
                        <p className="error">{this.state.emailErr}</p>
                    </div>
                    <br />

                        <div className="form-group">
                            <label className="d-flex justify-content-start">Password</label>
                            <input type="password" className="form-control"
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                placeholder="Enter Password" />
                            <p className="error">{this.state.passwordErr}</p>
                        </div><br/>

                        <div className="form-group">
                            <label className="d-flex justify-content-start">DOB</label>
                            <input type="date" className="form-control" placeholder="Enter dob"
                            onChange={(e) => { this.setState({ dob: e.target.value }) }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="d-flex justify-content-start">Gender</label>
                            <label className="radio-inline d-flex justify-content-start">
                                <input type="radio"
                                 value="female" name="gender" 
                                 checked={this.state.gender==="female"}
                                onChange={this.onCheckGender} />Female
                              </label>
                            <label className="radio-inline d-flex justify-content-start">
                                <input type="radio"
                                 value="male" name="gender"
                                checked={this.state.gender==="male"}
                                onChange={this.onCheckGender}  />Male
                              </label>
                        </div>


                        <button onClick={() => this.submitLoginForm()} className="btn btn-dark btn-lg btn-block">Register</button>
                        <p className="forgot-password text-right">
                            Already registered  <Link to="/" tag="a">Login</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        );
    }

}
export default Signup;