import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container pb-3">
        <div className="row ">
          <div className="col-md-2 col-sm-4 col-12 footer-element">
            <img
              src="http://localhost:8080/avatars/images/yummy.jpeg"
              alt="logo"
            />
          </div>
          <div className="col-md-2 col-sm-4 col-6 footer-element">
            <div>
              <h1>Yummy</h1>
            </div>
            <div>
              <a href="#">
                <h3>About</h3>
              </a>
              <a href="#">
                <h3>History</h3>
              </a>
              <a href="#">
                <h3>Registration</h3>
              </a>
              <a href="#">
                <h3>Terms of apply</h3>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 footer-element">
            <div>
              <h1>Kitchens</h1>
            </div>
            <div>
              <a href="#">
                <h3>vegetarian</h3>
              </a>
              <a href="#">
                <h3>non-vegetarian</h3>
              </a>
              <a href="#">
                <h3>frozen</h3>
              </a>
              <a href="#">
                <h3>all</h3>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 footer-element ">
            <div>
              <h1>Join us</h1>
            </div>
            <div>
              <a href="#">
                <h3>Pilot</h3>
              </a>
              <a href="#">
                <h3>Kitchen</h3>
              </a>
              <a href="#">
                <h3>User</h3>
              </a>
              <a href="#">
                <h3>Gest</h3>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 footer-element footer-contact-us">
            <div>
              <h1>Contact us</h1>
            </div>
            <div>
              <a href="#" className="yummy-info">
                <h3> iti@Yummy.com</h3>
              </a>
            </div>
            <div className="footer-info">
              <h6>Building 10</h6>
              <h6>Belbeis </h6>
              <h6>El Zagazig, El Sharkya</h6>
              <h6>Egypt</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-12 footer-element text-center">
            <div>
              <h1>Follow us</h1>
              {/* <fa-icon [icon]="faFacebook"></fa-icon>
                    <fa-icon [icon]="faYahoo"></fa-icon>
                    <fa-icon [icon]="faSkype"></fa-icon>
                    <fa-icon [icon]="faInstagram"></fa-icon> */}
            </div>
          </div>
        </div>
        {/* <!-- end of row --> */}
      </div>
      <div className="copy-right">
        <div className="yummy-pages">
          <a href="#">Kitchen </a>
          <a href="#">Orders </a>
          <a href="#">Sign UP </a>
          <a href="#">Sign In </a>
          <a href="#">Cart</a>
        </div>
        <p>© 2022 Yummy</p>
      </div>
    </footer>
  );
}
