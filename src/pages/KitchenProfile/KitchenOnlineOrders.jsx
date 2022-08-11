import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";
// import "./OrdersStyle.css";

export default function KitchenOnlineOrders() {
  const params = useParams();
  let kitchenId = Number(params.kitchenId);
  console.log(kitchenId);

  const [kitchenOrder, setKitchenOrder] = useState({});
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);

  let [isdeleted, setIsdeleted] = useState(true);
  // console.log(order);

  useEffect(() => {
    axiosInstance
      .get(`/kitchenOrders/${kitchenId}`)
      .then((res) => {
        setKitchenOrder(res.data);
        setIsOrder(true);
        setIsLoad(false);
        // setKitchenEdit(res.data);
        console.log("res>>>", res.data);
        console.log("order>>>>>", kitchenOrder);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [isdeleted]);
  // console.log("orders", userOrders.userOrder);
  // delete order
  const changeStatus = async (e, i) => {
    console.log("user id===>", Number(e.target.id));
    let userID = Number(params.id);
    // console.log(userID);
    // console.log("clicked index", i);
    let currentOrder = Number(e.target.id);
    console.log("order id==> ", currentOrder);

    axiosInstance
      .put(`/order/${currentOrder}`)
      .then((res) => {
        console.log(res.data);
        setIsdeleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-3">
      <h2 className="top-header">Current Orders</h2>
      {isOrder ? (
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
            {kitchenOrder.kitchenOrders.map((order, index) => {
              return (
                <tr key={index}>
                  {order.pilotOrderStatus !== "dilevered" ? (
                    <>
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
                                {item.itemName} : {item.itemPrice}{" "}
                                <span>LE</span>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>

                      <button
                          disabled={
                            order.kitchenOrderStatus == "completed" ||
                            order.kitchenOrderStatus == "inProgress"
                              ? true
                              : false
                          }
                          id={order._id}
                          key={index}
                          className="btn btn-success"
                          onClick={(e, key) => changeStatus(e, index)}
                        >
                          Accept
                        </button>
                        <button className="btn btn-danger">
                        Reject

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
