import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../Loader/Loader";
import "./OrdersStyle.css";

export default function CurrentOrders(props) {
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
  const deletOrder = async (e, i) => {
    // console.log("user id===>", Number(e.target.id));
    let userID = Number(params.id);
    // console.log(userID);
    // console.log("clicked index", i);
    let currentOrder = Number(e.target.id);
    // console.log("order id==> ", currentOrder);

    axiosInstance
      .delete(`/order/${currentOrder}`)
      .then((res) => {
        // console.log(res.data);
        setIsdeleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="currentOrder">
      <h2 className="top-header">Current Orders</h2>
      {isOrder ? (
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>Orders No.</td>
              <td>Kitchen Name</td>
              <td>kitchen Address</td>
              <td>Kitchen status</td>
              <td>Pilot status</td>
              <td>Items</td>
              <td>Total Price</td>
              <td>Cancel</td>
            </tr>
          </thead>
          <tbody>
            {userOrders.userOrder.map((order, index) => {
              return (
                <tr key={index}>
                  {order.pilotOrderStatus !== "dilevered" ? (
                    <>
                      <td>{index + 1}</td>
                      <td>{order.kitchen.kitchenName}</td>
                      <td>
                        {order.kitchen.kitchenAddress.street}
                        {" , "} {order.kitchen.kitchenAddress.zone}
                      </td>
                      <td>{order.kitchenOrderStatus}</td>
                      <td>{order.pilotOrderStatus}</td>
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
                      <td>
                        {/* {... order.kitchenOrderStatus=="inProgress"?
                        disabled:
                        ""} */}
                        <button
                          disabled={
                            order.kitchenOrderStatus == "completed" ||
                            order.kitchenOrderStatus == "inProgress"
                              ? true
                              : false
                          }
                          id={order._id}
                          key={index}
                          className="btn btn-danger"
                          onClick={(e, key) => deletOrder(e, index)}
                        >
                          Cancel
                        </button>
                      </td>
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
