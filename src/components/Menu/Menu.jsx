import React from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
// import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";

export default function Menu({
  menuItems: { itemCatogery, itemDescription, itemName },
}) {
  const [menu, setMenu] = useState({});
  let params = useParams();

  let [load, setLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/menu/${params.id}`)
      .then((res) => {
        setMenu(res.data);
        console.log(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Menu work</div>;
}
