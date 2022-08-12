import React from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useState } from "react";
import Store from "../../Store/Store";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import "./NavBar.css";
import ItemCardComponent from "../ItemsCard/ItemCard";
import axiosInstance from "../../Network/Config";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  const [order, setOrder] = useState({
    totalPrice: 0,
    orderItems: [],
  });

  let basketLength = useSelector((state) => state.orders.userCart.length);
  let items = useSelector((state) => state.orders.userCart);

  let userId = useSelector((state) => state.login.userId);
  let kitchenId = useSelector((state) => state.login.ketchenId);

  let allItems = useSelector((state) => state.orders.userCart);

  let obj = {
    totalPrice: order.totalPrice + 20,
    orderItems: order.orderItems,
    kitchen: kitchenId,
    userid: userId,
  };
  /////////////////////// onClick handel////////////////////////////////////////////
  let clicked = true;
  function checkOut(allItems) {
    console.log(allItems);
    let orderarr = [];
    let totalprices = 0;
    allItems.allItems.forEach((obj) => {
      console.log(obj._id);
      console.log(obj.itemPrice);
      orderarr.push(obj._id);
      totalprices += obj.itemPrice;
    });
    console.log(allItems);

    setOrder({
      ...order,
      totalPrice: totalprices,
      orderItems: orderarr,
    });
    clicked = false;
    setIsActive({
      isActive: true,
    });
  }

  //////////////////////////// create order on backend DB ////////////////////////////
  function createOrder() {
    console.log(obj);

    axiosInstance
      .post("/orders", obj)

      .then((res) => {
        console.log(res.data.data._id);
        let updateKitchenByOrderId = { kitchenOrders: [res.data.data._id] };
        let updateUserByOrderId = { userOrder: [res.data.data._id] };

        axiosInstance
          .put(`kitchen/${kitchenId}`, updateKitchenByOrderId)

          .then((res) => {
            console.log(res);
          });

        axiosInstance
          .put(`user/${userId}`, updateUserByOrderId)

          .then((res) => {
            console.log(res);
          });
        return res;
      })

      .catch((error) => {
        console.log(error);

        throw Error("invalid process", error);
      });
    console.log(obj);
    clicked = true;
  }
  console.log(order);
  console.log(obj);

  return (
    <>
      {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><IoCartOutline className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/></button> */}

      <IoCartOutline
        className="basket"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      />
      {basketLength ? <span> {basketLength} </span> : ""}
      <div
        className="offcanvas offcanvas-end "
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header sidebarhead ">
          <h5 id="offcanvasRightLabel">YOUR ORDER</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body sidebarbody">
          <h1>ALL ITEMS </h1>
          <div className="row g-0 ">
            {items.map((item, index) => {
              return (
                <div className="col-12" key={index}>
                  <div className="m-2 item">
                    <ItemCardComponent item={item} />
                  </div>
                </div>
              );
            })}
          </div>
          <div id="cashDetails" className={`${isActive ? "dblock" : "dnone"}`}>
            <p>Subtotal : {order.totalPrice} EGP </p>
            <p>Delivery fee : 20 EGP</p>

            <p>Totall-Price : {order.totalPrice + 20} EGP</p>
          </div>
          <button
            id="cash"
            className="cash"
            onClick={(e) => checkOut({ allItems })}
          >
            ADD ORDER
          </button>{" "}
          <br />
          <br />
          <button
            className={`${isActive ? "dblock cash" : "dnone"}`}
            onClick={(e) => createOrder()}
          >
            {" "}
            CHECKOUT
          </button>
          {/* {clicked  ? <button onClick={(e)=>checkOut({allItems})}>ADD ORDER</button> : <button onClick={(e)=>createOrder()}>send CHECKOUT</button> } */}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* //////////////////////////////////////////////////////////////////////////////////// */}
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
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/aboutUs"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contactUs"
                >
                  Contact Us
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
                    {/* IoMdCart */}
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
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
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
                />

                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
