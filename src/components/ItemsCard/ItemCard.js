import React from "react";
import { Link } from "react-router-dom";
import { IoIosTrash } from "react-icons/io";
import "./itemcard.css"
import { useDispatch, useSelector } from "react-redux";
import {RemoveItemThunk} from "./../../Store/Actions/RemoveItem"
// import "./Card.css";
// import "../../../../Yummy-Graduation/avatars/images/"

function ItemCardComponent(props) {
  console.log("param is ===>", props)

  let dispatch = useDispatch()


function removeItem(itemId) {
    console.log(itemId)
   

  dispatch(RemoveItemThunk(itemId ))


}



  return (
    <>
      <div className="card h-50 w-100">
        {/* <img
          src={props.item.itemImage}
          className="card-img-top responsive-img"
          alt="..."
        />
        <hr /> */}
        <div className="card-body carddata">
          <p className="card-title"> Item-Name : {props.item.itemName}</p>
          <p className="card-text"> Item-Description : {props.item.itemDescription}</p>
          <p className="card-text"> Item-Price : {props.item.itemPrice}</p>
          <IoIosTrash className="removeIcon" onClick={   () => removeItem({id:props.item._id})   }/>


          {/* <Link className="btn btn-primary" to={`/kitchendetails/${props.kitchen._id}/${props.param.userid}`}> 
         
            go to details
          </Link> */}
        </div>
      </div>
    </>
  );
}
export default ItemCardComponent;