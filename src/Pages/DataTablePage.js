import React from "react";
import {
  Navbar,
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
  Label,
  Button,
  FormGroup,
  Col,
  Input
} from "reactstrap";
import Modal from "react-responsive-modal";
import axios from "axios";

class DataTablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dataAllStudent: [],
      txtStudentID: "",
      txtStudentTitle: "",
      txtStudentName: "",
      txtEduLevel: "",
      txtStudentYear: "",
      txtDepartmentID: ""
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    //ดึงข้อมูลนักเรียนทุกคนมาแสดงบนตาราง
    axios
      .get("http://128.199.70.49:5000/get/student")
      .then(res => {
        this.setState({ dataAllStudent: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  showEdit(el) {
    this.setState({
      txtStudentID: el.student_id,
      txtStudentName: el.student_name,
      txtEduLevel: el.edu_level,
      txtStudentYear: el.student_year,
      txtDepartmentID: el.department_id
    });
  }
  handleEdit() {
    axios
      .post("http://128.199.70.49:5000/post/student/edit", {
        student_title: this.state.txtStudentTitle,
        student_name: this.state.txtStudentName,
        edu_level: this.state.txtEduLevel,
        student_year: this.state.txtStudentYear,
        department_id: this.state.txtDepartmentID,
        student_id: this.state.txtStudentID
      })
      .then(res => {
        this.onCloseModal();
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleInsert() {
    axios
      .post("http://128.199.70.49:5000/post/student/add", {
        student_title: this.state.txtStudentTitle,
        student_name: this.state.txtStudentName,
        edu_level: this.state.txtEduLevel,
        student_year: this.state.txtStudentYear,
        department_id: this.state.txtDepartmentID
      })
      .then(res => {
        this.onCloseModal();
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDelete(el) {
    axios
      .post("http://128.199.70.49:5000/post/student/delete", {
        student_id: el.student_id
      })
      .then(res => {
        this.onCloseModal();
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { open } = this.state;
    // console.log("DATA FROM API => ", this.state.dataAllStudent);
    return (
      <div>
        {/* -------------------------------Begin-Modal------------------------------------- */}
        <div styles={{ textAlign: "center" }}>
          <Modal
            open={open}
            onClose={this.onCloseModal}
            styles={{
              modal: {
                maxWidth: "600px",
                width: "100%"
              }
            }}
          >
            <h2>แก้ไขข้อมูล</h2>
            <FormGroup row>
              <Label sm={3}>รหัสนักศึกษา</Label>
              <Col sm={3}>
                <Input
                  type="text"
                  size="sm"
                  name="txtStudentID"
                  disabled
                  value={this.state.txtStudentID}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>คำนำหน้า</Label>
              <Col sm={3}>
                <Input
                  type="text"
                  size="sm"
                  name="txtStudentTitle"
                  placeholder="คำนำหน้า"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtStudentTitle}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>ชื่อ-สกุล</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  size="sm"
                  name="txtStudentName"
                  placeholder="กรอกชื่อ-นามสกุล นักเรียนใหม่"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtStudentName}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>ระดับชั้น / ปีที่</Label>
              <Col sm={3}>
                <Input
                  type="select"
                  size="sm"
                  name="txtEduLevel"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtEduLevel}
                >
                  <option value="">เลือกระดับชั้น</option>
                  <option value="ปวช">ปวช</option>
                  <option value="ปวส">ปวส</option>
                </Input>
              </Col>
              <Col sm={2}>
                <Input
                  type="select"
                  size="sm"
                  name="txtStudentYear"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtStudentYear}
                >
                  <option value="">เลือกปี</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>แผนกวิชา</Label>
              <Col sm={9}>
                <Input
                  type="select"
                  size="sm"
                  name="txtDepartmentID"
                  onChange={event => this.onChange(event)}
                  value={this.state.txtDepartmentID}
                >
                  <option value="2">ช่างกลโรงงาน</option>
                  <option value="3">ช่างไฟฟ้าและอิเล็กทรอนิกส์</option>
                  <option value="1">คอมพิวเตอร์ธุรกิจ</option>
                  <option value="4">การบัญชี</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={3} />
              <Col sm={9}>
                <Button color="success" onClick={() => this.handleEdit()}>
                  บันทึกข้อมูล
                </Button>{" "}
              </Col>
            </FormGroup>
          </Modal>
        </div>
        {/* -------------------------------End-Modal---------------------------------------- */}
        <Navbar style={{ backgroundColor: "orange", fontSize: "20px" }}>
          <Label>ระบบบันทึกข้อมูลนักเรียน วิทยาลัยเทคโนโลยีแห่งหนึ่ง</Label>
        </Navbar>
        <div style={{ marginTop: "20px" }} />
        <Container>
          <Card>
            <CardHeader style={{ backgroundColor: "#333333", color: "orange" }}>
              ลงทะเบียนนักเรียนใหม่
            </CardHeader>
            <CardBody style={{ backgroundColor: "#BEBEBE" }}>
              <FormGroup row>
                <Label sm={2}>คำนำหน้า</Label>
                <Col sm={2}>
                  <Input
                    type="text"
                    size="sm"
                    name="txtStudentTitle"
                    placeholder="คำนำหน้า"
                    onChange={event => this.onChange(event)}
                    value={this.state.txtStudentTitle}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ชื่อ-สกุล</Label>
                <Col sm={5}>
                  <Input
                    type="text"
                    size="sm"
                    name="txtStudentName"
                    placeholder="กรอกชื่อ-นามสกุล นักเรียนใหม่"
                    onChange={event => this.onChange(event)}
                    value={this.state.txtStudentName}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ระดับชั้น / ปีที่</Label>
                <Col sm={2}>
                  <Input
                    type="select"
                    size="sm"
                    name="txtEduLevel"
                    onChange={event => this.onChange(event)}
                    value={this.state.txtEduLevel}
                  >
                    <option value="">เลือกระดับชั้น</option>
                    <option value="ปวช">ปวช.</option>
                    <option value="ปวส">ปวส.</option>
                  </Input>
                </Col>
                <Col sm={1}>
                  <Input
                    type="select"
                    size="sm"
                    name="txtStudentYear"
                    onChange={event => this.onChange(event)}
                    value={this.state.txtStudentYear}
                  >
                    <option value="">ปี</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>แผนกวิชา</Label>
                <Col sm={4}>
                  <Input
                    type="select"
                    size="sm"
                    name="txtDepartmentID"
                    onChange={event => this.onChange(event)}
                    value={this.state.txtDepartmentID}
                  >
                    <option value="">เลือกแผนก</option>
                    <option value="2">ช่างกลโรงงาน</option>
                    <option value="3">ช่างไฟฟ้าและอิเล็กทรอนิกส์</option>
                    <option value="1">คอมพิวเตอร์ธุรกิจ</option>
                    <option value="4">การบัญชี</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={2} />
                <Col sm={10}>
                  <Button color="success" onClick={() => this.handleInsert()}>
                    บันทึกนักเรียนใหม่
                  </Button>{" "}
                  <Button color="danger">ล้างข้อมูล</Button>
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
          <div style={{ marginTop: "20px" }} />
          <Card style={{ marginBottom: "20px" }}>
            <CardHeader style={{ backgroundColor: "#333333", color: "orange" }}>
              รายชื่อนักเรียนทั้งหมด
            </CardHeader>
            <CardBody
              style={{
                overflow: "auto",
                height: "600px",
                backgroundColor: "#BEBEBE"
              }}
            >
              <Table striped dark>
                <thead>
                  <tr>
                    <th>รหัสนักเรียน</th>
                    <th>ชื่อ-สกุล</th>
                    <th>ระดับชั้น</th>
                    <th>แผนกวิชา</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataAllStudent.map((el, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{el.student_id}</th>
                        <td>{el.student_title + " " + el.student_name}</td>
                        <td>{el.edu_level + " " + el.student_year}</td>
                        <td>{el.department_name}</td>
                        <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() => {
                              this.showEdit(el);
                              this.onOpenModal();
                            }}
                          >
                            แก้ไข
                          </Button>{" "}
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              this.handleDelete(el);
                            }}
                          >
                            ลบ
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default DataTablePage;
