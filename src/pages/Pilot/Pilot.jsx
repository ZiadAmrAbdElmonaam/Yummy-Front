import { Link, useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./Pilot.css";
import PilotOnlineOrder from "../OnlineOrders/PilotOnlineOrder";
import { useSelector } from "react-redux";
// import PilotOrders from "./PilotOrders";

export default function Pilot() {
let toke =   useSelector(state => state.login.token)
console.log("now token is =>>" , toke)
  const history = useHistory();
  const [pilot, setPilot] = useState({});
  // const [item, setItem] = useState([]);
  let [isload, setIsLoad] = useState(true);

  let params = useParams();
  // console.log("params", params);
  useEffect(() => {
    // if(toke)
    // {
    axiosInstance
      .get(`/pilotOrders/${params.id}`)
      .then((res) => {
        setPilot(res.data);
        setIsLoad(false);
        //   setItem(res.data.menuId.menuItems);
      })
      .catch((err) => {
        console.log(err)
        setIsLoad(false);
      });
    // }
  }, []); 
  // toke
  function onlineOrders() {
    console.log("params", params);
    // console.log("hhhhhhh")
    history.push(`/onlineOrders/${params.id}`);
  }
  function myOnlineOrders() {
    history.push(`/pilotOnlineOrders/${params.id}`);
  }
  function myHistory() {
    history.push(`/pilotHistory/${params.id}`);
  }
  // console.log("nnn", item);
  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <>
          <div className="cover">
            <div className="cover-info">
              <h2 className="pilotHeader">Welcome {pilot.pilotName}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio alias natus magni quod fuga ducimus adipisci velit
                dolores doloremque, laboriosam omnis vero placeat asperiores
                animi nemo at deleniti eius debitis?
              </p>
              {/* <Link className="btn btn-primary" to="/onlineOrders">
                Online Orders{" "}
              </Link> */}

              {/* <button */}
              {/* <button
                className="btn btn-dark"
                onClick={() => {
                  onlineOrders();
                }}
              >
                Online Orders{" "}  
              </button> */}

              <button
                className="btn btn-dark"
                onClick={() => {
                  myOnlineOrders();
                }}
              >
                My Online Orders{" "}
              </button>
              <button
                className="btn btn-dark"
                onClick={() => {
                  myHistory();
                }}
              >
                My History{" "}
              </button>
              {/* <Link className="btn btn-primary" to="/pilotOnlineOrders/:id">My Online Orders</Link> */}
              <PilotOnlineOrder />
            </div>
          </div>

          {/* <PilotOrders pilot={pilot} /> */}
        </>
      )}
    </>
  );
}
