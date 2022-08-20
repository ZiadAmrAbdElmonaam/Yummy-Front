import React, { useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signStyle.css";
import axiosInstance from "../../Network/Config";
import { useHistory } from "react-router-dom";

export default function PilotSignUP() {
  // start of states
  const ref = useRef();
  const history = useHistory();
  // console.log("ref current", ref.current);
  const [pilot, setPilot] = useState({
    pilotName: "",
    nationalID: "",
    pilotPassword: "",
    pilotNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // handel validation error state
  const [pilotError, setPilotError] = useState({
    pilotNameError: " ",
    nationalIDError: " ",
    pilotPasswordError: " ",
    pilotNumberError: " ",
    formValidationError: " ",
  });
  // functions
  // handel pilot change
  const handlepilotChange = (event, ref) => {
    handelValidationError(event.target.name, event.target.value);
    if (event.target.type == "file") {
      // console.log("my current file", event.target.files[0]);
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
      // console.log("selected now", selectedFile);
    } else {
      // console.log(event.target.name, event.target.value);
      // console.log("event", event.target);
      setPilot({
        ...pilot,
        [event.target.name]: event.target.value,
      });
    }
  };
  // console.log("select", selectedFile);
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
      case "nationalID":
        setPilotError({
          ...pilotError,
          nationalIDError:
            value.length === 0
              ? "this field is required"
              : value.length !== 14
              ? "National Id must be 14 numbers"
              : "",
        });
        break;
      case "pilotNumber":
        setPilotError({
          ...pilotError,
          pilotNumberError:
            value.length === 0
              ? "this field is required"
              : value.length !== 11
              ? "Phone number must be 11 numbers"
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
    // console.log("from sub btn", ref.current.files[0]);
    if (
      pilotError.nationalIDError === "" &&
      pilotError.pilotNameError === "" &&
      pilotError.pilotNumberError === "" &&
      pilotError.pilotPasswordError === ""
    ) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("pilotName", pilot.pilotName);
      formData.append("nationalID", pilot.nationalID);
      formData.append("pilotPassword", pilot.pilotPassword);
      formData.append("pilotNumber", pilot.pilotNumber);
      formData.append("pilotLisenceImage", pilot.pilotLisenceImage);

      axiosInstance
        .post("/pilot/signUp", formData)

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
      setPilotError({
        ...pilotError,
        formValidationError: "complete ur data",
      });
    }
  };

  return (
    <div className="container">
      <div className="pilot-signUp">
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
          <Form.Group className="mb-3" controlId="formBasicNationalId">
            <Form.Label> national ID </Form.Label>
            <Form.Control
              placeholder="pilot national ID"
              type="number"
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
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label> Phone Number</Form.Label>
            <Form.Control
              placeholder="pilot phone Number"
              type="number"
              value={pilot.pilotNumber}
              name="pilotNumber"
              onChange={(e) => handlepilotChange(e)}
            />
            <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotNumberError}
            </Form.Text>
          </Form.Group>
          {/* upload licence img */}

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label> upload your Lisence Image</Form.Label>
            <Form.Control
              placeholder="upload your Lisence Image"
              type="file"
              name="pilotLisenceImage"
              onChange={(e) => handlepilotChange(e)}
            />
            {/* <Form.Text className="d-block text-danger mb-2">
              {pilotError.pilotNumberError}
            </Form.Text> */}

            <Form.Text className="d-block text-danger m-auto d-flex justify-content-center  ">
              {pilotError.formValidationError}
            </Form.Text>
            {/* test */}
          </Form.Group>
          {isFilePicked ? (
            <div>
              <p className="text-primary">Done</p>
            </div>
          ) : (
            <p className="text-danger">upload image please</p>
          )}
          <button type="submit" className="sub-btn">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
