import React, { Component } from "react";
import axios from "axios";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uri: "http://localhost:5000/get/photos/" + "profile-1558077271013.jpg"
    };
  }
  setImage(event) {
    console.log(event);
    this.setState({ selectedFile: event.target.files[0] });
  }
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
  onChange(event) {
    console.log(event.target.value);
  }
  render() {
    return (
      <div>
        <br />
        <input type="file" onChange={event => this.setImage(event)} />
        <button onClick={() => this.handleUpload()}>Upload!</button>
        <br />
        <br />
        <img src={this.state.uri} width="30%" />
      </div>
    );
  }
}

export default TestPage;

//โครงสร้าง Component ของ  React js
