import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../Network/Config";
import "./kitchenProfile.css";
import { AiFillPlusCircle, AiOutlineRollback } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { SiOneplus } from "react-icons/si";

export default function AddKitchenItem() {
  const history = useHistory();
  const params = useParams();
  const [kitchen, setKitchen] = useState({});
  const [kitchenMenu, setKitchenMenu] = useState();
  const [showItem, setShowItem] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [showbutton, setShowbutton] = useState(false);
  const [menu, setMenu] = useState({
    kitchen: Number(params.kitchenId),
    menuItems: 0,
  });
  const [menuUpdate, setMenuUpdate] = useState({ menuItems: [] });
  // let [isload, setIsLoad] = useState(true);
  const [item, setItem] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
    itemCatogery: "",
    itemStatus: "",
    kitchenId: params.kitchenId,
  });
  const handleKitchenChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type == "file") {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
      // console.log(selectedFile);
    } else {
      setItem({
        ...item,
        [name]: value,
      });
    }
  };
  // console.log(params.kitchenId);
  useEffect(() => {
    axiosInstance
      .get(`/kitchen/${params.kitchenId}`)
      .then((res) => {
        setKitchen(res.data);
        // setIsLoad(false);
      })
      .catch((err) => {
        // setIsLoad(false);
        console.log(err);
      });
  }, [showbutton]);
  async function handleItemSubmit(event) {
    event.preventDefault();
    // console.log(kitchen.menuId === null);
    let itemData;
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("itemName", item.itemName);
    formData.append("itemDescription", item.itemDescription);
    formData.append("itemPrice", item.itemPrice);
    formData.append("itemCatogery", item.itemCatogery);
    formData.append("itemStatus", item.itemStatus);
    formData.append("kitchenId", item.kitchenId);

    try {
      const res = await axiosInstance.post("/item", formData);
      // console.log("res", res.data.data);
      itemData = res.data.data;
      setItem(itemData);
      setMenu({
        ...menu,
        menuItems: itemData._id,
      });
      setShowItem(true);
      setMenuUpdate({ menuItems: [itemData._id] });
    } catch (error) {
      console.log(error);
    }

    // console.log("set item", item);
    // console.log("set menu", menu);
  }
  async function addItemToMenu() {
    if (kitchen.menuId === null) {
      try {
        const res = await axiosInstance.post("/menu", menu);
        setKitchenMenu({ menuId: res.data.data._id });
        setShowbutton(true);
        // console.log("res menu", res.data.data);
        // setShowItem(false)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axiosInstance.put(
          `/menu/${params.kitchenId}`,
          menuUpdate
        );
        // setKitchenMenu({ menuId: res.data.data._id });
        // console.log("res menu", res.data.data);
        setShowItem(false);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log("menu", menu);
  }
  async function updateKitchen() {
    try {
      const res = await axiosInstance.put(
        `/kitchen/${params.kitchenId}`,
        kitchenMenu
      );
      setShowItem(false);
      setShowbutton(false);
      // console.log("kitchen res", res.data);
    } catch (error) {
      console.log(error);
    }
  }
  function backToProfile() {
    history.push(`/kitchen/${params.kitchenId}`);
  }
  return (
    <div className="addItems">
      <button
        className="btn"
        onClick={() => {
          backToProfile();
        }}
        type="button"
      >
        <BiExit size="30" className="text-danger" />
      </button>
      <h2 className="text-center head">Add New Dish To Your Menu</h2>
      <div className="container">
        <div className="itemForm">
          <form
            onSubmit={(event) => {
              handleItemSubmit(event);
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputItem" className="form-label">
                Item Name :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputItem"
                placeholder="Item name"
                value={item.itemName}
                name="itemName"
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputCategory" className="form-label">
                Category :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputCategory"
                placeholder="Item category in one word is prefered"
                value={item.itemCatogery}
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
                name="itemCatogery"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDescrip" className="form-label">
                Description :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputDescrip"
                placeholder="Descripe your item ingredients"
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
                value={item.itemDescription}
                name="itemDescription"
              />
            </div>
            <div className="mb-3 price">
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
                name="itemStatus"
                value={item.itemStatus}
              >
                <option value=""> Select item status</option>
                <option value="avilable">avilable</option>
                <option value="not avilable">not avilable</option>
              </select>
              <label htmlFor="exampleInputPrice" className="form-label">
                Price :
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPrice"
                placeholder="Price in EGP"
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
                name="itemPrice"
                value={item.itemPrice}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="exampleInputImage" className="form-label">
                item image :
              </label>
              <input
                type="file"
                className="form-control"
                id="exampleInputImage"
                onChange={(e) => {
                  handleKitchenChange(e);
                }}
                name="itemImage"
              />
            </div>
            <div className="addItem">
              <button
                type="submit"
                className="btn "
                disabled={showItem ? true : false}
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
        {showItem ? (
          <div className="newItem">
            <div className="row">
              <div className="col-md-6">
                <h5 className="card-title">
                  {item.itemName}{" "}
                  <span className="text-muted status">{item.itemStatus}</span>
                </h5>
                <p className="text-muted mb-5">{item.itemDescription}</p>

                <p className=" mt-5 item-price" id={item._id}>
                  {item.itemPrice} EGP
                </p>
              </div>
              <div className="col-md-4">
                {!showbutton ? (
                  <button onClick={() => addItemToMenu()} className="btn">
                    <SiOneplus size="27" className="text-success" />
                  </button>
                ) : (
                  <>
                    {kitchen.menuId === null ? (
                      <button
                        onClick={() => {
                          updateKitchen();
                        }}
                        className="btn saveMenu"
                      >
                        {" "}
                        Add First Item
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              <div className="col-md-2">
                <img
                  src={item.itemImage}
                  className="card-img-top cardImg"
                  alt="..."
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
