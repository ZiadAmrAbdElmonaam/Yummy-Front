import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const list = [
    "Banana",
    "Apple",
    "Orange",
    "Mango",
    "Pineapple",
    "Watermelon",
  ];

  const [filterList, setFilterList] = useState(list);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(list);
      return;
    }
    const filteredValues = list.filter(
      (item) =>
        item.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    );
    setFilterList(filteredValues);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          YUMMY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex ">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign Up
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/userSignUp">
                      As User
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/kitchenSignUP">
                      As Kitchen
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/PilotSignUp">
                      As Pilot
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="d-flex ">
              <input
                className="form-control me-2"
                type="text"
                name="query"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              />

              {filterList &&
                filterList.map((item, index) => (
                  <div key={index}>{item}</div> //Display each item
                ))}
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
