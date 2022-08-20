import { Link, useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./Pilot.css";
import PilotOnlineOrder from "../OnlineOrders/PilotOnlineOrder";
import { useSelector } from "react-redux";
// import PilotOrders from "./PilotOrders";

export default function Pilot() {
  let toke = useSelector((state) => state.login.token);
  // console.log("now token is =>>" , toke)
  const history = useHistory();
  const [pilot, setPilot] = useState({});
  // const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [pilotEdit, setPilotEdit] = useState({});
  // console.log("pilotEdit",pilotEdit)
  let params = useParams();
  // console.log("params", params);
  useEffect(() => {
    // if(toke)
    // {
    axiosInstance
      .get(`/pilotOrders/${params.id}`)
      .then((res) => {
        setPilot(res.data);
        setIsLoad(false);
        // console.log("res.data>>>>",res.data.pilotName)
        // console.log("res.data>>>>",res.data)
        //   setItem(res.data.menuId.menuItems);
        setPilotEdit({
          pilotName: res.data.pilotName,
          pilotNumber: res.data.pilotNumber,
          pilotStatus: res.data.pilotStatus,
          pilotLisenceImage: res.data.pilotLisenceImage,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoad(false);
      });
    // }
  }, [showUpdate]);
  // toke
  // console.log("piiiiiiiiiiilot",pilot)
  function onlineOrders() {
    // console.log("params", params);
    // console.log("hhhhhhh")
    history.push(`/onlineOrders/${params.id}`);
  }
  function myOnlineOrders() {
    history.push(`/pilotOnlineOrders/${params.id}`);
  }
  function myHistory() {
    history.push(`/pilotHistory/${params.id}`);
  }
  // console.log("nnn", item);

  const handlePilotChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setPilotEdit({
      ...pilotEdit,
      [name]: value,
    });
    // }
  };

  const HandelSubmit = (event) => {
    // console.log(params.kitchenId);
    event.preventDefault();
    axiosInstance
      .put(`/pilot/${params.id}`, pilotEdit)
      .then((res) => {
        if (showUpdate) {
          setShowUpdate(false);
        } else {
          setShowUpdate(true);
        }
        // console.log(res)
        return res;
      })
      .then((data) => {
        // console.log(data);
        // console.log(pilotEdit)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(pilotEdit)
  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <>
          <div className="cover">
            <div className="container py-5"></div>

            <div className="cover-info text-center">
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3
                        class="modal-title text-warning "
                        id="staticBackdropLabel"
                      >
                        Edit Profile
                      </h3>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form
                        onSubmit={(event) => {
                          HandelSubmit(event);
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            {" "}
                            pilotName{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control  "
                            //  id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={pilotEdit.pilotName}
                            name="pilotName"
                            onChange={(e) => handlePilotChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            pilotStatus
                          </label>
                          <br />
                          <select
                            value={pilotEdit.pilotStatus}
                            name="pilotStatus"
                            onChange={(e) => handlePilotChange(e)}
                          >
                            <option value="avilable">available</option>
                            <option value="not avilable">not available</option>
                          </select>{" "}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            {" "}
                            pilotNumber{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control  "
                            //  id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={pilotEdit.pilotNumber}
                            name="pilotNumber"
                            onChange={(e) => handlePilotChange(e)}
                          />
                        </div>
                        <input
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                        ></input>
                        <br />
                        <br /> <br />
                        <br />
                        <button
                          type="submit"
                          onClick={(e) => {
                            HandelSubmit(e);
                          }}
                          className="btn btn-success"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kitchen">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="kitchen-cover p-3">
                      <img
                        src={pilot.pilotLisenceImage}
                        alt={pilot.pilotLisenceImage}
                        className="respnsiveImg"
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="kitchen-info p-3 pt-5">
                      <h1 className="contain-kitchen-name ">
                        {pilot.pilotName}
                        <span
                          className={
                            pilot.pilotStatus === "not available"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {pilot.pilotStatus}
                        </span>
                      </h1>
                      {/* category */}
                      <p className="text-secondary">0{pilot.pilotNumber}</p>

                      <button
                        type="button"
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>

                {/* //end of row */}
              </div>
              <p>
                <h5 className="hi-pilot">
                  <span className="yummy"> YUMMY</span> Development team
                  welcomes you , you can work with us to improve our services ,
                  enjoy your work here , now you can navigate between your
                  online,history orders,you can also edit your profile 🧡
                </h5>
              </p>
              {/* <Link className="btn btn-primary" to="/onlineOrders">
                Online Orders{" "}
              </Link> */}
              {/* <button */}
              {/* <button
                className="btn btn-dark"
                onClick={() => {
                  onlineOrders();
                }}
              >
                Online Orders{" "}  
              </button> */}
              <button
                className="btn btn-success"
                onClick={() => {
                  myOnlineOrders();
                }}
              >
                My Current Orders{" "}
              </button>{" "}
              {"    "}
              <button
                className="btn btn-dark"
                onClick={() => {
                  myHistory();
                }}
              >
                My History{" "}
              </button>
              <br />
              <br />
              {/* <Link className="btn btn-primary" to="/pilotOnlineOrders/:id">My Online Orders</Link> */}
              <PilotOnlineOrder />
            </div>
          </div>

          {/* <PilotOrders pilot={pilot} /> */}
        </>
      )}
    </>
  );
}
