import React from "react";
function CardComponent(props) {
  return (
    <>
      <div className="card h-100 w-100">
        <img src={props.item.itemImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.item.itemName}</h5>
          <p className="card-text">{props.item.itemDescription}</p>
        </div>
      </div>
    </>
  );
}
export default CardComponent;
