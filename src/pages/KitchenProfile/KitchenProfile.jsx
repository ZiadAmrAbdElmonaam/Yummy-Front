import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../Network/Config";
import { Params, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
// import EditKitchenProfile from "./AddKitchenItem";
import Form from "react-bootstrap/Form";
import EditKitchenItems from "./EditKitchenItems";
import KitchenOnlineOrders from "./KitchenOnlineOrders";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import {
  AiOutlineAppstoreAdd,
  AiFillEdit,
  AiFillCloseSquare,
} from "react-icons/ai";
import "./kitchenProfile.css";
import KitchenCurrentOrders from "./KitchenCurrentOrder/KitchenCurrentOrder";
import HistoryOrder from "./HistoryOrder";
import { useDispatch, useSelector } from "react-redux";

export default function KitchenProfile() {
  //   console.log("props", props);
  let deleteFlag = useSelector((state) => state.deleteFlag.deleteflag);

  const [kitchen, setKitchen] = useState({});
  const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);
  const [edit, setEdit] = useState(false);
  const [onlineFlag, setOnlineFlag] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [home, setHome] = useState(true);
  let [showHistory, setShowHistory] = useState(false);

  let params = useParams();
  //   console.log(params);
  const [kitchenEdit, setKitchenEdit] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/kitchen/${params.kitchenId}`)
      .then((res) => {
        // console.log("hiiiiiiiii", res.data.kitchenName);
        setKitchen(res.data);
        setItem(res.data.menuId.menuItems);
        setIsLoad(false);
        setKitchenEdit({
          ...kitchenEdit,
          kitchenName: res.data.kitchenName,
          kitchenEmail: res.data.kitchenEmail,
          kitchenPhone: res.data.kitchenPhone,
          kitchenCategeory: res.data.kitchenCategeory,
          kitchenStatus: res.data.kitchenStatus,
          ...res.data.kitchenAddress,
          zone: res.data.kitchenAddress.zone,
          street: res.data.kitchenAddress.street,
          buildingNumber: res.data.kitchenAddress.buildingNumber,
        });
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [edit, deleteFlag]);
  // console.log("5555", kitchenEdit);
  const kitchenArray = { ...kitchen };
  const handleKitchenChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type == "file") {
      // console.log("my current file", event.target.files[0]);
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    } else {
      setKitchenEdit({
        ...kitchenEdit,
        [name]: value,
      });
    }
  };

  //  on Submit
  const HandelSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("kitchenName", kitchenEdit.kitchenName);
    formData.append("kitchenEmail", kitchenEdit.kitchenEmail);
    formData.append("kitchenPhone", kitchenEdit.kitchenPhone);
    formData.append("kitchenCategeory", kitchenEdit.kitchenCategeory);
    formData.append("kitchenStatus", kitchenEdit.kitchenStatus);
    formData.append("zone", kitchenEdit.zone);
    formData.append("street", kitchenEdit.street);
    formData.append("buildingNumber", kitchenEdit.buildingNumber);
    axiosInstance
      .put(`/kitchen/${params.kitchenId}`, formData)
      .then((res) => {
        return res;
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onlineOrders() {
    setHome(false);
    setCurrentOrder(false);
    setShowHistory(false);
    setOnlineFlag(true);
  }
  function currentOrders() {
    setHome(false);
    setOnlineFlag(false);
    setShowHistory(false);
    setCurrentOrder(true);
  }
  function showHistoryOrder() {
    setHome(false);
    setOnlineFlag(false);
    setCurrentOrder(false);
    setShowHistory(true);
  }
  function goHome() {
    setOnlineFlag(false);
    setCurrentOrder(false);
    setShowHistory(false);
    setHome(true);
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }
  return (
    <div>
      {isload ? (
        <Loader />
      ) : (
        <div className="App my-5">
          <div className="row g-0">
            <div className="col-md-2">
              {/* side bar */}
              <button
                className="btn sub-btn up-btn toggle-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight2"
                aria-controls="offcanvasRight"
              >
                <AiOutlineMenuUnfold />
              </button>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasRight2"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-body canv-body">
                  <div className="side-bar">
                    <div className="side-bar-top p-5">
                      <button
                        type="button"
                        className="btn sub-btn up-btn exit"
                        data-bs-dismiss="offcanvas"
                      >
                        <AiOutlineMenuFold />
                      </button>
                      <img
                        src={kitchen.kitchenImage}
                        alt={kitchen.kitchenName}
                        className="img-responsive"
                      />
                      <div className="student-info">
                        <h1>
                          {kitchen.kitchenName} {""}
                          {kitchen.kitchenStatus}
                        </h1>
                        <h3>{kitchen.kitchenEmail}</h3>
                        <h3>{kitchen.kitchenPhone}</h3>
                      </div>
                    </div>
                    <div className="side-bar-bottom pb-5">
                      <ul className="ul-group profile-list">
                        <li className="element">
                          <button
                            onClick={() => {
                              goHome();
                            }}
                          >
                            Home
                          </button>
                        </li>
                        <li className="element">
                          <button
                            onClick={() => {
                              showHistoryOrder();
                            }}
                          >
                            {" "}
                            History Order
                          </button>
                        </li>
                        <li className="element">
                          <button
                            onClick={() => {
                              currentOrders();
                            }}
                          >
                            Current Orders
                          </button>
                        </li>
                        <li className="element">
                          <button
                            onClick={() => {
                              onlineOrders();
                            }}
                          >
                            online orders
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* old btn */}
            </div>
            {/* end of side bar */}
            <div className="col-md-10">
              {showHistory ? <HistoryOrder /> : ""}

              {currentOrder ? <KitchenCurrentOrders /> : ""}

              {onlineFlag ? <KitchenOnlineOrders /> : ""}

              {home ? (
                <>
                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3
                            className="modal-title text-warning "
                            id="staticBackdropLabel"
                          >
                            Edit Profile
                          </h3>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form
                            onSubmit={(event) => {
                              HandelSubmit(event);
                            }}
                            className="editProfile"
                          >
                            <div className="form-group my-2">
                              <label htmlFor="exampleInputEmail1">
                                {" "}
                                Kitchen Name
                              </label>
                              <input
                                type="text"
                                className="form-control  "
                                //  id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={kitchenEdit.kitchenName}
                                name="kitchenName"
                                onChange={(e) => handleKitchenChange(e)}
                              />
                            </div>
                            <div className="form-group my-2">
                              <label htmlFor="exampleInputEmail1"> Email</label>
                              <input
                                type="text"
                                className="form-control  "
                                value={kitchenEdit.kitchenEmail}
                                name="kitchenEmail"
                                onChange={(e) => handleKitchenChange(e)}
                              />
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group my-2">
                                  <label htmlFor="exampleInputEmail1">
                                    {" "}
                                    Kitchen phone
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control  "
                                    value={kitchenEdit.kitchenPhone}
                                    name="kitchenPhone"
                                    onChange={(e) => handleKitchenChange(e)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                {/* status */}
                                <div className="form-group my-2">
                                  <label htmlFor="exampleInputPassword1">
                                    Kitchen status
                                  </label>
                                  <br />
                                  <select
                                    value={kitchenEdit.kitchenStatus}
                                    name="kitchenStatus"
                                    onChange={(e) => handleKitchenChange(e)}
                                  >
                                    <option>open</option>
                                    <option>closed</option>
                                  </select>{" "}
                                </div>
                              </div>
                              <div className="col-md-6">
                                {/* category */}
                                <div className="form-group my-2">
                                  <div>{"  "}</div>
                                  <label htmlFor="exampleInputPassword1">
                                    kitchenCategeory
                                  </label>
                                  <br />
                                  <select
                                    value={kitchenEdit.kitchenCategeory}
                                    name="kitchenCategeory"
                                    onChange={(e) => handleKitchenChange(e)}
                                  >
                                    <option>all</option>
                                    <option>vegetarian</option>
                                    <option>non-vegetarian</option>
                                    <option>frozen</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                {/* zone */}
                                <div className="form-group my-2">
                                  <label htmlFor="exampleInputPassword1">
                                    Kitchen zone
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    value={kitchenEdit.zone}
                                    name="zone"
                                    onChange={(e) => handleKitchenChange(e)}
                                  />
                                  <br />
                                </div>
                              </div>
                              <div className="col-md-6">
                                {/* street */}
                                <div className="form-group my-2">
                                  <label htmlFor="exampleInputPassword1">
                                    Kitchen street
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    value={kitchenEdit.street}
                                    name="street"
                                    onChange={(e) => handleKitchenChange(e)}
                                  />
                                  <br />
                                </div>
                              </div>
                              <div className="col-md-6">
                                {/* building number */}
                                <div className="form-group my-2">
                                  <label htmlFor="exampleInputPassword1">
                                    {" "}
                                    buildingNumber
                                  </label>
                                  <br />
                                  <input
                                    type="number"
                                    value={kitchenEdit.buildingNumber}
                                    name="buildingNumber"
                                    onChange={(e) => handleKitchenChange(e)}
                                  />
                                  <br />
                                </div>
                              </div>
                              <div className="col-md-12">
                                {/* img */}
                                <div className="form-group my-2">
                                  <input
                                    type="file"
                                    className="form-control-file"
                                    id="exampleFormControlFile1"
                                    name="kitchenimage"
                                    onChange={(e) => handleKitchenChange(e)}
                                  ></input>
                                  {isFilePicked ? (
                                    <div>
                                      <p className="text-primary">Done</p>
                                    </div>
                                  ) : (
                                    <p className="text-danger">
                                      old image still not changed
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-12">
                                {/* sub btn */}
                                <div className="form-group my-2">
                                  <button
                                    type="submit"
                                    onClick={(e) => {
                                      HandelSubmit(e);
                                    }}
                                    className="btn btn-success"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* end of row */}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container py-5">
                    <div className="kitchen">
                      <div className="row g-0">
                        <div className="col-md-10">
                          <div className="kitchen-info p-3 pt-5">
                            {/* category */}
                            <p className="text-secondary">
                              {kitchen.kitchenCategeory} Food
                            </p>
                            {/* location */}
                            <p>
                              {kitchen.kitchenAddress.zone} ,{" "}
                              {kitchen.kitchenAddress.street} ,{" "}
                              {kitchen.kitchenAddress.buildingNumber}
                            </p>
                            {/* <button
      className="btn btn-warning"
      onClick={() => setShow(true)}
    >
      Edit Profile
    </button> */}
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
                  </div>

                  <Link to={`/addKitchenItem/${params.kitchenId}`}>
                    <button className="btn btn-success">
                      Add Item <AiOutlineAppstoreAdd size="30" />
                    </button>
                  </Link>
                  {/* items */}
                  <div className="row g-0 ">
                    {item.map((item) => {
                      // console.log(item)
                      return (
                        <div className="col-12" key={item._id}>
                          <div className="m-2 item">
                            <EditKitchenItems item={item} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
