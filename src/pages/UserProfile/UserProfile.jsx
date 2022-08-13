import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../Network/Config";
import { Params, useParams } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import "./UserStyle.css";
import CurrentOrders from "../../components/UserProfile/CurrentOrders";
import UpdateUser from "../../components/UserProfile/UpdateUser";
import HistoryOrders from "../../components/UserProfile/HistoryOrders";
import { FlagThunk } from "../../Store/Actions/Flag";
import { useSelector } from "react-redux";
export default function UserProfile() {
  const [user, setUser] = useState({});
  let [isload, setIsLoad] = useState(true);
  let [isEdit, setIsEdit] = useState(false);
  let [isOrder, setIsOrder] = useState(true);
  let [isHistoryOrder, setIsHitoryOrder] = useState(false);
  const params = useParams();
  let flag = useSelector((state) => state.flag.flag);
  useEffect(() => {
    axiosInstance
      .get(`/user/${params.id}`)
      .then((res) => {
        setUser(res.data);

        setIsLoad(false);
        // setKitchenEdit(res.data);
        // console.log("res>>>", res.data);
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  }, [isEdit, flag]);
  // console.log("user  ", user);
  function showEdit() {
    setIsOrder(false);
    setIsHitoryOrder(false);
    setIsEdit(true);
    // console.log("clicked");
  }
  function showOrders() {
    setIsEdit(false);
    setIsHitoryOrder(false);
    setIsOrder(true);
  }
  function showHistoryOrders() {
    setIsEdit(false);
    setIsOrder(false);
    setIsHitoryOrder(true);
  }

  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <div className="user-profile">
          <div className="row g-0">
            <div className="col-md-2">
              {/* side bar */}
              <button
                className="btn sub-btn up-btn toggle-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight1"
                aria-controls="offcanvasRight"
              >
                <AiOutlineMenuUnfold />
              </button>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasRight1"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-body body-user">
                  <div className="side-bar">
                    <div className="side-bar-top p-5">
                      <button
                        type="button"
                        className="btn sub-btn up-btn exit"
                        data-bs-dismiss="offcanvas"
                      >
                        <AiOutlineMenuFold />
                      </button>
                      <img
                        src="http://localhost:8080/avatars/images/nagar.png"
                        alt="userImg"
                        className="img-responsive my-3"
                      />
                      <div className="student-info">
                        <h1>{user.userFullName}</h1>
                        <h3>{user.userEmail}</h3>
                        <h3>{user.userPhone}</h3>
                      </div>
                    </div>
                    <div className="side-bar-bottom pb-5">
                      <ul className="ul-group profile-list">
                        <li className="element my-1">
                          <button onClick={showEdit}>Edit Profile</button>
                        </li>
                        <li className="element my-1">
                          <button onClick={showOrders}>
                            My Current Orders
                          </button>
                        </li>
                        <li className="element my-1">
                          <button onClick={showHistoryOrders}>
                            My Old Orders
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className="profileData">
                {/* <h1>data here</h1> */}
                {isEdit ? (
                  <div>
                    <UpdateUser userObj={user} />
                  </div>
                ) : (
                  ""
                )}
                {/* end of edit profile */}
                {/* current Order */}
                {isOrder ? <CurrentOrders userData={user} /> : ""}
                {/* history order */}
                {isHistoryOrder ? <HistoryOrders userData={user} /> : ""}
                {/* toggle */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
