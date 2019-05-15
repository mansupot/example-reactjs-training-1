import React, { Component } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="card">
          <div className="card-header" align="center">
            <img src={logo} width="500px" alt="" />
          </div>
          <div className="card-body" align="center">
            <h1>Welcome to my site</h1>
            <Link to="/login">
              <button type="button" className="btn btn-primary">
                Enter Site
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Welcome;
