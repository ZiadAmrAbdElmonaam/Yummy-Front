import { useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./Pilot.css"

export default function Pilot() {
    const [pilot, setPilot] = useState({});
    // const [item, setItem] = useState([]);
    let [isload, setIsLoad] = useState(true);
  
    let params = useParams();
    console.log("params", params);
    useEffect(() => {
      axiosInstance
        .get(`/pilotOrders/${params.id}`)
        .then((res) => {
          setPilot(res.data);
          setIsLoad(false);
        //   setItem(res.data.menuId.menuItems);
        }

        )
        .catch((err) => {
          setIsLoad(false);
        });
    }, []);
    // console.log("nnn", item);

  return (
    <>
     {isload ? (
        <Loader />
      ) : (
      <>
      <div className="row">
      
      <div className="col-12 ">
        <h2 className="pilotHeader">
        Welcome {pilot.pilotName}
        </h2>
      </div>
      {/* <div className="row">0{pilot.pilotNumber}</div> */}
      <div></div>
      </div>
      </>

      )}
    </>
  );
}
