import Card from "react-bootstrap/Card";
import "./KitchenDetails.css";
import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../Network/Config";
import Menu from "../../components/Menu/Menu";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { OrderThunk } from "../../Store/Actions/Orders";
import NavBar from "../../components/NavBar/NavBar";

import { KetchenIdThunk } from "../../Store/Actions/KetchenId";

export default function KitchenDetails() {
  const [userD, setUserD] = useState({});
  const [item, setItem] = useState([]);
  const [cart, setCart] = useState([]);
  let [isload, setIsLoad] = useState(true);
  let params = useParams();
  const dispatch = useDispatch();

  function addOrder(item) {
    //  console.log("e===================>", item);

    dispatch(OrderThunk(item));

    // console.log("item ===>", item);
  }

  useEffect(() => {
    axiosInstance
      .get(`/kitchen/${params.id}`)
      .then((res) => {
        setUserD(res.data);
        setIsLoad(false);
        // console.log(params.id);
        dispatch(KetchenIdThunk(Number(params.id)));

        setItem(res.data.menuId.menuItems);
      })

      .catch((err) => {
        setIsLoad(false);
      });
  }, []);
  // console.log("kitchen data", userD);

  return (
    <div>
      {isload ? (
        <Loader />
      ) : (
        <div className="container kitchen-details">
          <div className="kitchen">
            <div className="row g-0">
              <div className="col-md-2">
                <div className="kitchen-cover p-3">
                  <img
                    src={userD.kitchenImage}
                    alt={userD.kitchenName}
                    className="respnsiveImg"
                  />
                </div>
              </div>
              <div className="col-md-10">
                <div className="kitchen-info p-3 pt-5">
                  <h1 className="contain-kitchen-name">
                    {userD.kitchenName}
                    <span
                      className={
                        userD.kitchenStatus === "closed"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {userD.kitchenStatus}
                    </span>
                  </h1>
                  {/* category */}
                  <p className="text-secondary">
                    {userD.kitchenCategeory} Food
                  </p>
                  {/* location */}
                  <p>
                    {userD.kitchenAddress.zone} , {userD.kitchenAddress.street}{" "}
                    , {userD.kitchenAddress.buildingNumber}
                  </p>
                </div>
              </div>
              <hr />
            </div>
            {/* //end of row */}
          </div>

          {/* items */}
          <div className="row g-0 ">
            {item.map((item) => {
              return (
                <div className="col-12" key={item._id}>
                  <div className="m-2 item">
                    <ItemCard item={item} addToCard={addOrder} />
                  </div>
                </div>
              );
            })}
          </div>
        </div> //end of container
      )}
    </div>
  );
}
