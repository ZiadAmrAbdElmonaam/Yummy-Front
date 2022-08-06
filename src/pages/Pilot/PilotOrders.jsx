import React from "react";
import "./Pilot.css";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import axiosInstance from "../../Network/Config";
export default function PilotOrders(props) {

  const [dileveredStatus, setDileveredStatus] = useState({
    pilotOrderStatus: "dilevered",
  });


  const [pilotOrdersHistory, setPilotOrdersHistory] = useState([]);
  

  const deleteOrder = (index)=>{
    const order = [...pilotOrdersHistory];
    order.splice(index, 1);
    pilotOrdersHistory(order);
}

function changeToDelivered(e,index){
  console.log("clicked");
  console.log("event",e.target.parentElement.parentElement.id);
  let orderId=e.target.parentElement.parentElement.id
  axiosInstance
  .put(`/order/${orderId}`, dileveredStatus)
  .then((res) => {
    // setOnlineOrder(res.data);
    console.log(res.data);
    
    deleteOrder(index)
  })
  .catch((err) => {
    console.log(err);
  });


}



  console.log("props====>",props);
  console.log("props.orders====>",props.pilot.orders);
  return (
    <div className="container">
      <h1 className="orders-head">My Orders</h1>
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
              <td></td>
            </tr>
          </thead>
          <tbody>
            {props.pilot.orders.map((order, index) => {
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
                  <td><AiOutlineCheck size="30" 
                  color="green" className="checkMark" 
                  onClick={(e,index)=>{changeToDelivered(e,index)}} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>


      </div>
    </div>
  );
}
