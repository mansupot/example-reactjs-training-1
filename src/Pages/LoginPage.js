import React, { Component } from "react";
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMain: false,
      txtEmail: "admin",
      txtPassword: "1234"
    };
  }
  login() {
    axios
      .post("http://128.199.70.49:8080/post/login", {
        username: this.state.txtEmail,
        password: btoa(this.state.txtPassword)
      })
      .then(res => {
        console.log(res.data);
        if (!res.data[0]) {
          alert("กรุณากรอกข้อมูลใหม่อีกครั้ง");
        } else {
          this.setState({ redirectToMain: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.redirectToMain) {
      return <Redirect push to="/main" />;
    }
    return (
      <div
        style={{ marginLeft: "30%", marginRight: "30%", marginTop: "100px" }}
      >
        <Card>
          <CardHeader>Login Form</CardHeader>
          <CardBody>
            <FormGroup row>
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  type="email"
                  name="txtEmail"
                  placeholder="Email"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtEmail}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Password</Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="txtPassword"
                  placeholder="Password "
                  onChange={event => this.onChange(event)}
                  value={this.state.txtPassword}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={{ size: 10, offset: 3 }}>
                <Button color="success" onClick={() => this.login()}>
                  Login to site
                </Button>{" "}
                <Link to="/register">
                  <Button color="warning">Register</Button>
                </Link>
              </Col>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default LoginPage;
