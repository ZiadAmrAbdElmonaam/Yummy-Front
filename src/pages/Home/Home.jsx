import React from "react";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
// import CardComponent from "../component/Card";
// import { Link } from "react-router-dom";
// import Loading from "./../component/Loading";

import axiosInstance from "../../Network/Config";
export default function Home() {
  const [menus, setMenu] = useState([]);
  let [load, setLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/menu")
      .then((res) => {
        // setUsers(res.data);
        console.log(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // let handelClick = (e) =>{
  //     <Link to={"/user-details:id"}></Link>
  // }

  return (
    <>
      <h1>Hello from home page </h1>
      <h6>Menu</h6>

      {/* {load ? (
        <Loading />
      ) : (
          )} */}
      <div className="row">{/* <CardComponent user={user} /> */}</div>
    </>
  );
}
