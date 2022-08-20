import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axiosInstance from "../../Network/Config";
import CardComponent from "../Card/Card";
import "./SearchStyle.css";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kitchensSearch, setKitchensSearch] = useState([]);
  useEffect(() => {
    if (searchTerm) {
      axiosInstance
        .get(`/kitchenSearch/${searchTerm}`)
        .then((res) => {
          setKitchensSearch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setKitchensSearch([]);
    }
  }, [searchTerm]);
  const handleOneSubmit = (e) => {
    e.preventDefault();
  };
  const hanldeOnChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log("search kitchen",kitchensSearch)
  };
  return (
    <>
      <form
        className="contain-search"
        onSubmit={handleOneSubmit}
        style={{
          // margin: "8.6rem auto",
          marginBottom: "0.6rem",
          textAlign: "center",
          position: "sticky",
        }}
      >
        <input
          role="combobox"
          placeholder="Search..."
          className=""
          type="search"
          value={searchTerm}
          onChange={hanldeOnChange}
        />
        <AiOutlineSearch
          fontSize={43.3}
          style={{
            // border: "1.5px solid brown",
            borderRight: "none",
            marginBottom: "0.2rem",
            color: "#ff5a00",
            // padding:"0.5rem ",
          }}
        />
      </form>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-0">
        {kitchensSearch.map((kitchen) => {
          return (
            <div className="m-3" key={kitchen._id}>
              <CardComponent kitchen={kitchen} />
            </div>
          );
        })}
      </div>
    </>
  );
}
