import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../Loader/Loader";
import "./OrdersStyle.css";

export default function HistoryOrders(props) {
  // console.log("props", props.userData._id);
  const params = useParams();

  const [userOrders, setUserOrders] = useState({});
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);

  let [isdeleted, setIsdeleted] = useState(true);
  // console.log(order);

  useEffect(() => {
    axiosInstance
      .get(`/userOrders/${props.userData._id}`)
      .then((res) => {
        setUserOrders(res.data);
        setIsOrder(true);
        setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [isdeleted]);
  // console.log("orders", userOrders.userOrder);
  // delete order
  return (
    <div className="historyProfile">
      <h2 className="top-header">History Orders</h2>
      {isOrder ? (
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>Orders No.</td>
              <td>Kitchen Name</td>
              <td>kitchen Address</td>
              <td>Items</td>
              <td>Total Price</td>
              <td>Order status</td>
            </tr>
          </thead>
          <tbody>
            {userOrders.userOrder.map((order, index) => {
              return (
                <tr key={index}>
                  {order.kitchenOrderStatus !== "rejected" &&
                  order.pilotOrderStatus == "dilevered" ? (
                    <>
                      <td>{index + 1}</td>
                      <td>{order.kitchen.kitchenName}</td>
                      <td>
                        {order.kitchen.kitchenAddress.street}
                        {" , "} {order.kitchen.kitchenAddress.zone}
                      </td>
                      <td>
                        <ul>
                          {order.orderItems.map((item, index) => {
                            return (
                              <li key={index}>
                                {item.itemName} : {item.itemPrice}{" "}
                                <span>LE</span>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>{order.pilotOrderStatus}</td>
                      <td></td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "no order added yet"
      )}
    </div>
  );
}
