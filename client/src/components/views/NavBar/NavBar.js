import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import RightMenu2 from './Sections/RightMenu2';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu2 mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="menu" />
        </Button>
        <Drawer
          title="LOGO"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar