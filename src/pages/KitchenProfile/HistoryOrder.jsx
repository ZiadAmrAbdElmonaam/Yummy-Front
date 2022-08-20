import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";
// import "./OrdersStyle.css";

export default function HistoryOrder() {
  const params = useParams();
  let kitchenId = Number(params.kitchenId);
  // console.log(kitchenId);

  const [historyOrder, setHistoryOrder] = useState([]);
  let [isload, setIsLoad] = useState(true);
  let [isOrder, setIsOrder] = useState(false);
  useEffect(() => {
    axiosInstance
      .get(`/kitchenHistoryOrders/${kitchenId}`)
      .then((res) => {
        setHistoryOrder(res.data);
        //  setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
        // console.log("history order>>>>>", historyOrder);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="history-order">
      <h2 className="top-header">History Orders</h2>
      {historyOrder.length !== 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {historyOrder.map((order, index) => {
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
