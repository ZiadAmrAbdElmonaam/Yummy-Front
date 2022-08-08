import React from "react";
import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Network/Config";

import MovieCard from "./MovieCard";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kitchensSearch, setkitchensSearch] = useState([]);
  useEffect(() => {
    if (searchTerm) {
        axiosInstance
        .get(
          `/home&query=${searchTerm}`
        )
        .then((res) => {
          setkitchensSearch(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTerm]);
  const handleOneSubmit = (e) => {
    e.preventDefault();
  };
  const hanldeOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleOneSubmit}
        style={{
          margin: "8.6rem auto",
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
            color: "white",
            width: "35%",
            padding:"0.5rem ",
            border: "none",
            borderLeft: "none",
            backgroundColor: "black",
            borderRadius:"1rem"
          }}
          role="combobox"
          placeholder="Search..."
          className="text-muted bg-dark"
          type="search"
            value={searchTerm}
            onChange={hanldeOnChange}
        />
      </form>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-0">
        {kitchensSearch.map((kitchen) => {
          return (
            <div className="col" key={kitchen.id}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    </>
  );
}