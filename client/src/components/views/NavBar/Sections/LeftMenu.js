import React from 'react';
import { Menu } from 'antd';
import axios from 'axios'
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {


 
    return (
      <Menu mode={props.mode}>
        
      </Menu>
    )
  
}

export default LeftMenu