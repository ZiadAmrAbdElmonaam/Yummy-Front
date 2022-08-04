import { useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

export default function Pilot() {
    const [pilot, setPilot] = useState({});
    // const [item, setItem] = useState([]);
    let [isload, setIsLoad] = useState(true);
  
    let params = useParams();
    console.log("params", params);
    useEffect(() => {
      axiosInstance
        .get(`/pilot/${params.id}`)
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
        <div>{pilot.pilotName}</div>

      )}
    </>
  );
}
