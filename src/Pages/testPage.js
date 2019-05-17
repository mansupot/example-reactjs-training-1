import React, { Component } from "react";
import axios from "axios";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      appendFormData: null
    };
  }
  setImage(event) {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("profile", selectedFile, selectedFile.name);
    console.log(formData);
    this.setState({ appendFormData: formData });
  }
  handleUpload() {
    axios
      .post("http://localhost:5000/uploadfile", this.state.appendFormData)
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
        <input type="file" onChange={event => this.setImage(event)} />
        <button onClick={() => this.handleUpload()}>Upload!</button>
      </div>
    );
  }
}

export default TestPage;

//โครงสร้าง Component ของ  React js
