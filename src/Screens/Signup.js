import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import signup from '../images/signup.jpg'

export default function Signup() {
  const [credenditals, setcredenditals] = useState({ name: "", email: "", password: "", location: "" })
  let navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/Createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credenditals.name, email: credenditals.email, password: credenditals.password, location: credenditals.location })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("authToken", json.authToken);
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }


  //   if (!json.success) {
  //     alert("enter valied entry")
  //   }
  //   else {
  //     setflag(true)
  //   }


  // }
  const onchange = (event) => {
    setcredenditals({ ...credenditals, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className="row ">
        <div className="col-sm-5 ">
          <img src={signup} alt="" width="600" height="600" />
        </div>
        <div className='col-sm-5 card'>
          <h3 style={{ "color": "blue" }}><b>Signup</b></h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credenditals.name} onChange={onchange} />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credenditals.email} onChange={onchange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credenditals.password} onChange={onchange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
              <input type="text" className="form-control" name='location' value={credenditals.location} onChange={onchange} />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Create Account</button>
            <Link to="/login" className='m-3 btn btn-success'>Already User</Link>
            <Link to="/" className='m-3 btn btn-danger'>Back To Home</Link>
          </form>
        </div>
      </div>
    </>
  )
}
