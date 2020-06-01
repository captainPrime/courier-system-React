/* import { Menu, Switch } from 'antd';
import React from 'react'
import {
    AppstoreOutline,
    MenuUnfoldOutline,
    MenuFoldOutline,
    PieChartOutline,
    DesktopOutline,
    ContainerOutline,
    MailOutline,
} from '@ant-design/icons';

import { Button, Icon } from 'antd'

const { SubMenu } = Menu;

class NavBar2 extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutline : MenuFoldOutline)}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutline />}>
                        Option 1
            </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutline />}>
                        Option 2
            </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutline />}>
                        Option 3
            </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutline />} title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutline />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default NavBar2; */