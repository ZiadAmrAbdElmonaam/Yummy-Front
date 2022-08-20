import React from "react";
import "./Pilot.css";
import { AiOutlineCheck } from "react-icons/ai";
import { useState, useEffect } from "react";
import axiosInstance from "../../Network/Config";
import { useParams, Link } from "react-router-dom";
export default function PilotOrders() {
  const [dileveredStatus, setDileveredStatus] = useState({
    pilotOrderStatus: "dilevered",
    orderArrival: Date(),
  });

  const params = useParams();
  // console.log(params.id);
  const [pilotOnlineOrders, setPilotOnlineOrders] = useState([]);
  let [isload, setIsLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/pilotOnlineOrders/${params.id}`)
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
  // console.log("pilot state",pilotOnlineOrders)
  const deleteOrder = (index) => {
    const order = [...pilotOnlineOrders];
    order.splice(index, 1);
    // console.log("index====>", index);
    setPilotOnlineOrders(order);
  };

  function changeToDelivered(e, index) {
    // console.log(index);
    // console.log("clicked");
    // console.log("type of ", e.target.id);
    let orderId = Number(e.target.id);
    // console.log(Number(e.target.id))
    // console.log("state", pilotOnlineOrders);

    axiosInstance
      .put(`/order/${orderId}`, dileveredStatus)
      .then((res) => {
        // setOnlineOrder(res.data);
        // console.log(res.data);
        // console.log("index in func", index);
        deleteOrder(index);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log("props====>", props);
  // console.log("props.orders====>", props.pilot.orders);
  return (
    <div className="contaier">
      <div className="myOrders">
        <Link className="btn btn-danger" to={`/pilot/${params.id}`}>
          Back
        </Link>
        <h1 className="orders-head">My Orders</h1>
        <div className="table-responsive">
          <table className="table  table-hover my-5 ">
            <thead className="table-warning ">
              <tr>
                <td>Orders No.</td>
                <td>Kitchen Name</td>
                <td>kitchen Address</td>
                <td>Client Name</td>
                <td>Client Address</td>
                <td>Client Phone</td>
                <td>Item</td>
                <td>Pilot Order Status</td>
                <td>Total Price</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {pilotOnlineOrders.map((order, index) => {
                return (
                  <tr key={index}>
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
                    <td>{order.userid.userPhone}</td>
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
                    <td>
                      <AiOutlineCheck
                        id={order._id}
                        size="30"
                        color="green"
                        className="checkMark"
                        key={index}
                        onClick={(e, key) => changeToDelivered(e, index)}
                      />
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
