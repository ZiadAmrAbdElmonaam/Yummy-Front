import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";

export default function JoinUS() {
  // start of states
  const [kitchen, setKitchen] = useState({
    kitchenName: "",
    kitchenEmail: "",
    kitchenPassword: "",
    kitchenPhone: "",
    kitchenCategeory: "",
    kitchenAddress: {
      zone: "",
      street: "",
      buildingNumber: "",
    },
  });

  // handel validation error state
  const [kitchenError, setKitchenError] = useState({
    kitchenNameError: "",
    kitchenEmailError: "",
    kitchenPasswordError: "",
    kitchenPhoneError: "",
    kitchenCategeory: "",

    kitchenAddressError: {
      zoneError: "",
      streetError: "",
      buildingNumberError: "",
    },
  });
  // functions
  // handel kitchen change
  const handleKitchenChange = (event) => {
    // if (event.target.name == "kitchenAddress.zone") {
    //   console.log(event.target.name, event.target.value);
    // }
    setKitchen({
      ...kitchen,
      [event.target.name]: event.target.value,
    });

    handelValidationError(event.target.name, event.target.value);
  };

  // validation
  const handelValidationError = (field, value) => {
    switch (field) {
      case "kitchenEmail":
        setKitchenError({
          ...kitchenError,
          kitchenEmailError:
            value.length === 0
              ? "this field is required "
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) === false
              ? "must be valid email"
              : "",
        });
        break;
      case "kitchenName":
        setKitchenError({
          ...kitchenError,
          kitchenNameError:
            value.length === 0
              ? "this field is required "
              : /^\S*$/.test(value) == false
              ? "kitchenName can not contain spaces"
              : "",
        });
        break;
      case "kitchenPassword":
        setKitchenError({
          ...kitchenError,
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
      default:
        setKitchenError({
          ...kitchenError,
        });
    }
  };
  const StoreSignUP = useSelector((state) => state.signUp.userList);

  //  on Submit
  const HandelSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/kitchen/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kitchen),
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
        <h6>Welcome kitchen</h6>
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
              value={kitchen.kitchenEmail}
              name="kitchenEmail"
              onChange={(e) => handleKitchenChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {kitchenError.kitchenEmailError}
            </Form.Text>
          </Form.Group>

          {/* kitchen  name */}
          <Form.Group className="mb-3" controlId="formBasickitchenName">
            <Form.Label>kitchen Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter kitchen Name"
              value={kitchen.kitchenName}
              name="kitchenName"
              onChange={(e) => handleKitchenChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {kitchenError.kitchenNameError}
            </Form.Text>
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={kitchen.kitchenPassword}
              name="kitchenPassword"
              onChange={(e) => handleKitchenChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {kitchenError.kitchenPasswordError}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>kitchen Phone</Form.Label>
            <Form.Control
              placeholder="kitchen Phone"
              type="text"
              value={kitchen.kitchenPhone}
              name="kitchenPhone"
              onChange={(e) => handleKitchenChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {kitchenError.kitchenPhoneError}
            </Form.Text>
          </Form.Group>
          <div className="row">
            <div className="col-lg-4">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> kitchen Zone</Form.Label>
                <Form.Control
                  placeholder="zone"
                  type="text"
                  value={kitchen.kitchenAddress.zone}
                  name="kitchenAddress.zone"
                  onChange={(e) => handleKitchenChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {/* {kitchenError.kitchenAddressError.zoneError} */}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-lg-4">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> kitchen street</Form.Label>
                <Form.Control
                  placeholder="zone"
                  type="text"
                  value={kitchen.kitchenAddress.street}
                  name="kitchenAddress.street"
                  onChange={(e) => handleKitchenChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {kitchenError.kitchenAddressError.streetError}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-lg-4">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> building number </Form.Label>
                <Form.Control
                  placeholder="zone"
                  type="number"
                  value={kitchen.kitchenAddress.buildingNumber}
                  name="kitchenAddress.buildingNumber"
                  onChange={(e) => handleKitchenChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {kitchenError.kitchenAddressError.buildingNumberError}
                </Form.Text>
              </Form.Group>
            </div>
          </div>
          <div className="dropdown mb-5">
            <select
              value={kitchen.kitchenCategeory}
              name="kitchenCategeory"
              className="select-category"
              onChange={(e) => handleKitchenChange(e)}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">non-vegetarian</option>
              <option value="frozen">frozen</option>
              <option value="all">all</option>
            </select>
          </div>
          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
