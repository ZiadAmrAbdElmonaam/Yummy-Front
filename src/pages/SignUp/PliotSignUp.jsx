import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";

export default function PilotSignUP() {
  // start of states
  const [pilot, setPilot] = useState({
    pilotName: "",
    nationalID: "",
    pilotPassword: "",
    pilotNumber: "",
  });

  // handel validation error state
  const [pilotError, setPilotError] = useState({
    pilotNameError: "",
    nationalIDError: "",
    pilotPasswordError: "",
    pilotNumberError: "",
  });
  // functions
  // handel pilot change
  const handlepilotChange = (event) => {
    console.log(event.target.name, event.target.value);
    setPilot({
      ...pilot,
      [event.target.name]: event.target.value,
    });

    handelValidationError(event.target.name, event.target.value);
  };

  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
      case "pilotName":
        setPilotError({
          ...pilotError,
          pilotNameError:
            value.length === 0
              ? "this field is required "
              : /^\S*$/.test(value) == false
              ? "pilotName can not contain spaces"
              : "",
        });
        break;
      case "pilotPassword":
        setPilotError({
          ...pilotError,
          pilotPasswordError:
            value.length === 0
              ? "this field is required"
              : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  value
                ) === false
              ? "password must be greater than 8 and contains at least one lowercase and one uppercase  at least one digit and special character"
              : "",
        });
        break;
      default:
        setPilotError({
          ...pilotError,
        });
    }
  };
  const StoreSignUP = useSelector((state) => state.signUp.userList);

  //  on Submit
  const HandelSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/pilot/signUp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pilot),
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
        <h6>Welcome pilot</h6>
        <Form
          onSubmit={(event) => {
            HandelSubmit(event);
          }}
          className="form"
        >
          {/* pilot  name */}
          <Form.Group className="mb-3" controlId="formBasicpilotName">
            <Form.Label>pilot Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pilot Name"
              value={pilot.pilotName}
              name="pilotName"
              onChange={(e) => handlepilotChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotNameError}
            </Form.Text>
          </Form.Group>

          {/* national ID */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> national ID </Form.Label>
            <Form.Control
              placeholder="pilot national ID"
              type="text"
              value={pilot.nationalID}
              name="nationalID"
              onChange={(e) => handlepilotChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {pilotError.nationalIDError}
            </Form.Text>
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={pilot.pilotPassword}
              name="pilotPassword"
              onChange={(e) => handlepilotChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotPasswordError}
            </Form.Text>
          </Form.Group>
          {/* phone  */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Phone Number</Form.Label>
            <Form.Control
              placeholder="pilot phone Number"
              type="text"
              value={pilot.pilotNumber}
              name="pilotNumber"
              onChange={(e) => handlepilotChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotNumberError}
            </Form.Text>
          </Form.Group>
          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
