/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth && !user.isAdmin) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item> */}
      </Menu>
    )
  }

  else if (user.userData && !user.userData.isAuth && user.isAdmin || !user.userData) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="Admin">
          <a href="/admin/dashboard/">Dashbaord</a>
        </Menu.Item>

          <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }

  else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>

        <Menu.Item key="consignee">
          <a href="#">Consignee</a>
        </Menu.Item>

        <Menu.Item key="vendor">
          <a href="#">Vendor</a>
        </Menu.Item>

        <Menu.Item key="freight">
          <a href="/freight-list">Freights</a>
        </Menu.Item>

        <Menu.Item key="shipping">
          <a href="/shipping-request">Shipping-Request</a>
        </Menu.Item>

        <Menu.Item key="inland">
          <a href="/inland-request">Inland-Request</a>
        </Menu.Item>

        <Menu.Item key="account">
          <a href="/account">Account</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }

}

export default withRouter(RightMenu);

