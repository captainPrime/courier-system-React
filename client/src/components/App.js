import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import adminAuth from '../hoc/admin'
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import ShippingRequest from "./views/ShippingRequest/ShippingReqauest.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import SingleShipments from "./views/SingleShipments/SingleShipments.js";
import Single from "./views/SingleVC/Single.js"
import AdminSingleShipments from "./Admin/SingleShipment";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import InlandRequest from "./views/InlandRequest/InlandRequest";
import Account from "./views/Account/Account";
import FreightList from "./views/freightList/FreightList";
import Consignee from "./views/Consignee/Consignee";
import Vendor from "./views/Vendor/Vendor";
import Inventory from "./views/Inventory/Inventory";
import NavBar from "./views/NavBar/NavBar";
import AdminDashboard from "./Admin/AdminDashboard";
import Footer from "./views/Footer/Footer"
import Sidebar from "./views/NavBar/Sidebar"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {

  return (

    <Suspense fallback={(<h2>Loading...</h2>)}>

      <NavBar />

      <div style={{ width: '100%' }}>
        <aside className="Aside" style={{ width: "20%", float: 'left', paddingTop: '99px', position: 'fixed', height: "100%" }}><Sidebar className="Aside" style={{ height: "100%" }} /></aside>

        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <div className="content" style={{ /* paddingTop: '69px' ,*/ padding: '40px', minHeight: 'calc(100vh - 80px)', width: "80%", float: "right" }}>
            <Route exact path="/shipping-request" component={Auth(ShippingRequest, true)} />
            <Route exact path="/inland-request" component={Auth(InlandRequest, true)} />
            <Route exact path="/" component={Auth(LandingPage, true)} />
            <Route exact path="/freight-list" component={Auth(FreightList, true)} />
            <Route exact path="/admin-login" component={Auth(AdminLogin, null)} />
            <Route exact path="/account" component={Auth(Account, true)} />
            <Route exact path="/shipment/:shipmentID/:shipmentType/" component={Auth(SingleShipments, true)} />
            <Route exact path="/user/:typeOfRequest/:userID/" component={Auth(Single, true)} />
            <Route exact path="/admin/:shipmentID/:shipmentType/" component={adminAuth(AdminSingleShipments, true)} />
            <Route exact path="/admin/dashboard/" component={adminAuth(AdminDashboard, true)} />
            <Route exact path="/consignee" component={Auth(Consignee, true)} />
            <Route exact path="/vendor" component={Auth(Vendor, true)} />
            <Route exact path="/inventory" component={Auth(Inventory, true)} />
          </div>

        </Switch>
        <Footer />

      </div>
      {/* <Footer />  */}

    </Suspense>
  );
}

export default App;
