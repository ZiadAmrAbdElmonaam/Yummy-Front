import React from "react";
import "./Pilot.css";
import { AiOutlineCheck } from "react-icons/ai";
import { useState, useEffect } from "react";
import axiosInstance from "../../Network/Config";
import { useParams, Link } from "react-router-dom";
export default function PilotHistory() {
  const params = useParams();
  // console.log(params.id);
  const [pilotOnlineOrders, setPilotOnlineOrders] = useState([]);

  let [isload, setIsLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/pilotHistoryOrders/${params.id}`)
      .then((res) => {
        setPilotOnlineOrders(res.data);
        // console.log("response>>>>", res.data);
        setIsLoad(false);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, []);

  // console.log("props====>", props);
  // console.log("props.orders====>", props.pilot.orders);
  return (
    <div className="container">
      <div className="pilotHistory">
        <Link className="btn btn-danger" to={`/pilot/${params.id}`}>
          Back
        </Link>
        <h1 className="orders-head">My History</h1>
        <div className="table-responsive">
          <table className="table  table-hover my-5 ">
            <thead className="table-warning ">
              <tr>
                <td>orders</td>
                <td>kitchen name</td>
                <td>kitchen zone</td>
                <td>client name</td>
                <td>client address</td>
                <td>Item</td>
                <td>pilot Order Status</td>
                <td>total price</td>
              </tr>
            </thead>
            <tbody>
              {pilotOnlineOrders.map((order, index) => {
                return (
                  <tr key={index} id={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.kitchen.kitchenName}</td>
                    <td>
                      {order.kitchen.kitchenAddress.buildingNumber},{" "}
                      {order.kitchen.kitchenAddress.street},{" "}
                      {order.kitchen.kitchenAddress.zone}
                    </td>
                    <td>{order.userid.userFullName}</td>
                    <td>
                      {order.userid.userAddress.building},{" "}
                      {order.userid.userAddress.street},{" "}
                      {order.userid.userAddress.zone}
                    </td>
                    <td>
                      <ul>
                        {order.orderItems.map((item, index) => {
                          return (
                            <li key={index}>
                              {item.itemName} : {item.itemPrice} <span>LE</span>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>{order.pilotOrderStatus}</td>
                    <td>
                      {order.totalPrice} <span>LE</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
