import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function CardComponent(props) {
  console.log("param is ===>", props.kitchen.menuId);
  console.log("param is ===>", props);
  return (
    <>
      <div className="card h-100 w-100">
        <img
          src={props.kitchen.kitchenImage}
          className="card-img-top responsive-img"
          alt="..."
        />
        <hr />
        <div className="card-body">
          <h5 className="card-title">{props.kitchen.kitchenName}</h5>
          <p className="card-text">{props.kitchen.kitchenStatus}</p>
          <Link
            className="btn btn-primary"
            to={`/kitchendetails/${props.kitchen._id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
}
export default CardComponent;
