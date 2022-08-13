import React from 'react'
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axiosInstance from '../../Network/Config';
import CardComponent from '../Card/Card';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kitchensSearch, setKitchensSearch] = useState([]);
  useEffect(() => {
    if (searchTerm) {
        axiosInstance.get(`/kitchenSearch/${searchTerm}`)
        .then((res) => {
          setKitchensSearch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{setKitchensSearch([])}
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
      onSubmit={handleOneSubmit}
      style={{
        // margin: "8.6rem auto",
        marginBottom: "0.6rem",
        textAlign: "center",
        position: "sticky",
      }}
    >
      <AiOutlineSearch
        fontSize={43.3}
        style={{
          // border: "1.5px solid brown",
          borderRight: "none",
          marginBottom: "0.2rem",
          // padding:"0.5rem ",

        }}
      />
      <input
        style={{
          color: "black",
          width: "35%",
          padding:"0.5rem ",
          border: "none",
          borderLeft: "none",
          backgroundColor: "#ff5a00",
          borderRadius:"1rem"
        }}
        role="combobox"
        placeholder="Search..."
        className=""
        type="search"
          value={searchTerm}
          onChange={hanldeOnChange}
      />
    </form>
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-0">
      {kitchensSearch.map((kitchen) => {
        return (
          <div className="col" key={kitchen._id}>
            <CardComponent  kitchen={kitchen}/>
          </div>
        );
      })}
    </div>
  </>
  )
}
