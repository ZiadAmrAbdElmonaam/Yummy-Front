import React, { useState } from "react";
import "./ItemCard.css";
import { AiFillPlusCircle } from "react-icons/ai";
function CardComponent(props) {
  const { addToCard } = props;

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <h5 className="card-title">
            {props.item.itemName}{" "}
            <span className="text-muted status">{props.item.itemStatus}</span>
          </h5>
          <p className="text-muted mb-5">{props.item.itemDescription}</p>

          <p
            className=" mt-5 item-price"
            id={props.item._id}
            onClick={() => {
              addToCard(props.item);
            }}
          >
            <AiFillPlusCircle size="22" /> {props.item.itemPrice} EGP
          </p>
        </div>
        <div className="col-md-2">
          <img
            src={props.item.itemImage}
            className="card-img-top cardImg"
            alt="..."
          />
        </div>
      </div>
    </>
  );
}
export default CardComponent;
