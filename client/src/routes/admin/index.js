import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Post from "./Post.jsx";
import Tags from "./Tags";
import User from "./User";
import Categories from "./Categories";

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
