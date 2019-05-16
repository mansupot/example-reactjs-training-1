import React, { Component } from "react";
import axios from "axios";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }
  uploadImage(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }
  handleUpload() {
    // console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append(
      "profile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(formData);
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
        <input type="file" onChange={event => this.uploadImage(event)} />
        <button onClick={() => this.handleUpload()}>Upload!</button>
        <input
          type="datetime-local"
          name="txtDateTime"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TestPage;

//โครงสร้าง Component ของ  React js
