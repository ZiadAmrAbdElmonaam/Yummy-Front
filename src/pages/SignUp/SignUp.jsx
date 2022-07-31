import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignUPThunk } from "../../Store/Actions/SignUP";

export default function SignUp() {
  // start of states
  const [user, setUser] = useState({
    kitchenEmail: "",
    kitchenName: "",
    kitchenPassword: "",
    // kitchenConfirmPassword: "",
  });
  // handel validation error state
  const [userError, setUserError] = useState({
    kitchenEmailError: "",
    kitchenNameError: "",
    kitchenPasswordError: "",
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
          kitchenNameError:
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
          kitchenPasswordError:
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
          kitchenConfirmPasswordError:
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
  let flag = false;
  const dispatch = useDispatch();
  const StoreSignUP = useSelector((state) => state.signUp.userList);

  //  on Submit
  const HandelSubmit = (event) => {
    event.preventDefault();
    flag = true;
    // try {
    //   const url = "http://localhost:8080/kitchen";
    //   const { user: res } = await axios.post(url, user);
    //   //  localStorage.setItem("token", res.user);
    //   console.log("user", user);
    // } catch (error) {
    //   if (error.res && error.res.status >= 400 && error.res.status <= 500) {
    //     console.log("errorrrrr");
    //     setUserError("erroR", error.res.user.message);
    //   }
    // }
  };
  useEffect(() => {
    dispatch(SignUPThunk());
  }, [flag]);
  return (
    <>
      <div className="container">
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
              value={user.kitchenEmail}
              name="kitchenEmail"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.kitchenEmailError}
            </Form.Text>
          </Form.Group>

          {/* kitchen  name */}
          <Form.Group className="mb-3" controlId="formBasickitchenName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={user.kitchenName}
              name="kitchenName"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.kitchenNameError}
            </Form.Text>
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={user.userPassword}
              name="kitchenPassword"
              onChange={(e) => handelUserChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {userError.kitchenPasswordError}
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
