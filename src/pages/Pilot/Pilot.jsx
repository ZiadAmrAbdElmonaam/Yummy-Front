import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./Pilot.css";
import PilotOrders from "./PilotOrders";

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
      })
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
          <div className="cover">
            <div className="cover-info">
              <h2 className="pilotHeader">Welcome {pilot.pilotName}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio alias natus magni quod fuga ducimus adipisci velit
                dolores doloremque, laboriosam omnis vero placeat asperiores
                animi nemo at deleniti eius debitis?
              </p>
            </div>
          </div>
          <PilotOrders pilot={pilot} />
        </>
      )}
    </>
  );
}
