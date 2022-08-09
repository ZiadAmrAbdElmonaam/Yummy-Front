import React, { useState, useEffect } from "react";
import axiosInstance from "../../Network/Config";
import Loader from "../Loader/Loader";
import "./OrdersStyle.css";
export default function CurrentOrders(props) {
  console.log("props", props.userData._id);

  const [userOrders, setUserOrders] = useState({});
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);

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
  }, []);
  console.log("orders", userOrders.userOrder);
  return (
    <div>
      <h1 className="top-header">Current Orders</h1>
      {isOrder ? (
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>Orders No.</td>
              <td>Kitchen Name</td>
              <td>kitchen Address</td>
              <td>Order status</td>
              <td>Item</td>
              <td>Total Price</td>
              <td>Cancel</td>
            </tr>
          </thead>
          <tbody>
            {userOrders.userOrder.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.kitchen.kitchenName}</td>
                  <td>
                    {order.kitchen.kitchenAddress.street}
                    {" , "} {order.kitchen.kitchenAddress.zone}
                  </td>
                  <td>{order.kitchenOrderStatus}</td>
                  <td>data</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <button className="btn btn-danger">Cancel</button>
                  </td>
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
