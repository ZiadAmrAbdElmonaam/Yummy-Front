import React, { useEffect, useState } from "react";
import "./editkitchenitem.css";
import {
  AiFillPlusCircle,
  AiFillCloseSquare,
  AiFillEdit,
} from "react-icons/ai";
import axiosInstance from "../../Network/Config";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function EditKitchenItems(props) {
  // const { addToCard } = props;
  console.log(props.item);
  // const [item, setKitchen] = useState({});
  const params = useParams();
  // const [item, setItem] = useState([]);
  const [edit, setShow] = useState(false);
  const[deleteitem,setDeleteItem] = useState(true)
  
  const [menuitems,setmenuitems] = useState({

    menuItems:Number( props.item._id)
  })
  // console.log("kitchenid>>>>",kitchenid)
 

  const [kitchenItemEdit, setKitchenItemEdit] = useState({

    itemName: props.item.itemName,
    itemStatus: props.item.itemStatus,
    itemDescription: props.item.itemDescription,
    itemPrice: props.item.itemPrice,
    itemImage: props.item.itemImage,
    kitchenId: params.kitchenId,
    itemId: props.item._id

  });


  // console.log(params)
  // useEffect(() => {
  //   axiosInstance
  //     .get(`/kitchen/${params.kitchenId}`)
  //     .then((res) => {
  //       // setItem(res.data);
  //       // console.log(res.data)
  //       setItem(res.data.menuId.menuItems);
  //       console.log(res.data.menuId.menuItems)
  //       // setKitchenItemEdit({

  //       // });

  //       // console.log("res>>>", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [edit]);
  // console.log(item)
  const history = useHistory()
  // console.log(kitchenItemEdit);


  const handleKitchenItemChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target.name,event.target.value)
    console.log(name, value);
    setKitchenItemEdit({
      ...kitchenItemEdit,
      [name]: value,
    });

    console.log(kitchenItemEdit)




    // }
  };
  // function handleEdit(){
  //   console.log("clicked");
  //   history.push(`/editForm/${params.kitchenId}`)

  // }
  const HandelSubmit = (event) => {
    // console.log(params.kitchenId);
    event.preventDefault();
    console.log(props.item._id)
    setShow(false)

    axiosInstance
      .put(`/menuItem/${props.item._id}`, kitchenItemEdit)
      .then((res) => {
        return res;
      })
      .then((data) => {
        // setKitchenItemEdit(data.data.data)

        setKitchenItemEdit({

          ...kitchenItemEdit,
          [event.target.name]: event.target.value,
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(kitchenItemEdit)
  const deleteItem = (event) => {

    console.log(event.target.id);
    let itemId  = Number(event.target.id)
    let kitcheeenid= Number(params.kitchenId)
    console.log("555555555",kitcheeenid)
console.log(itemId)
    // setShow(false)
    console.log("type item id>>",props.item._id)

    axiosInstance
      .delete(`/menu/item/${kitcheeenid}`,menuitems)
      .then((res) => {
        return res;
      })
      .then((data) => {
        // setKitchenItemEdit(data.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function formshow(e) {
    console.log("event====>", e.target)
    console.log("props====>", props.item._id)

    // setKitchenItemEdit({
    //   ...kitchenItemEdit,
    //   [e.target.name]: e.target.value,
    // });



  }
  console.log(kitchenItemEdit);


  // const deleteitem = (index) => {
  //   console.log(kitchenItemEdit)


  // };

  // function changeToDelivered(e, index) {
  //   // console.log(index);
  //   console.log("clicked");
  //   console.log("type of ", e.target.id);
  //   let orderId = Number(e.target.id);
  //   console.log("state", pilotOnlineOrders);

  //   axiosInstance
  //     .put(`/order/${orderId}`, dileveredStatus)
  //     .then((res) => {
  //       // setOnlineOrder(res.data);
  //       console.log(res.data);
  //       console.log("index in func", index);
  //       deleteOrder(index);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  return (
    <>
      <div className="row">
        <p className="icons-container">
          <span>
            <AiFillEdit hidden={edit ? true : false} onClick={() => { setShow(true) }} className="icon text-success" size="27"   />
          </span>{" "}
          <span>

       <button onClick={(event) => { deleteItem(event) }}  id={kitchenItemEdit.itemId} >
       {/* <AiFillCloseSquare 
       className="icon text-danger" hidden={edit ? true : false} size="27" /> */}
       Delete
        </button> 
          </span>


        </p>
        {edit ? (<form >
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
            <input type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={kitchenItemEdit.itemDescription}
              name="itemDescription"
              onChange={(e) => handleKitchenItemChange(e)}
            />

          </div>
          <div className="form-group"><div>{"  "}</div>
            <label htmlFor="exampleInputPassword1">Item Price</label>
            <input type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={kitchenItemEdit.itemPrice}
              name="itemPrice"
              onChange={(e) => handleKitchenItemChange(e)}
            />
          </div>
          <label htmlFor="exampleInputPassword1">Item Status</label>
          <select class="form-select" aria-label="Default select example"
            value={kitchenItemEdit.itemStatus}
            name="itemStatus"
            onChange={(e) => handleKitchenItemChange(e)}

          >
            <option selected disabled>itemStatus</option>
            <option value="available">available</option>
            <option value="not available">not available</option>
          </select>
          <br /> <input type="file" className="form-control-file" id="exampleFormControlFile1"></input><br /><br />
          <button type="submit" onClick={(e) => { HandelSubmit(e) }} className="btn btn-primary">Submit</button>
        </form>)





          : ""


        }
        <div className="col-md-10 item-body">
          <h5 className="card-title">
            
            {kitchenItemEdit.itemName}{" "}
          
            <span className={
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
