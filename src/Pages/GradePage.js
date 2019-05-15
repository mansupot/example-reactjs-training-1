import React, { Component } from "react";

class GradePage extends Component {
  constructor(props) {
    super(props);
    this.state = { txtScore: 0, message: "" };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkGrade() {
    if (this.state.txtScore >= 0 && this.state.txtScore < 50) {
      this.setState({ message: "F" });
    } else if (this.state.txtScore >= 50 && this.state.txtScore < 60) {
      this.setState({ message: "D" });
    } else if (this.state.txtScore >= 60 && this.state.txtScore < 70) {
      this.setState({ message: "C" });
    } else if (this.state.txtScore >= 70 && this.state.txtScore < 80) {
      this.setState({ message: "B" });
    } else if (this.state.txtScore >= 80 && this.state.txtScore <= 100) {
      this.setState({ message: "A" });
    } else {
      alert("กรุณากรอกคะแนนระหว่าง 0 - 100 !");
    }
  }

  render() {
    console.log(this.state.txtScore);
    return (
      <div>
        <label>Score :</label>
        <input
          type="number"
          onChange={event => this.onChange(event)}
          name="txtScore"
          value={this.state.txtScrore}
        />
        <button onClick={() => this.checkGrade()}>Process</button>
        <br />
        <label>Result : </label>
        <label>{this.state.message}</label>
      </div>
    );
  }
}
export default GradePage;
