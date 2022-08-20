import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";
import axiosInstance from "../../Network/Config";
import { useHistory } from "react-router-dom";

export default function JoinUS() {
  // start of states
  const history = useHistory();
  const [kitchen, setKitchen] = useState({
    kitchenName: "",
    kitchenEmail: "",
    kitchenPassword: "",
    kitchenPhone: 0,
    kitchenCategeory: "",
    kitchenAddress: {
      zone: "",
      street: "",
      buildingNumber: 0,
    },
  });
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // handel validation error state
  const [kitchenError, setKitchenError] = useState({
    kitchenNameError: "",
    kitchenEmailError: "",
    kitchenPasswordError: "",
    kitchenPhoneError: "",
    kitchenCategeoryError: "",

    kitchenAddressError: {
      zoneError: "",
      streetError: "",
      buildingNumberError: "",
    },
  });
  // functions
  // handel kitchen change
  const handleKitchenChange = (event) => {
    const { name, value } = event.target;
    if (name === "zone" || name === "street" || name === "buildingNumber") {
      setKitchen({
        ...kitchen,
        kitchenAddress: {
          ...kitchen.kitchenAddress,
          [name]: value,
        },
      });
    } else if (event.target.type == "file") {
      // console.log("my current file", event.target.files[0]);
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
      // console.log("selected now", selectedFile);
    } else {
      setKitchen({
        ...kitchen,
        [name]: value,
      });
    }
    handelValidationError(name, value);
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
      case "kitchenPhone":
        setKitchenError({
          ...kitchenError,
          kitchenPhoneError:
            value.length === 0
              ? "this field is required"
              : value.length !== 11
              ? "phone number must be 11 numbers "
              : "",
        });
        break;
      case "kitchenAddress.zone":
        setKitchenError({
          ...kitchenError,
          kitchenAddressError:
            value.length === 0 ? "this field is required" : "",
        });
        break;
      case "kitchenAddress.street":
        setKitchenError({
          ...kitchenError,
          kitchenAddressError:
            value.length === 0 ? "this field is required" : "",
        });
        break;
      case "kitchenAddress.building":
        setKitchenError({
          ...kitchenError,
          kitchenAddressError:
            value.length === 0 ? "this field is required" : "",
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
    // handelValidationError();
    // for (const key in kitchenError) {
    //   if (
    //     kitchenError[key] === "" &&
    //     kitchenError.kitchenAddressError[key] === ""
    //   ) {
    // console.log(kitchenError[key]);
    // console.log(key);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("kitchenName", kitchen.kitchenName);
    formData.append("kitchenEmail", kitchen.kitchenEmail);
    formData.append("kitchenPassword", kitchen.kitchenPassword);
    formData.append("kitchenPhone", kitchen.kitchenPhone);
    formData.append("kitchenCategeory", kitchen.kitchenCategeory);
    formData.append("kitchenAddress[zone]", kitchen.kitchenAddress.zone);
    formData.append("kitchenAddress[street]", kitchen.kitchenAddress.street);
    formData.append(
      "kitchenAddress[buildingNumber]",
      kitchen.kitchenAddress.buildingNumber
    );
    axiosInstance
      .post("/kitchen", formData)

      .then((res) => {
        return res;
      })
      .then((data) => {
        // console.log(data);
        // window.location = "/login";
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    // console.log("sdsd");
    //  return
    // }
    // }
  };

  return (
    <div className="container">
      <div className="kitchen-signUp">
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
              type="number"
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
                  name="zone"
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
                  placeholder="street"
                  type="text"
                  value={kitchen.street}
                  name="street"
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
                  placeholder="buliding number"
                  type="number"
                  value={kitchen.buildingNumber}
                  name="buildingNumber"
                  onChange={(e) => handleKitchenChange(e)}
                />
                <Form.Text className="d-block text-danger mb-2">
                  {kitchenError.kitchenAddressError.buildingNumberError}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-lg-8">
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label> upload your Lisence Image</Form.Label>
                <Form.Control
                  placeholder="upload your Lisence Image"
                  type="file"
                  name="kitchenimage"
                  onChange={(e) => handleKitchenChange(e)}
                />
                {/* <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotNumberError}
            </Form.Text> */}
                {/* test */}
              </Form.Group>
              {isFilePicked ? (
                <div>
                  <p className="text-primary">Done</p>
                </div>
              ) : (
                <p className="text-danger">upload image please</p>
              )}
            </div>
            <div className="col-lg-4">
              <div className="dropdown mb-5">
                <Form.Label> Choose your Category</Form.Label>
                <select
                  value={kitchen.kitchenCategeory}
                  name="kitchenCategeory"
                  className="select-category"
                  onChange={(e) => handleKitchenChange(e)}
                >
                  <option>Select Category</option>
                  <option value="all">all</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">non-vegetarian</option>
                  <option value="frozen">frozen</option>
                </select>
              </div>
            </div>
          </div>
          {/* end of row */}
          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
