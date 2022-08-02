import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
// import "../../../../Yummy-Graduation/avatars/images/"

function CardComponent({
  kitchen: { kitchenImage, kitchenName, kitchenStatus, _id },
}) {
  let imgUrl = "../../../../Yummy-Graduation";
  return (
    <>
      <div className="card h-100 w-100">
        {/* <img src="../../../../Yummy-Graduation/avatars/images/1659025147767.jpg" /> */}
        <img
          src={imgUrl + kitchenImage}
          className="card-img-top responsive-img"
          alt="..."
        />
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
