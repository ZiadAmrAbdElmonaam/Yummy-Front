import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap"
import Form from "react-bootstrap/Form";
import "./Login.css";

import { LoginThunk } from "../../Store/Actions/Login";
import axiosInstance from "../../Network/Config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Store from "../../Store/Store";
import { IsLoadingThunk } from "../../Store/Actions/IsLoading";
import { UserIdThunk } from "../../Store/Actions/UserId";
import { RoleThunk } from "../../Store/Actions/Role";
import { PilotIdThunk } from "../../Store/Actions/PilotId";
import { KetchenIdThunk } from "../../Store/Actions/KetchenId";

function Login() {
  const history = useHistory();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  // const [kitchenId, setKitchenId]= useState(0);

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  let currentToken = useSelector((state) => state.login.token);

  useEffect(() => {
    if (userLoggedIn && currentToken) {
      if (user.role === "pilot") {
        // console.log(
        //   "before pilot ==================>",
        //   localStorage.getItem("token")
        // );

        history.push(`/pilot/${user.email}`);
        // window.location = `/pilot/${user.email}`;
        // console.log(userId);
        dispatch(PilotIdThunk(userId));
      } else if (user.role === "user") {
        dispatch(UserIdThunk(userId));
        history.push("/home");
      } else if (user.role === "kitchen") {
        history.push(`/kitchen/${userId}`);
        dispatch(KetchenIdThunk(userId));
      }
    }
  }, [userLoggedIn, currentToken]);

  // handel validation error state
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    loginError: "",
  });

  // handel user change
  const handelUserChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    handelValidationError(event.target.name, event.target.value);
  };
  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
      case "email":
        setUserError({
          ...userError,
          emailError:
            value.length === 0
              ? "this field is required "
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) === false
              ? "must be valid email"
              : "",
        });
        break;
      case "password":
        setUserError({
          ...userError,
          passwordError:
            value.length === 0
              ? "this field is required"
              : value.length < 8
              ? "password length must be greater than 8"
              : "",
        });
        break;
      default:
        setUserError({
          ...userError,
        });
    }
  };

  const dispatch = useDispatch();

  ///////////////////  on Submit ////////////////////////

  const handelSubmit = (event) => {
    event.preventDefault();

    /////////////////////////////////////////////////////////////
    dispatch(IsLoadingThunk(null));
    axiosInstance
      .post("/login", user)

      .then((res) => {
        // console.log(res.data.token)
        localStorage.setItem("token", res.data.token);
        // console.log(res);
        return res;
      })

      .then((data) => {
        // console.log(data.data.data);

        if (data.data.token === undefined) {
          throw new Error();
        } else {
          setUserError({
            ...userError,
            loginError: "",
          });

          dispatch(LoginThunk(user));
          setUserId(data.data.data._id);
          setUserLoggedIn(true);
          dispatch(RoleThunk(user.role));
        }
      })

      .catch((error) => {
        console.log(error);
        if (error) {
          setUserError({
            ...userError,
            loginError: "Incorrect Email or Password",
          });
        }
        throw Error("incorrect Email or Password", error);
      });
  };
  // change type

  return (
    <div className="container">
      <div className="logIn">
        <Form
          onSubmit={(event) => {
            handelSubmit(event);
          }}
          className="form"
        >
          {/* choose yor role */}
          <div className="dropdown mb-5">
            <label className="mb-2">choose Role</label>
            <br />
            <select
              name="role"
              className="select-category"
              value={user.role}
              onChange={(e) => handelUserChange(e)}
            >
              <option value="select role">select role</option>
              <option value="user">user</option>
              <option value="kitchen">Kitchen</option>
              <option value="pilot">Pilot</option>
            </select>
          </div>
          {user.role !== "pilot" ? (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={user.email}
                name="email"
                onChange={(e) => handelUserChange(e)}
                className="inputField"
              />
              <Form.Text className="d-block text-danger mb-2">
                {userError.emailError}
              </Form.Text>
            </Form.Group>
          ) : (
            ""
          )}
          {/* national id  */}
          {user.role == "pilot" ? (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> national ID </Form.Label>
              <Form.Control
                placeholder="pilot national ID"
                type="text"
                value={user.email}
                name="email"
                onChange={(e) => handelUserChange(e)}
              />
              <Form.Text className="d-block text-danger mb-2">
                {/* {pilotError.nationalIDError} */}
              </Form.Text>
            </Form.Group>
          ) : (
            ""
          )}
          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-block">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={(e) => handelUserChange(e)}
              className="d-inline inputField"
            />
          </Form.Group>
          <Form.Text className="d-block text-danger mb-2">
            {userError.passwordError}
          </Form.Text>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          <Form.Text className="d-block text-danger mb-2">
            {userError.loginError}
          </Form.Text>
        </Form>
      </div>
    </div>
  );
}
export default Login;
