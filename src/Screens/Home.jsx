import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "./Footer";
import Card from "../Components/Card";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";

import { useEffect, useState } from "react";

export default function Home() {
  const [Search, setSearch] = useState('');
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    setfooditem(response[0]);
    setfoodcat(response[1]);

    // console.log(response[0], response[1])

  }
  useEffect(() => {
    loadData()
  }, [])



  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="2"
              ></button>
            </div>
            <div class="carousel-caption" style={{ zIndex: "5" }}>
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button class="btn btn-success" type="submit">
                  Search
                </button> */}
              </form>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={img1}
                  alt="Los Angeles"
                  className="d-block"
                  style={{ width: 500 }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={img2}
                  alt="Chicago"
                  className="d-block"
                  style={{ width: 500 }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={img3}
                  alt="New York"
                  className="d-block"
                  style={{ width: 500 }}
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>

          <div className="container-fluid mt-3"></div>
        </div>
      </div>


      <div className="container ml-4">
        {
          foodcat !== []
            ? foodcat.map((data) => {
              return (<div className="row mb-3 ">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem !== [] ?
                  fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLocaleLowerCase())))
                    .map(filteritem => {
                      return (
                        <div key={filteritem._id} className="col-12 col-md-6 col-lg-4">
                          <Card fooditem={filteritem}
                            options={filteritem.options[0]}

                          ></Card>
                        </div>
                      )
                    }
                    ) : <div>No Such Data Found</div>}
              </div>
              )
            })
            : ""

        }
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
