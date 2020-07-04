import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import RightMenu from '../NavBar/Sections/RightMenu'
import { Row, Col } from 'antd'
import Axios from 'axios'

function LandingPage(props) {

    const [user, setuser] = useState([])
    const [InlandRequest, setIRequest] = useState([])
    const [ShippingRequest, setSRequest] = useState([])

    useEffect(() => {
        Axios.get('/api/users/getUser')
            .then(response => {
                //console.log(response.data.userInfo)
                setuser(response.data.userInfo)
            })

        Axios('/api/shipping/getAllRequest')
            .then(response => {
                if (response.data.success) {
                    setIRequest(response.data.InlandRequest)
                    setSRequest(response.data.ShippingRequest)
                }
            })
    }, [])

    const pendingShippingRequest = ShippingRequest.filter(x => {
        return x.status === "pending"
    })

    const transitShippingRequest = ShippingRequest.filter(x => {
        return x.status === "in transit"
    })

    const warehouseShippingRequest = ShippingRequest.filter(x => {
        return x.status === "warehouse"
    })

    const completedtShippingRequest = ShippingRequest.filter(x => {
        return x.status === "completed"
    })



    const pendingInlandRequest = InlandRequest.filter(x => {
        return x.status === "pending"
    })

    const transitInlandRequest = InlandRequest.filter(x => {
        return x.status === "in transit"
    })

    const warehouseInlandRequest = InlandRequest.filter(x => {
        return x.status === "warehouse"
    })

    const completedtInlandRequest = InlandRequest.filter(x => {
        return x.status === "completed"
    })


    return (
        <>
            <div className="">
                <div style={{ marginTop: '60px', padding: '80px', backgroundColor: '#1890FF', height: '40%' }}>
                    <h1 style={{ color: 'white' }}>USER INFORMATION</h1>
                    <br />
                    {user.map((user, index) => {
                        return (
                            <Row gutter={[16, 16]}>
                                <Col lg={8} md={8} xs={24}>
                                    <h3 style={{ color: 'white', textAlign: 'center' }}>ACCOUNT</h3>
                                    <div className="space"><p>{user.UI}</p></div>
                                </Col>
                                <Col lg={8} md={8} xs={24}>
                                    <h3 style={{ color: 'white', textAlign: 'center' }}>NAME</h3>
                                    <div className="space"><p>{user.name}</p></div>
                                </Col>
                                <Col lg={8} md={8} xs={24}>
                                    <h3 style={{ color: 'white', textAlign: 'center' }}>USERNAME</h3>
                                    <div className="space"><p>{user.username}</p></div>
                                </Col>
                                <Col lg={8} md={8} xs={24}>
                                    <h3 style={{ color: 'white', textAlign: 'center' }}>EMAIL</h3>
                                    <div className="space"><p>{user.email}</p></div>
                                </Col>
                            </Row>
                        )
                    })}

                </div>

                <div style={{ marginTop: '60px', padding: '80px', backgroundColor: 'green', height: '40%' }}>
                    <h1 style={{ color: 'white' }}>SHIPMENT INFORMATION</h1>

                    <Row gutter={[16, 16]}>

                        <Col lg={6} md={6} xs={24}>
                            <div className="space"><p>SHIPPING REQUEST {ShippingRequest.length}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div className="space"><p>INLAND REQUEST {InlandRequest.length}</p></div>
                        </Col>
                    </Row>
                    <br />

                    <h2 style={{ color: 'white' }}>SHIPPING REQUEST</h2>
                    <Row gutter={[16, 16]}>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p>pending {pendingShippingRequest.length ? pendingShippingRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p> warehouse {warehouseShippingRequest.length ? warehouseShippingRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p>in transit {transitShippingRequest.length ? transitShippingRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p> completed {completedtShippingRequest.length ? completedtShippingRequest.length : 0}</p></div>
                        </Col>
                    </Row>

                    <br />

                    <h2 style={{color: 'white'}}>INLAND REQUEST</h2>
                    <Row gutter={[16, 16]}>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p>pending {pendingInlandRequest.length ? pendingInlandRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p> warehouse {warehouseInlandRequest.length ? warehouseInlandRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p>in transit {transitInlandRequest.length ? transitInlandRequest.length : 0}</p></div>
                        </Col>
                        <Col lg={6} md={6} xs={24}>
                            <div  className="space"><p> completed {completedtInlandRequest.length ? completedtInlandRequest.length : 0}</p></div>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default LandingPage
