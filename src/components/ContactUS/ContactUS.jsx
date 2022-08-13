import React from "react";
import "./ContactUs.css";
export default function ContactUS() {
  return (
    <div className="contact-us">
      <div className="contact-top p-5">
        <div className="top">
          <h1>CONTACT US</h1>
          <p>
            Yummy ABOUT US Yummy is Online food ordering application, considered
            as an increasingly used application in homemade food management.
            Just a few years ago, people used to spend times to go restaurants
            junky food .
          </p>
        </div>
      </div>
      <div className="contact-bottom pb-5">
        <div className="head p-5">
          <h1>CONTACT YUMMY</h1>
        </div>
        <div className="container">
          <form name="contact-us" className="pt-1 pb-5">
            <div className="row form-group">
              <div className="col-md-6 form-element">
                <input
                  type="text"
                  name="first name"
                  placeholder="First name"
                  className="form-input"
                />
              </div>
              <div className="col-md-6 form-element">
                <input
                  type="text"
                  name="last name"
                  placeholder="Last name"
                  className="form-input"
                />
              </div>
              <div className="col-md-6 form-element">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                />
              </div>
              <div className="col-md-6 form-element">
                <input
                  type="text"
                  name="phone number"
                  placeholder="phone number"
                  className="form-input"
                />
              </div>
              <div className="col-md-12 form-element">
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  className="form-textarea"
                ></textarea>
              </div>
              <div className="col-md-12 form-element contain-btn mt-5">
                <button className="form-btn">send message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
