import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../Network/Config";
import { Params, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

import "./UserStyle.css";
import CurrentOrders from "../../components/UserOrders/CurrentOrders";
export default function UserProfile() {
  const [user, setUser] = useState({});
  let [isload, setIsLoad] = useState(true);
  let [isedit, setIsedit] = useState(false);
  let [isOrder, setIsOrder] = useState(false);
  const params = useParams();
  useEffect(() => {
    axiosInstance
      .get(`/user/${params.id}`)
      .then((res) => {
        setUser(res.data);

        setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, []);
  console.log(user);
  function showEdit() {
    setIsedit(true);
    console.log("clicked");
  }
  function showOrders() {
    setIsOrder(true);
  }
  function HandelSubmit(event) {
    event.preventDefault();
    setIsedit(false);
  }
  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <div className="user-profile">
          <div className="row g-0">
            <div className="col-md-3">
              {/* side bar */}

              <div className="side-bar">
                <div className="side-bar-top p-5">
                  {/* <img
                    src="../../../public/images/john.png"
                    className="img-responsive"
                  /> */}
                  <div className="student-info">
                    <h1>{user.userFullName}</h1>
                    <h3>{user.userEmail}</h3>
                    <h3>{user.userPhone}</h3>
                  </div>
                </div>
                <div className="side-bar-bottom pb-5">
                  <ul className="ul-group profile-list">
                    <li className="element">
                      <button onClick={showEdit}>Edit Profile</button>
                    </li>
                    <li className="element">
                      <button onClick={showOrders}>My Current Orders</button>
                    </li>
                    <li className="element">
                      <button>My Old Orders</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profileData">
                {/* <h1>data here</h1> */}
                {isedit ? (
                  <div>
                    <Form
                      onSubmit={(event) => {
                        HandelSubmit(event);
                      }}
                      className="form"
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          //   value={user.userEmail}
                          name="userEmail"
                          //   onChange={(e) => handelUserChange(e)}
                        />
                        {/* <Form.Text className="d-block text-danger mb-2">
                          {userError.userEmailError}
                        </Form.Text> */}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>User Phone</Form.Label>
                        <Form.Control
                          placeholder="User Phone"
                          type="number"
                          //   value={user.userPhone}
                          name="userPhone"
                          //   onChange={(e) => handelUserChange(e)}
                        />
                        {/* <Form.Text className="d-block text-danger mb-2">
              {userError.userPhoneError}
            </Form.Text> */}
                      </Form.Group>
                      <button type="submit" className="sub-btn">
                        Submit
                      </button>
                    </Form>
                  </div>
                ) : (
                  ""
                )}
                {/* end of edit profile */}
                {isOrder ? <CurrentOrders userData={user} /> : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
