import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../Network/Config";
import { Params, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import EditKitchenProfile from "./EditKitchenProfile";
import Form from "react-bootstrap/Form";
import {
  AiOutlineAppstoreAdd,
  AiFillEdit,
  AiFillCloseSquare,
} from "react-icons/ai";
import "./kitchenProfile.css";

export default function KitchenProfile() {
  //   console.log("props", props);
 
  const [kitchen, setKitchen] = useState({});
  const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);
  const [edit, setShow] = useState(false);

  let params = useParams();
  //   console.log(params);

  useEffect(() => {
    axiosInstance
      .get(`/kitchen/${params.kitchenId}`)
      .then((res) => {
        setKitchen(res.data);
        setItem(res.data.menuId.menuItems);
        setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, []);
  console.log("kitchen=====>",kitchen.kitchenName)
  const kitchenArray= {...kitchen};
  console.log("kitchen Array",kitchenArray)
  const [kitchenEdit, setKitchenEdit] = useState({
    kitchenName: kitchen.kitchenName,
    kitchenEmail: kitchen.kitchenEmail,
    kitchenPassword: kitchen.kitchenPassword,
    kitchenPhone: kitchen.kitchenPhone,
    kitchenCategeory: kitchen.kitchenCategeory,
    kitchenAddress: {
      zone: kitchen.zone,
      street: kitchen.street,
      buildingNumber: kitchen.buildingNumber,
    },
  });
  console.log("Kitchen Edit===>>>", kitchenEdit)

 

  const handleKitchenChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "zone" || name === "street" || name === "buildingNumber") {
      setKitchenEdit({
        ...kitchenEdit,
        kitchenAddress: {
          ...kitchenEdit.kitchenAddress,
          [name]: value,
        },
      });
    } else {
      setKitchenEdit({
        ...kitchenEdit,
        [name]: value,
      });
    }
  };
  function updateData(e) {
    console.log("eve",e.target.value)
    setKitchenEdit({
      kitchenName:e.target.value  
    })
  }
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
  return (
    <div>
      {isload ? (
        <Loader />
      ) : (
        <div className="App">
          {edit ? (
            <div className="container py-5">
              <div className="kitchen">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="kitchen-cover p-3">
                      <img
                        src={kitchen.kitchenImage}
                        alt={kitchen.kitchenImage}
                        className="respnsiveImg"
                      />
                    </div>
                  </div>
                  <form
                    onSubmit={(event) => {
                      HandelSubmit(event);
                    }}
                    className="form"
                  >
                    <div className="col-md-10">
                      <div className="kitchen-info p-3 pt-5">
                        <input
                        type="text"
                          className="contain-kitchen-name"
                          value={kitchenEdit.kitchenName}
                          name="kitchenName"
                          onChange={(e) => handleKitchenChange(e)}
                        />
                        {"  "}
                        <select
                          value={kitchenEdit.kitchenStatus}
                          name="kitchenStatus"
                          onChange={(e) => handleKitchenChange(e)}
                        >
                          <option>open</option>
                          <option>closed</option>
                        </select>{" "}
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
                        <br />
                        {/* <input
                        type="text"
                          value={kitchenEdit.zone}
                          name="zone"
                          onChange={(e) => handleKitchenChange(e)}
                        />
                        <input
                        type="text"
                          value={kitchenEdit.street}
                          name="street"
                          onChange={(e) => handleKitchenChange(e)}
                        />
                        <input
                          type="number"
                          value={kitchenEdit.buildingNumber}
                          name="buildingNumber"
                          onChange={(e) => handleKitchenChange(e)}
                        /> */}
                        <br />
                        <button
                          type="submit"
                          className="btn btn-warning"
                          // onClick={(e) => updateData(e)}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => setShow(false)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </form>

                  <hr />
                </div>
              </div>
            </div>
          ) : (
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
                      <h1 className="contain-kitchen-name">
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
                      {/* <p>
                        {kitchen.kitchenAddress.zone} ,{" "}
                        {kitchen.kitchenAddress.street} ,{" "}
                        {kitchen.kitchenAddress.buildingNumber}
                      </p> */}
                      {/* <button className="btn btn-warning">Edit Profile</button> */}
                      <button
                        className="btn btn-warning"
                        onClick={() => setShow(true)}
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
          )}
          <button className="btn btn-success">
            Add Item <AiOutlineAppstoreAdd size="30" />
          </button>
          {/* items */}
          <div className="row g-0 ">
            {item.map((item) => {
              return (
                <div className="col-12" key={item._id}>
                  <div className="m-2 item">
                    <AiFillCloseSquare className="icon text-danger" size="23" />
                    <AiFillEdit size="23" className="icon text-success" />
                    <ItemCard item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
