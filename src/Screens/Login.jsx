import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import login from '../images/login.jpg'
export default function Login() {
  const [credenditals, setcredenditals] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credenditals.email, password: credenditals.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("enter valied entry")
    }
    if (json.success) {
      localStorage.setItem('userEmail', credenditals.email)
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      console.log(localStorage.setItem('userEmail', credenditals.email))
      navigate("/");

    }


  }
  const onchange = (event) => {
    setcredenditals({ ...credenditals, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className=" row">
        <div className="col-sm-5  ">
          <img src={login} alt="" width="600" height="600" />
        </div>
        <div className='card col-sm-5 '>
          <h3 style={{ "color": "blue" }}><b>Login</b></h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credenditals.email} onChange={onchange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credenditals.password} onChange={onchange} />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Login</button>
            <Link to="/Createuser" className='m-3 btn btn-success'>I AM A NewUser</Link>
          </form>
        </div >
      </div>
    </>
  );
}
