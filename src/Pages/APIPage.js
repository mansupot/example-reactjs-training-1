import React from "react";
import axios from "axios";

class APIPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDepartment: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/get/department")
      .then(res => {
        console.log("Respond API => ", res);

        this.setState({ dataDepartment: res.data });
      })
      .catch(err => {
        console.log("Error => ", err);
      });
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item active">รายการแผนก</li>
          {this.state.dataDepartment.map((el, index) => {
            return (
              <li className="list-group-item" key={index}>
                รหัส : {el.department_id + " "}
                แผนก : {el.department_name + " "}
                เบอร์โทร : {el.department_tel}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default APIPage;
