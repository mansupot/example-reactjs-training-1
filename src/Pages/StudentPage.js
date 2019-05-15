// 1.เปิด ส่วน Import Library เข้ามาใช้งาน
import React from "react";
import {
  Button,
  Navbar,
  Label,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Col,
  Input,
  Table
} from "reactstrap";
import axios from "axios";
import Modal from "react-responsive-modal";
// ปิด ส่วน Import Library เข้ามาใช้งาน

class StudentPage extends React.Component {
  // 2. Open Class
  // (Life Cycle)function Constructor คือ ฟังชั่นสำหรับการ initial ตัวแปร
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dataStudent: [],
      txtStudentTitle: "นาย",
      txtStudentName: "",
      txtEduLevel: "",
      txtStudentYear: "",
      txtDepartmentID: ""
    };
  }
  // ปิด function Constructor คือ ฟังชั่นสำหรับการ initial ตัวแปร

  // function (Life Cycle) ComponentDidMount คือ ฟังชั่นสำหรับการเชื่อมต่อ API
  componentDidMount() {
    setInterval(() => {
      axios
        .get("http://128.199.70.49:5000/get/student")
        .then(respond => {
          // console.log("GET FROM API => ", respond.data);
          this.setState({ dataStudent: respond.data });
        })
        .catch(error => {
          console.log("ERROR => ", error);
        });
    }, 3000);
  }
  // ปิด function ComponentDidMount คือ ฟังชั่นสำหรับการเชื่อมต่อ API

  // function onChange คือ ฟังชั่นสำหรับเซ็ตค่าตัวแปรสำหรับ input
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // ปิด function onChange คือ ฟังชั่นสำหรับเซ็ตค่าตัวแปรสำหรับ input

  // function handleInsert คือ ฟังชั่นสำหรับ INSERT ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API
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
        this.componentDidMount();
        this.handleClear();
      })
      .catch(err => {
        console.log(err);
      });
  }
  // ปิด function handleInsert คือ ฟังชั่นสำหรับ INSERT ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API

  // function handleClear คือ ฟังชั่นสำหรับเคลียร์ข้อมูลปัจจุบันใน Input
  handleClear() {
    this.setState({
      txtStudentID: "",
      txtStudentTitle: "นาย",
      txtStudentName: "",
      txtEduLevel: "",
      txtStudentYear: "",
      txtDepartmentID: ""
    });
  }
  // ปิด function handleClear คือ ฟังชั่นสำหรับเคลียร์ข้อมูลปัจจุบันใน Input

  // function onOpenModal and onCloseModal คือ ฟังชั่นสำหรับเปิดและปิด Modal
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  // ปิด function onOpenModal and onCloseModal คือ ฟังชั่นสำหรับเปิดและปิด Modal

  // function showEdit คือ ฟังชั่นสำหรับแสดงข้อมูลเก่าก่อนแก้ไข
  showEdit(el) {
    this.setState({
      txtStudentID: el.student_id,
      txtStudentTitle: el.student_title,
      txtStudentName: el.student_name,
      txtEduLevel: el.edu_level,
      txtStudentYear: el.student_year,
      txtDepartmentID: el.department_id
    });
  }
  //ปิด function showEdit คือ ฟังชั่นสำหรับแสดงข้อมูลเก่าก่อนแก้ไข

  // function handleEdit คือ ฟังชั่นสำหรับ UPDATE ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API
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
        this.handleClear();
        this.onCloseModal();
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  //ปิด function handleEdit คือ ฟังชั่นสำหรับ UPDATE ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API

  // function handleDelete คือ ฟังชั่นสำหรับ DELETE ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API
  hadleDelete(el) {
    axios
      .post("http://128.199.70.49:5000/post/student/delete", {
        student_id: el.student_id
      })
      .then(res => {
        alert(res.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  //ปิด function handleEdit คือ ฟังชั่นสำหรับ UPDATE ข้อมูลไปยัง เซิฟเวอร์ ผ่าน API

  //(Life Cycle) function render คือ ฟังชั่นสำหรับ render User Interface ออกสู่หน้าตาให้ผู้ใช้เห็น
  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.onCloseModal}
          center
          styles={{ modal: { maxWidth: "600px", width: "100%" } }}
        >
          <h2>Edit Form</h2>
          {/* ตัวอย่าง Form group สำหรับป้อนข้อมูล 1 ช่อง */}
          <FormGroup row>
            <Label sm={3}>รหัสนักศึกษา</Label>
            <Col sm={4}>
              <Input
                type="text"
                value={this.state.txtStudentID}
                disabled={true}
              />
            </Col>
          </FormGroup>
          {/* ปิด ตัวอย่าง Form group สำหรับป้อนข้อมูล 1 ช่อง */}

          <FormGroup row>
            <Label sm={3}>คำนำหน้า</Label>
            <Col sm={4}>
              <Input
                type="text"
                name="txtStudentTitle"
                onChange={event => {
                  this.onChange(event);
                }}
                value={this.state.txtStudentTitle}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>ชื่อนักเรียน</Label>
            <Col sm={5}>
              <Input
                type="text"
                name="txtStudentName"
                onChange={event => {
                  this.onChange(event);
                }}
                value={this.state.txtStudentName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>ระดับชั้น / ปีที่</Label>
            <Col sm={5}>
              <Input
                type="select"
                name="txtEduLevel"
                onChange={event => {
                  this.onChange(event);
                }}
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
                name="txtStudentYear"
                onChange={event => {
                  this.onChange(event);
                }}
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
            <Col sm={3}>
              <Input
                type="select"
                name="txtDepartmentID"
                onChange={event => {
                  this.onChange(event);
                }}
                value={this.state.txtDepartmentID}
              >
                <option value="">เลือกแผนกวิชา</option>
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
              <Button
                color="success"
                onClick={() => this.handleEdit()} //ตัวอย่างสำหรับการใช้ Event onClick เพื่อเรียกใช้ฟังชั่น
              >
                บันทึกข้อมูล
              </Button>
            </Col>
          </FormGroup>
        </Modal>
        <Navbar style={{ backgroundColor: "orange" }}>
          <Label>ระบบบันทึกข้อมูลนักเรียน</Label>
        </Navbar>
        <Container>
          <Card style={{ marginTop: "20px" }}>
            <CardHeader>ลงทะเบียนนักเรียนใหม่</CardHeader>
            <CardBody>
              <FormGroup row>
                <Label sm={2}>คำนำหน้า</Label>
                <Col sm={2}>
                  <Input
                    type="text"
                    name="txtStudentTitle"
                    onChange={event => {
                      this.onChange(event);
                    }}
                    value={this.state.txtStudentTitle}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ชื่อนักเรียน</Label>
                <Col sm={5}>
                  <Input
                    type="text"
                    name="txtStudentName"
                    onChange={event => {
                      this.onChange(event);
                    }}
                    value={this.state.txtStudentName}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ระดับชั้น / ปีที่</Label>
                <Col sm={2}>
                  <Input
                    type="select"
                    name="txtEduLevel"
                    onChange={event => {
                      this.onChange(event);
                    }}
                    value={this.state.txtEduLevel}
                  >
                    <option value="">เลือกระดับชั้น</option>
                    <option value="ปวช">ปวช</option>
                    <option value="ปวส">ปวส</option>
                  </Input>
                </Col>
                <Col sm={1}>
                  <Input
                    type="select"
                    name="txtStudentYear"
                    onChange={event => {
                      this.onChange(event);
                    }}
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
                <Label sm={2}>แผนกวิชา</Label>
                <Col sm={3}>
                  <Input
                    type="select"
                    name="txtDepartmentID"
                    onChange={event => {
                      this.onChange(event);
                    }}
                    value={this.state.txtDepartmentID}
                  >
                    <option value="">เลือกแผนกวิชา</option>
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
                    บันทึกข้อมูล
                  </Button>{" "}
                  <Button color="danger">ยกเลิก</Button>
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
          <div style={{ marginTop: "60px" }} />
          <Card>
            <CardHeader>รายชื่อนักเรียนทั้งหมด</CardHeader>
            <CardBody>
              <Table dark>
                <thead>
                  <tr>
                    <th>รหัสนักศึกษา</th>
                    <th>ชื่อ-สกุล</th>
                    <th>ชั้นปี</th>
                    <th>แผนกวิชา</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* การวนลูปข้อมูลให้เกิดในรูปแบบตาราง */}
                  {this.state.dataStudent.map((el, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{el.student_id}</th>
                        <td>{el.student_title + " " + el.student_name}</td>
                        <td>{el.edu_level + "." + " " + el.student_year}</td>
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
                            Edit
                          </Button>{" "}
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => this.hadleDelete(el)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* ปิด การวนลูปข้อมูลให้เกิดในรูปแบบตาราง */}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
  // ปิด (Life Cycle) function render คือ ฟังชั่นสำหรับ render User Interface ออกสู่หน้าตาให้ผู้ใช้เห็น
} // Close Class

export default StudentPage; // 3.Export Class
