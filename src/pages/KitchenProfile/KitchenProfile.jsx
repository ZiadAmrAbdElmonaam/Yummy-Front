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
import {
  AiOutlineAppstoreAdd,
  AiFillEdit,
  AiFillCloseSquare,
} from "react-icons/ai";
import "./kitchenProfile.css";
import KitchenCurrentOrders from "./KitchenCurrentOrder/KitchenCurrentOrder"

export default function KitchenProfile() {
  //   console.log("props", props);

  const [kitchen, setKitchen] = useState({});
  const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);
  const [edit, setShow] = useState(false);
  const [onlineFlag, setOnlineFlag] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [home, setHome] = useState(true);

  let params = useParams();
  //   console.log(params);
  const [kitchenEdit, setKitchenEdit] = useState({});
  useEffect(() => {
    axiosInstance
      .get(`/kitchen/${params.kitchenId}`)
      .then((res) => {
        setKitchen(res.data);
        setItem(res.data.menuId.menuItems);
        console.log(res.data.menuId.menuItems);
        setIsLoad(false);
        setKitchenEdit({
          // ...kitchen,
          kitchenName: kitchen.kitchenName,
          kitchenEmail: kitchen.kitchenEmail,
          kitchenPhone: kitchen.kitchenPhone,
          kitchenCategeory: kitchen.kitchenCategeory,
          kitchenStatus: kitchen.kitchenStatus,
          ...kitchen.kitchenAddress,
          zone: kitchen.kitchenAddress.zone,
          street: kitchen.kitchenAddress.street,
          buildingNumber: kitchen.kitchenAddress.buildingNumber,
        });
        // console.log("res>>>", res.data);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [edit]);
  // console.log("kitchen=====>", kitchen.kitchenName);
  const kitchenArray = { ...kitchen };
  // console.log("kitchen Array", kitchenArray);

  // console.log("Kitchen Edit===>>>", kitchenEdit);

  const handleKitchenChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setKitchenEdit({
      ...kitchenEdit,
      [name]: value,
    });
    // }
  };

  //  on Submit
  const HandelSubmit = (event) => {
    console.log(params.kitchenId);
    event.preventDefault();
    axiosInstance
      .put(`/kitchen/${params.kitchenId}`, kitchenEdit)
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function onlineOrders() {
    setHome(false)
    setCurrentOrder(false);
    setOnlineFlag(true);
  }
  function currentOrders() {
    setHome(false)
    setOnlineFlag(false);
    setCurrentOrder(true);
  }
  function goHome(){
    setOnlineFlag(false);
    setCurrentOrder(false);
    setHome(true)
  }
  return (
    <div>
      {isload ? (
        <Loader />
      ) : (
        <div className="App">
          <div>
            <button
              onClick={() => {
                currentOrders();
              }}
            >
              Current Orders
            </button>
            {currentOrder ? <KitchenCurrentOrders /> : ""}
            <button
              onClick={() => {
                onlineOrders();
              }}
            >
              online orders
            </button>
            {onlineFlag ? <KitchenOnlineOrders /> : ""}
            <button onClick={()=>{goHome()}}>Home</button>
            {home ? (
              <>
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
                          <div className="form-group">
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
                          <div className="form-group">
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
                          <br />
                          <div>
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
                          <div>
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
                          <br />{" "}
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleFormControlFile1"
                          ></input>
                          <br />
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

                <div className="container py-5">
                  <div className="kitchen">
                    <div className="row g-0">
                      <div className="col-md-2">
                        <div className="kitchen-cover p-3">
                          <img
                            src={kitchen.kitchenImage}
                            alt={kitchen.kitchenName}
                            className="respnsiveImg"
                          />
                        </div>
                      </div>
                      <div className="col-md-10">
                        <div className="kitchen-info p-3 pt-5">
                          <h1 className="contain-kitchen-name ">
                            {kitchen.kitchenName}
                            <span
                              className={
                                kitchen.kitchenStatus === "closed"
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              {kitchen.kitchenStatus}
                            </span>
                          </h1>
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
      )}
    </div>
  );
}
