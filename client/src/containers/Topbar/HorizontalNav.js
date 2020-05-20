import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Icon, Menu, message} from "antd";
import {Link} from "react-router-dom";

const HorizontalNav = () => {
  const {authUser} = useSelector(({auth}) => auth);
  const pathname = useSelector(({settings}) => settings.pathname);
  const getNavStyleSubMenuClass = "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    authUser?.isAdmin ? (
      <Menu
        className={getNavStyleSubMenuClass}
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
        {/*main/dashboard/crypto*/}
        {/*User*/}
        <Menu.Item key="posts" className=" top-menu-item">
          <Link to="/admin/posts">
            <i className=" icon icon-card"/> Posts
          </Link>
        </Menu.Item>

        <Menu.Item key="comments" className=" top-menu-item">
          <Link to="/admin/comments">
            <i className=" icon icon-message"/> Comments
          </Link>
        </Menu.Item>

        <Menu.Item key="categories" className=" top-menu-item">
          <Link to="/admin/categories">
            <i className=" icon icon-cards-list-view"/> Categories
          </Link>
        </Menu.Item>

        <Menu.Item key="tags" className=" top-menu-item">
          <Link to="/admin/tags">
            <i className=" icon icon-tag-new"/>Tags
          </Link>
        </Menu.Item>

        <Menu.Item key="users" className=" top-menu-item">
          <Link to="/admin/users">
            <i className=" icon icon-user"/>Users
          </Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu
        className={getNavStyleSubMenuClass}
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
        <Menu.Item key="home" className="top-menu-item">
          <Link to="/home">
            <Icon className="icon" theme="filled" type="home"/>Home
          </Link>
        </Menu.Item>

        <Menu.Item key="technology" className=" top-menu-item">
          <Link to="/technology">
            <Icon className="icon" type="apple" theme="filled"/>Technology
          </Link>
        </Menu.Item>

        <Menu.Item key="entertainment" className=" top-menu-item">
          <Link to="/entertainment">
            <Icon className="icon" type='smile'/>Entertainment
          </Link>
        </Menu.Item>

        <Menu.Item key="sport" className=" top-menu-item">
          <Link to="/sport">
            <Icon className="icon" type="dribbble"/> Sport
          </Link>
        </Menu.Item>
      </Menu>
    )
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;

