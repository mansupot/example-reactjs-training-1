import React from "react";
import { Button, Container, Label } from "reactstrap";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Container>
          <div className="row">
            {/* ----------------------- */}
            <div className="col-lg-4">
              <hr />
              <div className="card">
                <div className="card-header">
                  <Label>Assignment : Grade</Label>
                </div>
                <div className="card-body">
                  <Link to="/grade">
                    <Button color="primary" size="md" className="form-control">
                      Click
                    </Button>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            {/* ----------------------- */}
            {/* ----------------------- */}
            <div className="col-lg-4">
              <hr />
              <div className="card">
                <div className="card-header">
                  <Label>Assignment : API</Label>
                </div>
                <div className="card-body">
                  <Link to="/api">
                    <Button color="success" size="md" className="form-control">
                      Click
                    </Button>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            {/* ----------------------- */}
            {/* ----------------------- */}
            <div className="col-lg-4">
              <hr />
              <div className="card">
                <div className="card-header">
                  <Label>Assignment : ______</Label>
                </div>
                <div className="card-body">
                  <Link to="#">
                    <Button color="warning" size="md" className="form-control">
                      Click
                    </Button>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            {/* ----------------------- */}
            {/* ----------------------- */}
            <div className="col-lg-4">
              <hr />
              <div className="card">
                <div className="card-header">
                  <Label>Assignment : ______</Label>
                </div>
                <div className="card-body">
                  <Link to="#">
                    <Button color="danger" size="md" className="form-control">
                      Click
                    </Button>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            {/* ----------------------- */}
          </div>
        </Container>
      </div>
    );
  }
}

export default MainPage;
