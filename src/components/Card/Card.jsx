import React from "react";
import { Link } from "react-router-dom";
function CardComponent({
  kitchen: { kitchenImage, kitchenName, kitchenStatus, _id },
}) {
  return (
    <>
      <div className="card h-100 w-100">
        <img src={kitchenImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{kitchenName}</h5>
          <p className="card-text">{kitchenStatus}</p>
          <Link className="btn btn-primary" to={`/kitchendetails/${_id}`}>
            go to details
          </Link>
        </div>
      </div>
    </>
  );
}
export default CardComponent;
