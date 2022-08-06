import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";

function PilotOnlineOrder() {
  const [onlineOrder, setOnlineOrder] = useState({});

  // const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);

  let params = useParams();
  console.log("params", params);
  useEffect(() => {
    axiosInstance
      .get(`/orders`)
      .then((res) => {
        setOnlineOrder(res.data);
        console.log(res.data);
        setIsLoad(false);
        //   setItem(res.data.menuId.menuItems);
      })
      .catch((err) => {
        setIsLoad(false);
      });
  }, []);

  //   function addingOrder (id){
  //     console.log(id)
  //     axiosInstance
  //     .post(`/orders/${id}`)
  //     .then((res) => {
  //       setOnlineOrder(res.data);
  //       console.log(res.data)
  //       setIsLoad(false);
  //       //   setItem(res.data.menuId.menuItems);
  //     })
  //     .catch((err) => {
  //       setIsLoad(false);
  //     });

  //   }

  // console.log("nnn", item)
  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <div className="container">
          <h1 className="orders-head">Online Orders</h1>
          <div className="table-responsive">
            <table className="table  table-hover my-5 ">
              <thead className="table-warning ">
                <tr>
                  <td>orders</td>
                  <td>kitchenName</td>
                  <td>kitchenAddress</td>
                  <td>kitchenPhone</td>
                  <td>kitchenOrderStatus</td>
                  <td>userFullName</td>
                  <td>userAddress</td>
                  <td>userPhone</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {onlineOrder.map((order, index) => {
                  return (
                    <>
                      {order.pilotOrderStatus === "waiting" &&
                      order.kitchenOrderStatus === "pending" ? (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{order.kitchen.kitchenName}</td>
                          {/* <td>
                            {order.kitchen.kitchenAddress.buildingNumber},{" "}
                            {order.kitchen.kitchenAddress.street},{" "}
                            {order.kitchen.kitchenAddress.zone}
                          </td> */}
                          <td>{order.kitchen.kitchenPhone}</td>
                          <td>{order.kitchenOrderStatus}</td>
                          <td>{order.userid.userFullName}</td>
                          {/* <td>
                    {order.userid.userAddress.building},{" "}
                    {order.userid.userAddress.street},{" "}
                    {order.userid.userAddress.zone}
                  </td> */}
                          <td>{order.userid.userPhone}</td>
                          {/* <td><button onClick={(index)=>addingOrder(index)} className=' btn btn-success'>Add</button></td> */}
                        </tr>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default PilotOnlineOrder;
