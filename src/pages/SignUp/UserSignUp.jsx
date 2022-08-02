import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";

export default function SignUp() {
  // start of states
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
    userEmailError: "",
    userNameError: "",
    userPasswordError: "",
    // kitchenConfirmPassword: "",
  });
  // functions
  // handel user change
  const handelUserChange = (event) => {
    console.log(event.target.name, event.target.value);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    handelValidationError(event.target.name, event.target.value);
  };

  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
      case "kitchenEmail":
        setUserError({
          ...userError,
          kitchenEmailError:
            value.length === 0
              ? "this field is required "
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) === false
              ? "must be valid email"
              : "",
        });
        break;
      case "kitchenName":
        setUserError({
          ...userError,
          userNameError:
            value.length === 0
              ? "this field is required "
              : /^\S*$/.test(value) == false
              ? "kitchenName can not contain spaces"
              : "",
        });
        break;
      case "kitchenPassword":
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
      case "kitchenConfirmPassword":
        setUserError({
          ...userError,
          userConfirmPasswordError:
            value.length === 0
              ? "this field is required"
              : value !== user.kitchenPassword
              ? "Password Not Matched"
              : "",
        });
        break;
      default:
        setUserError({
          ...userError,
        });
    }
  };

  const StoreSignUP = useSelector((state) => state.signUp.userList);

  //  on Submit
  const HandelSubmit = (event) => {
    event.preventDefault();

    
      fetch("http://localhost:8080/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          window.location = "/login";
        });
  };

  return (
    <>
      <div className="container">
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

          {/* kitchen  name */}
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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>User Phone</Form.Label>
            <Form.Control
              placeholder="User Phone"
              type="text"
              value={user.userPhone}
              name="userPhone"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.userPasswordError}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStreet">
            <Form.Label>street</Form.Label>
            <Form.Control
              placeholder="Street"
              type="text"
              value={user.userAddress.street}
              name="userStreet"
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
              placeholder="confirm Password"
              type="password"
              value={user.kitchenConfirmPassword}
              name="kitchenConfirmPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.kitchenConfirmPasswordError}
            </Form.Text>
          </Form.Group> */}
          {/* <div className="dropdown mb-5">
            <select
              value={user.role}
              name="role"
              onChange={(e) => handelUserChange(e)}
            >
              <option value="user">User</option>
              <option value="kitchen">Kitchen</option>
              <option value="pilot">Pilot</option>
            </select>
          </div> */}
          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}