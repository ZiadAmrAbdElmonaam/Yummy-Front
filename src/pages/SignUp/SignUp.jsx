import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function SignUp() {
  // start of states
  const [user, setUser] = useState({
    userFullName: "",
    userEmail: "",
    userName: "",
    userSignPassword: "",
    userConfirmPassword: "",
  });
  // handel validation error state
  const [userError, setUserError] = useState({
    userFullNameError: "",
    userEmailError: "",
    userNameError: "",
    userSignPasswordError: "",
    userConfirmPasswordError: "",
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
      case "userFullName":
        setUserError({
          ...userError,
          userFullNameError:
            value.length === 0 ? "this field is required " : "",
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
      case "userName":
        setUserError({
          ...userError,
          userNameError:
            value.length === 0
              ? "this field is required "
              : /^\S*$/.test(value) == false
              ? "username can not contain spaces"
              : "",
        });
        break;
      case "userSignPassword":
        setUserError({
          ...userError,
          userSignPasswordError:
            value.length === 0
              ? "this field is required"
              : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  value
                ) === false
              ? "password must be greater than 8 and contains at least one lowercase and one uppercase  at least one digit and special character"
              : "",
        });
        break;
      case "userConfirmPassword":
        setUserError({
          ...userError,
          userConfirmPasswordError:
            value.length === 0
              ? "this field is required"
              : value !== user.userSignPassword
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

  //  on Submit
  const handelSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="container">
        <Form
          onSubmit={(event) => {
            handelSubmit(event);
          }}
          className="form"
        >
          {/* full name */}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={user.userFullName}
              name="userFullName"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.userFullNameError}
            </Form.Text>
          </Form.Group>

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

          {/* user name */}
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={user.userName}
              name="userName"
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
              name="userSignPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.userSignPasswordError}
            </Form.Text>
          </Form.Group>

          {/* confirm password */}
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="confirm Password"
              type="password"
              value={user.userConfirmPassword}
              name="userConfirmPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.userConfirmPasswordError}
            </Form.Text>
          </Form.Group>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle mb-3"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              choose Role
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item">user</li>
              <li className="dropdown-item">kitchen</li>
              <li className="dropdown-item">pilot</li>
            </ul>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
