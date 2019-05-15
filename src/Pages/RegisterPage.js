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
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  render() {
    return (
      <div
        style={{ marginLeft: "30%", marginRight: "30%", marginTop: "100px" }}
      >
        <Card>
          <CardHeader>Register Form</CardHeader>
          <CardBody>
            <FormGroup row>
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  type="email"
                  name="txtEmail"
                  placeholder="กรุณากรอก Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Password</Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="txtPassword"
                  placeholder="กรุณากรอกรหัสผ่าน "
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Name</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="txtName"
                  placeholder="กรุณากรอกชื่อ-สกุล"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Tel.</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="txtTel"
                  placeholder="กรุณากรอกเบอร์โทร"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 3 }}>
                <Link to="/login">
                  <Button color="warning">Register Success</Button>
                </Link>
              </Col>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default RegisterPage;
