import React, { useEffect, useState } from "react";
import axiosInstance from "../../Network/Config";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

import "./OrdersStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { FlagThunk } from "../../Store/Actions/Flag";

export default function UpdateUser(props) {
  // console.log("new propse", props.userObj._id);
  const history = useHistory();
  const [user, setUser] = useState({
    userFullName: props.userObj.userFullName,
    userEmail: props.userObj.userEmail,
    userPhone: props.userObj.userPhone,
    ...props.userObj.userAddress,
    street: props.userObj.userAddress.street,
    zone: props.userObj.userAddress.zone,
    building: props.userObj.userAddress.building,
  });
  // handel validation error state
  const [userError, setUserError] = useState({
    userNameError: " ",
    userEmailError: " ",
    userPhoneError: " ",
    street: " ",
    zone: " ",
    building: " ",
  });

  const handelUserChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });

    handelValidationError(name, value);
  };
  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
      case "userFullName":
        setUserError({
          ...userError,
          userNameError:
            value.length === 0
              ? "this field is required "
              : /^\S*$/.test(value) === false
              ? "username can not contain spaces"
              : "",
        });
        break;
      case "userEmail":
        setUserError({
          ...userError,
          userEmailError:
            value.length === 0
              ? "this field is required "
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) === false
              ? "must be valid email"
              : "",
        });
        break;
      case "userPhone":
        setUserError({
          ...userError,
          userPhoneError:
            value.length === 0
              ? "this field is required"
              : value.length !== 11
              ? "phone number must be 11 digits"
              : "",
        });
        break;
      case "street":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      case "zone":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      case "building":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
    }
  };

  let dispatch = useDispatch();
  let flag = useSelector((state) => state.flag.flag);
  function HandelSubmit(event) {
    event.preventDefault();
    // console.log("user now", user);
    // if (
    //   userError.userEmailError === "" &&
    //   userError.userNameError === "" &&
    //   userError.userPhoneError === ""
    // userError.street === "" &&
    // userError.city === "" &&
    // userError.building === "" &&
    // userError.zone === ""
    // ) {
    axiosInstance
      .put(`/user/${props.userObj._id}`, user)
      .then((res) => {
        if (flag) {
          dispatch(FlagThunk(false));
        } else {
          dispatch(FlagThunk(true));
        }
        return res;
      })
      .then((data) => {
        // console.log("updated data is", data);
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    //   console.log("error validation");
    // }
  }
  return (
    <div className="updateUser">
      <h2 className="top-header mb-5">Update Your Profile</h2>
      <Form
        onSubmit={(event) => {
          HandelSubmit(event);
        }}
        className="Updateform"
      >
        <div className="row">
          {/* name */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasickitchenName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={user.userFullName}
                name="userFullName"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.userNameError}
              </Form.Text>
            </Form.Group>
          </div>
          {/* Email */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={user.userEmail}
                name="userEmail"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.userEmailError}
              </Form.Text>
            </Form.Group>
          </div>
          {/* Phone */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>User Phone</Form.Label>
              <Form.Control
                placeholder="User Phone"
                type="number"
                value={user.userPhone}
                name="userPhone"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.userPhoneError}
              </Form.Text>
            </Form.Group>
          </div>
          {/* Zone */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasiczone">
              <Form.Label>zone</Form.Label>
              <Form.Control
                placeholder="zone"
                type="text"
                value={user.zone}
                name="zone"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.zone}
              </Form.Text>
            </Form.Group>
          </div>
          {/* street */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicStreet">
              <Form.Label>street</Form.Label>
              <Form.Control
                placeholder="Street"
                type="text"
                value={user.street}
                name="street"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.street}
              </Form.Text>
            </Form.Group>
          </div>
          {/* building number */}
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicbuilding">
              <Form.Label>building</Form.Label>
              <Form.Control
                placeholder="building"
                type="text"
                value={user.building}
                name="building"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.building}
              </Form.Text>
            </Form.Group>
          </div>
          {/* <div className="col-md-6"> */}
          <button type="submit" className="sub-btn up-btn">
            Submit
          </button>
          {/* </div> */}
        </div>
      </Form>
    </div>
  );
}
