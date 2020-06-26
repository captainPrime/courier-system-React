/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { borderRadius } from '../../../../../node_modules/@material-ui/system';
import { UserOutline } from '@ant-design/icons'
import { Icon } from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
            <Menu mode={props.mode}
            >

                <SubMenu title={<a className="logout" href="/account">{user.userData.name} <Icon style={{ padding: '5px', backgroundColor: "#e9e9e9", borderRadius: "100%", color: 'black' }} type="user" /></a>}>
                    <Menu.Item style={{ textalign: 'center' }}>
                        <a style={{ marginLeft: '38%' }} onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }

}

export default withRouter(RightMenu);

