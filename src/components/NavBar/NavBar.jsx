import React from "react";

import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const [order, setOrder] = useState({
    totalPrice: 0,
    orderItems: [],
  });

  let basketLength = useSelector((state) => state.orders.userCart.length);
  let items = useSelector((state) => state.orders.userCart);

  let userId = useSelector((state) => state.login.userId);
  let kitchenId = useSelector((state) => state.login.ketchenId);
  let pilotId = useSelector((state) => state.login.PilotId);

  let loginrole = useSelector((state) => state.role.role);
  // console.log("loginrole is ==================>", kitchenId);

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
    // console.log(allItems);
    let orderarr = [];
    let totalprices = 0;
    allItems.allItems.forEach((obj) => {
      // console.log(obj._id);
      // console.log(obj.itemPrice);
      orderarr.push(obj._id);
      totalprices += obj.itemPrice;
    });
    // console.log(allItems);

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
    // console.log(obj);

    axiosInstance
      .post("/orders", obj)

      .then((res) => {
        // console.log(res.data.data._id);
        let updateKitchenByOrderId = { kitchenOrders: [res.data.data._id] };
        let updateUserByOrderId = { userOrder: [res.data.data._id] };

        axiosInstance
          .put(`kitchen/${kitchenId}`, updateKitchenByOrderId)

          .then((res) => {
            // console.log(res);
          });

        axiosInstance
          .put(`user/${userId}`, updateUserByOrderId)

          .then((res) => {
            // console.log(res);
            history.push(`/user/${userId}`);
          });
        return res;
      })

      .catch((error) => {
        console.log(error);

        throw Error("invalid process", error);
      });
    // console.log(obj);
    clicked = true;
  }
  // console.log(order);
  // console.log(obj);

  return (
    <>
      {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><IoCartOutline className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/></button> */}

      <div
        className="offcanvas offcanvas-end"
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
        <div className="offcanvas-body sidebarbody ">
          <h1>ALL ITEMS </h1>
          <div className=" row g-0 ">
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

          {loginrole == "user" ? (
            <button
              className={`${basketLength ? "dblock cash" : "dnone"}`}
              id="cash"
              onClick={(e) => checkOut({ allItems })}
            >
              Add Order
            </button>
          ) : (
            <Link className="dblock cash btn sub-btn addBtn" to="/login">
              {" "}
              Add Order{" "}
            </Link>
          )}
          <br />
          <br />
          <button
            className={`${isActive ? "dblock cash" : "dnone"}`}
            onClick={(e) => createOrder()}
          >
            {" "}
            CheckOut
          </button>
          {/* {clicked  ? <button onClick={(e)=>checkOut({allItems})}>ADD ORDER</button> : <button onClick={(e)=>createOrder()}>send CHECKOUT</button> } */}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg  yummy-nav fixed-top">
        {/* //////////////////////////////////////////////////////////////////////////////////// */}
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
        <div
          className="collapse navbar-collapse mynav"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item navli nav-list">
              <Link className="nav-link active" aria-current="page" to="/home">
                YUMMY
              </Link>
            </li>
            <li
              className={`${
                loginrole == "pilot" || loginrole == "kitchen"
                  ? " dnone"
                  : "nav-item dblock navli nav-list"
              }`}
            >
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>

            {/* userId  kitchenId  pilotId */}

            <li className="nav-item navli nav-list">
              {loginrole == "pilot" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/pilot/${pilotId}`}
                >
                  {" "}
                  Profile{" "}
                </Link>
              ) : loginrole == "kitchen" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/kitchen/${kitchenId}`}
                >
                  {" "}
                  Profile{" "}
                </Link>
              ) : loginrole == "user" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/user/${userId}`}
                >
                  {" "}
                  Profile{" "}
                </Link>
              ) : (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  {" "}
                  Profile{" "}
                </Link>
              )}
            </li>

            <li className="nav-item navli nav-list">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/aboutUs"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item navli nav-list">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contactUs"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <IoCartOutline
            className="basket"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          />
          {basketLength ? (
            <span className="cartNumber"> {basketLength} </span>
          ) : (
            ""
          )}
          <div className="d-flex ">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  sign-dropdown">
              <li className="nav-item dropdown navli">
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
                <ul className="dropdown-menu" aria-labelledby="navbar Dropdown">
                  <li className="navli">
                    <Link
                      className="dropdown-item sign-element"
                      to="/userSignUp"
                    >
                      User
                    </Link>
                  </li>
                  <li className="navli">
                    <Link
                      className="dropdown-item sign-element"
                      to="/kitchenSignUP"
                    >
                      Kitchen
                    </Link>
                  </li>
                  <li className="navli ">
                    <Link
                      className="dropdown-item sign-element"
                      to="/PilotSignUp"
                    >
                      Pilot
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="navli nav-list">
                {loginrole === "" ? (
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/login"
                  >
                    {" "}
                    Login{" "}
                  </Link>
                ) : (
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/login"
                  >
                    {" "}
                    Logout{" "}
                  </a>
                )}
              </li>
            </ul>

            {/* <form className="d-flex ">
              
              </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}
