import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";
// import "./OrdersStyle.css";

export default function KitchenOnlineOrders() {
  const params = useParams();
  let kitchenId = Number(params.kitchenId);
  // console.log(kitchenId);

  const [kitchenOrder, setKitchenOrder] = useState([]);
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);
  // console.log(order);

  useEffect(() => {
    axiosInstance
      .get(`/kitchenPendingOrders/${kitchenId}`)
      .then((res) => {
        setKitchenOrder(res.data);
        setIsLoad(false);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [isOrder]);
  // console.log("orders", userOrders.userOrder);
  // accept order
  const changeStatus = (e) => {
    // console.log("event value===>", e.target.value);
    let currentOrder = Number(e.target.id);
    axiosInstance
      .put(`/order/${currentOrder}`, { kitchenOrderStatus: "accepted" })
      .then((res) => {
        // console.log(res.data);
        if (isOrder) {
          setIsOrder(false);
        } else {
          setIsOrder(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function rejectStatus(e) {
    let currentOrder = Number(e.target.id);

    axiosInstance
      .put(`/order/${currentOrder}`, { kitchenOrderStatus: "rejected" })
      .then((res) => {
        // console.log(res.data);
        if (isOrder) {
          setIsOrder(false);
        } else {
          setIsOrder(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log("hhhhhh", kitchenOrder);
  // console.log("hhhhhh", kitchenOrder.length);
  return (
    <div className="online-orders">
      <h2 className="top-header">Requested Orders</h2>
      {kitchenOrder.length !== 0 ? (
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>Orders No.</td>
              <td>Kitchen status</td>
              <td>Items</td>
              <td>Total Price</td>
              <td>Accept/Reject</td>
            </tr>
          </thead>
          <tbody>
            {kitchenOrder.map((order, index) => {
              return (
                <tr key={index}>
                  <>
                    <td>{index + 1}</td>

                    <td>{order.kitchenOrderStatus}</td>

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
                      <button
                        value="accepted"
                        id={order._id}
                        key={index}
                        className="btn btn-success mx-1"
                        onClick={(e) => changeStatus(e)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => rejectStatus(e)}
                        value="rejected"
                        id={order._id}
                      >
                        Reject
                      </button>
                    </td>
                  </>
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
