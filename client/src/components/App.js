import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import adminAuth from '../hoc/admin'
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import ShippingRequest from "./views/ShippingRequest/ShippingReqauest.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import SingleShipments from "./views/SingleShipments/SingleShipments.js";
import AdminSingleShipments from "./Admin/SingleShipment";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import InlandRequest from "./views/InlandRequest/InlandRequest";
import Account from "./views/Account/Account";
import FreightList from "./views/freightList/FreightList";
import NavBar from "./views/NavBar/NavBar";
import NavBar2 from "./views/NavBar/NavBar2";
import AdminDashboard from "./Admin/AdminDashboard";
import Footer from "./views/Footer/Footer"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      {/*   <NavBar2 style={{ height: '100vh', display: 'fixed' }} /> */}
      <div style={{ paddingTop: '69px', padding: '40px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/shipping-request" component={Auth(ShippingRequest, true)} />
          <Route exact path="/inland-request" component={Auth(InlandRequest, true)} />
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/freight-list" component={Auth(FreightList, true)} />
          <Route exact path="/admin-login" component={Auth(AdminLogin, null)} />
          <Route exact path="/account" component={Auth(Account, true)} />
          <Route exact path="/shipment/:shipmentID/:shipmentType/" component={Auth(SingleShipments, true)} />
          <Route exact path="/admin/:shipmentID/:shipmentType/" component={adminAuth(AdminSingleShipments, true)} />
          <Route exact path="/admin/dashboard/" component={adminAuth(AdminDashboard, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
