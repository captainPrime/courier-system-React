import React from 'react'
import { FaCode } from "react-icons/fa";
import RightMenu from '../NavBar/Sections/RightMenu'
function LandingPage() {
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem', textAlign: 'center' }}>Courier Management System
                    (Client)
                </span>

                <p>All Features yet to be completed</p>
                <bold style={{ fontWeight: 'bold', }}>Coming Soon:</bold><p>Vendor and Consignee page </p>
            </div>
        </>
    )
}

export default LandingPage
