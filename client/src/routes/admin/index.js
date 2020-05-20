import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Post from "./Post";
import Tags from "./Tags";
import Categories from "./Categories";
import User from "./User";

const Admin = ({match}) => (
  <Switch>
    <Route path={`${match.url}/home`} component={Home}/>
    <Route path={`${match.url}/posts`} component={Post}/>
    <Route path={`${match.url}/tags`} component={Tags}/>
    <Route path={`${match.url}/categories`} component={Categories}/>
    <Route path={`${match.url}/users`} component={User}/>
  </Switch>
);

export default Admin;
