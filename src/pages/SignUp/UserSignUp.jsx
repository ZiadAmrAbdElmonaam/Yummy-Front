import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../Network/Config";

export default function SignUp() {
  // start of states
  const history = useHistory();
  const [user, setUser] = useState({
    userFullName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    role: "user",
    userAddress: {
      street: "",
      zone: "",
      city: "",
      building: "",
    },
  });
  // handel validation error state
  const [userError, setUserError] = useState({
    userEmailError: " ",
    userNameError: " ",
    userPasswordError: " ",
    // kitchenConfirmPassword: "",
    userPhoneError: " ",
    userAddressError: {
      street: " ",
      zone: " ",
      city: " ",
      building: " ",
    },
    formValidationError: " ",
  });
  // functions
  // handel user change
  const handelUserChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    if (
      name == "street" ||
      name == "zone" ||
      name == "city" ||
      name == "building"
    ) {
      setUser({
        ...user,
        userAddress: {
          ...user.userAddress,
          [name]: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
    handelValidationError(name, value);
  };

  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
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
      case "userPassword":
        setUserError({
          ...userError,
          userPasswordError:
            value.length === 0
              ? "this field is required"
              : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  value
                ) === false
              ? "password must be greater than 8 and contains at least one lowercase and one uppercase  at least one digit and special character"
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
      case "userAddress.street":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      case "userAddress.zone":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      case "userAddress.city":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      case "userAddress.building":
        setUserError({
          ...userError,
          userAddressError: value.length === 0 ? "this field is required" : "",
        });
        break;
      // case "kitchenConfirmPassword":
      //   setUserError({
      //     ...userError,
      //     userConfirmPasswordError:
      //       value.length === 0
      //         ? "this field is required"
      //         : value !== user.kitchenPassword
      //         ? "Password Not Matched"
      //         : "",
      //   });
      //   break;
      default:
        setUserError({
          ...userError,
        });
    }
  };

  const StoreSignUP = useSelector((state) => state.signUp.userList);

  const HandelSubmit = (event) => {
    event.preventDefault();
    // console.log("from sub btn", ref.current.files[0]);
    if (
      userError.userEmailError === "" &&
      userError.userNameError === "" &&
      userError.userPasswordError === "" &&
      userError.userPhoneError === ""
      // userError.userAddressError.street === ""&&
      // userError.userAddressError.city === ""&&
      // userError.userAddressError.building === ""&&
      // userError.userAddressError.zone === ""
    ) {
      // console.log("error Validation");

      axiosInstance
        .post("/user", user)

        .then((res) => {
          return res;
        })

        .then((data) => {
          // console.log(data);
          // window.location = "/login";
          history.push("/login");
        });
    } else {
      // console.log("error validation");
      setUserError({
        ...userError,
        formValidationError: "complete ur data",
      });
    }
  };

  return (
    <div className="container">
      <div className="user-signUp">
        <h6>Welcome user</h6>
        <Form
          onSubmit={(event) => {
            HandelSubmit(event);
          }}
          className="form"
        >
          {/* email */}
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

          {/* user  name */}
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

          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={user.userPassword}
              name="userPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.userPasswordError}
            </Form.Text>
          </Form.Group>
          {/* confirm password */}
          {/* <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              place holder="confirm Password"
              type="password"
              value={user.kitchenConfirmPassword}
              name="kitchenConfirmPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.kitchenConfirmPasswordError}
            </Form.Text>
          </Form.Group> */}
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

          {/* address */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasiccity">
                <Form.Label>city</Form.Label>
                <Form.Control
                  placeholder="city"
                  type="text"
                  value={user.userAddress.city}
                  name="city"
                  onChange={(e) => handelUserChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {userError.userAddressError.city}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasiczone">
                <Form.Label>zone</Form.Label>
                <Form.Control
                  placeholder="zone"
                  type="text"
                  value={user.userAddress.zone}
                  name="zone"
                  onChange={(e) => handelUserChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {userError.userAddressError.zone}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicStreet">
                <Form.Label>street</Form.Label>
                <Form.Control
                  placeholder="Street"
                  type="text"
                  value={user.userAddress.street}
                  name="street"
                  onChange={(e) => handelUserChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {userError.userAddressError.street}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicbuilding">
                <Form.Label>building</Form.Label>
                <Form.Control
                  placeholder="building"
                  type="text"
                  value={user.userAddress.building}
                  name="building"
                  onChange={(e) => handelUserChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {userError.userAddressError.building}
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
