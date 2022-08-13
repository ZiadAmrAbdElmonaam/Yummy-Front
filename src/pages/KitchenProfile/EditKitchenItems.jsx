import React, { useEffect, useState } from "react";
import "./editkitchenitem.css";
import {
  AiFillPlusCircle,
  AiFillCloseSquare,
  AiFillEdit,
} from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import axiosInstance from "../../Network/Config";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {DeleteFlagThunk} from "../../Store/Actions/DeleteFlag";

function EditKitchenItems(props) {
  const dispatch = useDispatch();
  let deleteFlag = useSelector((state) => state.deleteFlag.deleteflag);

  // console.log("flag>>>>",deleteFlag);
  const params = useParams();
  const [edit, setShow] = useState(false);
  const [deleteitem, setDeleteItem] = useState(true);
 
  const [menuitems, setmenuitems] = useState({
    menuItems: Number(props.item._id),
  });

  const [kitchenItemEdit, setKitchenItemEdit] = useState({
    itemName: props.item.itemName,
    itemStatus: props.item.itemStatus,
    itemDescription: props.item.itemDescription,
    itemPrice: props.item.itemPrice,
    itemImage: props.item.itemImage,
    // kitchenId: params.kitchenId,
    itemId: props.item._id,
  });

  const handleKitchenItemChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setKitchenItemEdit({
      ...kitchenItemEdit,
      [name]: value,
    });
    console.log(kitchenItemEdit);
  };
  const HandelSubmit = (event) => {
    event.preventDefault();
    // console.log(props.item._id);
    setShow(false);

    axiosInstance
      .put(`/menuItem/${props.item._id}/${params.kitchenId}`, kitchenItemEdit)
      .then((res) => {
        return res;
      })
      .then((data) => {
        setKitchenItemEdit({
          ...kitchenItemEdit,
          [event.target.name]: event.target.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteItem = (event) => {
    axiosInstance
      .delete(`/menuItem/${props.item._id}/${params.kitchenId}`)
      .then((res) => {
        // console.log("first res", res.data);
        if (deleteFlag) {
          dispatch(DeleteFlagThunk(false))
        } else {
          dispatch(DeleteFlagThunk(true))
        }
        return res;
      });
    axiosInstance
      .delete(`/menu/item/${params.kitchenId}/${props.item._id}`)
      .then((res) => {
        // console.log("sec res", res.data);
        if (deleteFlag) {
          dispatch(DeleteFlagThunk(false))
        } else {
          dispatch(DeleteFlagThunk(true))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="row">
        <p className="icons-container">
          <button className="btn">
            <AiFillEdit
              hidden={edit ? true : false}
              onClick={() => {
                setShow(true);
              }}
              className="icon text-success"
              size="27"
            />
          </button>{" "}
          <span>
            <button
              onClick={(event) => {
                deleteItem(event);
              }}
              id={kitchenItemEdit.itemId}
              className="btn"
            >
              <AiFillCloseSquare
                className="icon text-danger"
                hidden={edit ? true : false}
                size="27"
              />
            </button>
          </span>
        </p>
        {edit ? (
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1"> Item Name</label>
              <input
                type="text"
                className="form-control  "
                //  id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={kitchenItemEdit.itemName}
                name="itemName"
                onChange={(e) => handleKitchenItemChange(e)}
                id={props.item._id}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Item Description</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={kitchenItemEdit.itemDescription}
                name="itemDescription"
                onChange={(e) => handleKitchenItemChange(e)}
              />
            </div>
            <div className="form-group">
              <div>{"  "}</div>
              <label htmlFor="exampleInputPassword1">Item Price</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={kitchenItemEdit.itemPrice}
                name="itemPrice"
                onChange={(e) => handleKitchenItemChange(e)}
              />
            </div>
            <label htmlFor="exampleInputPassword1">Item Status</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={kitchenItemEdit.itemStatus}
              name="itemStatus"
              onChange={(e) => handleKitchenItemChange(e)}
            >
              <option selected disabled>
                itemStatus
              </option>
              <option value="available">available</option>
              <option value="not available">not available</option>
            </select>
            <br />{" "}
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
            ></input>
            <br />
            <br />
            <button
              type="submit"
              onClick={(e) => {
                HandelSubmit(e);
              }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        ) : (
          ""
        )}
        <div className="col-md-10 item-body">
          <h5 className="card-title">
            {kitchenItemEdit.itemName}{" "}
            <span
              className={
                kitchenItemEdit.itemStatus === "not avilable"
                  ? "text-danger"
                  : "text-success"
              }
            >
              {kitchenItemEdit.itemStatus}
            </span>
          </h5>
          <p className="text-muted mb-5">{kitchenItemEdit.itemDescription}</p>

          <p
            className=" mt-5 item-pricee"
            id={props.item._id}
            //  onClick={() => {
            //    addToCard(props.item);
            //  }}
          >
            {kitchenItemEdit.itemPrice} EGP
          </p>
        </div>
        <div className="col-md-2">
          <img
            src={kitchenItemEdit.itemImage}
            className="card-img-top cardImg"
            alt="..."
          />
        </div>
      </div>
    </>
  );
}
export default EditKitchenItems;
