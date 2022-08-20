import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../../Network/Config";
import Loader from "../../../components/Loader/Loader";
// import "./OrdersStyle.css";

export default function KitchenCurrentOrders() {
  const params = useParams();
  let kitchenId = Number(params.kitchenId);
  // console.log(kitchenId);

  const [kitchenCurrentOrder, setKitchenCurrentOrder] = useState([]);
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);
  const [cook, setCook] = useState(true);
  const [compelted, setCompleted] = useState(false);
  // console.log(order);
  useEffect(() => {
    axiosInstance
      .get(`/kitchenCurrentOrders/${kitchenId}`)
      .then((res) => {
        setKitchenCurrentOrder(res.data);
        setIsOrder(true);
        setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
        // console.log("current order>>>>>", kitchenCurrentOrder);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [compelted]);
  // console.log("orders", userOrders.userOrder);
  // delete order
  const inProgresStatus = (e) => {
    // console.log("event value===>", e.target.value);

    let currentOrder = Number(e.target.id);
    // console.log("order id==> ", currentOrder);

    axiosInstance
      .put(`/order/${currentOrder}`, {
        kitchenOrderStatus: "inProgress",
      })
      .then((res) => {
        setCook(false);
        if (compelted) {
          setCompleted(false);
        } else {
          setCompleted(true);
        }
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const completedStatus = (e) => {
    // console.log("event value===>", e.target.value);

    let currentOrder = Number(e.target.id);
    // console.log("order id==> ", currentOrder);

    axiosInstance
      .put(`/order/${currentOrder}`, {
        kitchenOrderStatus: "completed",
      })
      .then((res) => {
        // console.log(res.data);
        if (compelted) {
          setCompleted(false);
        } else {
          setCompleted(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="current-orders">
      <h2 className="top-header">Current Orders</h2>
      {kitchenCurrentOrder.length !== 0 ? (
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>Orders No.</td>
              <td>Client Name</td>
              <td>Client Phone</td>
              <td>Kitchen status</td>
              <td>Pilot status</td>
              <td>Items</td>
              <td>Total Price</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {kitchenCurrentOrder.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.userid.userFullName}</td>
                  <td>{order.userid.userPhone}</td>
                  <td>{order.kitchenOrderStatus}</td>
                  <td>{order.pilotOrderStatus}</td>
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
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.kitchenOrderStatus === "accepted" ? (
                      <button
                        value="inProgress"
                        id={order._id}
                        key={index}
                        className="btn btn-success"
                        onClick={(e) => inProgresStatus(e)}
                      >
                        Cook
                      </button>
                    ) : (
                      ""
                    )}

                    {order.kitchenOrderStatus === "inProgress" ? (
                      <button
                        className="btn btn-danger"
                        id={order._id}
                        onClick={(e) => completedStatus(e)}
                        value="completed"
                      >
                        Completed
                      </button>
                    ) : (
                      ""
                    )}
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
