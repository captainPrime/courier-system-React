import { Menu, Button } from 'antd';
import React from 'react'
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux"

import { Icon } from 'antd'
import {
    AppstoreOutline,
    MenuUnfoldOutline,
    MenuFoldOutline,
    PieChartOutline,
    DesktopOutline,
    ContainerOutline,
    MailOutline,
    SyncOutline
} from '@ant-design/icons';

const { SubMenu } = Menu;


function Sidebar(props) {
    /* state = {
        collapsed: false,
    }; */

    const toggleCollapsed = () => {
        /* this.setState({
            collapsed: !this.state.collapsed,
        }); */
    };

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
            <Menu mode={props.mode}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline">
                {/* <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item> */}
                {/* <Menu.Item key="app">
            <a href="/register">Signup</a>
          </Menu.Item> */}
            </Menu>
        )
    }

    /*     else if (user.userData && !user.userData.isAuth && user.isAdmin || !user.userData) {
            return (
                <Menu mode={props.mode}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline">
                    <Menu.Item key="Admin">
                        <a href="/admin/dashboard/">Dashbaord</a>
                    </Menu.Item>
    
                    <Menu.Item key="logout">
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>
            )
        } */

    else {
        return (
            <div >
                <Menu mode={props.mode}
                    style={{ height: '85vh' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.Item key="mail"  >
                        <a href="/"><Icon type="home" /> Home</a>
                    </Menu.Item>


                    <Menu.Item key="freight">
                        <a href="/freight-list"><Icon type="search" />Freights</a>
                    </Menu.Item>


                    <Menu.Item key="consignee">
                        <a href="/consignee"> <Icon type="user" />Consignee</a>
                    </Menu.Item>

                    <Menu.Item key="vendor">
                        <a href="/vendor"> <Icon type="team"/>Vendor</a>
                    </Menu.Item>

                    <Menu.Item key="shipping">
                        <a href="/shipping-request"> <Icon type="global" />Shipping-Request</a>
                    </Menu.Item>

                    <Menu.Item key="inland">
                        <a href="/inland-request"> <Icon type="car" />Inland-Request</a>
                    </Menu.Item>

                    {/* <Menu.Item key="account">
                        <a href="/account">Account</a>
                    </Menu.Item> */}

                    <Menu.Item key="inventory">
                        <a href="/inventory"> <Icon type="shopping" />Inventory</a>
                    </Menu.Item>


                </Menu>
            </div>
        )
    }
}

export default Sidebar;