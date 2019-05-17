import React, { Component } from "react";
import axios from "axios";

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uri: "http://localhost:5000/get/photos/" + "profile-1558077271013.jpg"
    };
  }
  // Begin ฟังชั่น เลือกรูป แล้วเก็บไว้ใน state
  selectedImage(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }
  // End ฟังชั่น เลือกรูป แล้วเก็บไว้ใน state

  // Begin ฟังชั่น Upload รูปผ่าน API
  handleUpload() {
    const formData = new FormData();
    formData.append(
      "profile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log("FormData sent to ", formData);
    axios
      .post("http://localhost:5000/uploadfile", formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // End ฟังชั่น Upload รูปผ่าน API

  onChange(event) {
    console.log(event.target.value);
  }
  render() {
    return (
      <div>
        <br />
        {/* begin ส่วนของการอัพโหลดรูป */}
        <input type="file" onChange={event => this.selectedImage(event)} />
        {/* end ส่วนของการอัพโหลดรูป */}
        <button onClick={() => this.handleUpload()}>Upload!</button>
        <br />
        <br />
        <img src={this.state.uri} width="30%" />
      </div>
    );
  }
}

export default UploadPage;
