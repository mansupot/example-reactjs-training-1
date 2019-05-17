import React from "react";
import { Switch, Route } from "react-router-dom";

import WelcomePage from "../Pages/WelcomePage";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage";
import RegisterPage from "../Pages/RegisterPage";
import GradePage from "../Pages/GradePage";
import APIPage from "../Pages/APIPage";
import UploadPage from "../Pages/UploadPhotoPage";
import DataTablePage from "../Pages/DataTablePage";
import StudentPage from "../Pages/StudentPage";

export default () => (
  <Switch>
    <Route exact path="/" component={WelcomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/main" component={MainPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/grade" component={GradePage} />
    <Route path="/api" component={APIPage} />
    <Route path="/test" component={UploadPage} />
    <Route path="/datatable" component={DataTablePage} />
    <Route path="/student" component={StudentPage} />
  </Switch>
);
