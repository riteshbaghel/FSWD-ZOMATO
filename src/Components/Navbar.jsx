import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import brand from "../images/brand.jpg";
import Modal from '../Modal'
import Cart from "../Screens/Cart";
import { useCart } from './ContextReduser';
export default function Navbar() {
  const [cartView, setcartView] = useState(false)
  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={brand} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link">Contact</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/MyOrder">
                    MyOrder
                  </Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex m-1">

                <Link className="btn btn-success m-1" to="/login">
                  Login
                </Link>


                <Link className="btn btn-success m-1" to="/Createuser">
                  Signup
                </Link>

              </div>
              : <div>
                <div className="btn btn-success m-3" onClick={() => setcartView(true)}>MyCart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setcartView(false)}><Cart /></Modal> : null}
                <Link to="/" className="btn btn-danger m-3" onClick={handleLogout}> Logout</Link>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  );
}
