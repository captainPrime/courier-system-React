import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col, Descriptions, Input, Select, Button, message } from 'antd'


function AdminSingleShipments(props) {

    const shipmentID = props.match.params.shipmentID
    const requestType = props.match.params.shipmentType
    const [InlandShipment, setInlandShipment] = useState([])
    const [Shipment, setShipment] = useState([])
    const [Status, setStatus] = useState()
    const [TrackingId, setTrackingId] = useState()
    const [ID, setID] = useState(Shipment.trackingID)
  
    const status = [
        "pending",
        "warehouse",
        "in transit",
        "completed"
    ]

    useEffect(() => {
        Axios.get(`/api/shipping/shipment_by_id?id=${shipmentID}&type=${requestType}`)
            .then(response => {
                setShipment(response.data[0])
                //console.log(response.data[0])

          
            })
    }, [])

    const ShipmentStatus = status.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const handleSelect = (value) => {
        setStatus(value)
    }

    const handleInput = (event) => {
        setTrackingId(event.target.value)
    }

    const handleSubmit = () => {

        const variables = {
            status: Status,
            trackingid: TrackingId
        }

        Axios.post(`/api/shipping/updateRequest?id=${shipmentID}&type=${requestType}`, variables)
            .then(response => {
                if (response.data.success) {
                    message.success("Request Successfully Updated")
                    //props.history.push('/');
                }

                else {
                    message.error("Failed to Update Request")
                }
            })

    }


    return (
        <div className="postPage" style={{ width: '100%' }}>
            {requestType === "shipping request" ?
                <div style={{ paddingTop: '60px', }}>
                    <h2>{requestType} </h2>
                    <form>
                        <div>
                            <div style={{ border: 'solid 1px lightgrey', padding: '10px' }}>
                                <Descriptions title='Request Information'>
                                    <Descriptions.Item label='Status' id="status"><span style={{ fontWeight: 'bold' }}>{Shipment.status}</span></Descriptions.Item>
                                    <Descriptions.Item label='Client Email' id="email"><a href={`mailto: ${Shipment.userEmail}`} style={{}}>{Shipment.userEmail}</a></Descriptions.Item>
                                    <Descriptions.Item label='Date of Shipment'><span style={{ fontWeight: 'bold' }}>{Shipment.datevalue}</span></Descriptions.Item>
                                    <Descriptions.Item label='Dimension'><span style={{ fontWeight: 'bold' }}>{Shipment.dimension}</span></Descriptions.Item>
                                    <Descriptions.Item label='Commodity'><span style={{ fontWeight: 'bold' }}>{Shipment.cargo}</span></Descriptions.Item>
                                    <Descriptions.Item label='Description'><span style={{ fontWeight: 'bold' }}>{Shipment.description}</span></Descriptions.Item>
                                    <Descriptions.Item label='Weight'><span style={{ fontWeight: 'bold' }}>{Shipment.weight}</span></Descriptions.Item>
                                    <Descriptions.Item label='Quantity'><span style={{ fontWeight: 'bold' }}>{Shipment.quantity}</span></Descriptions.Item>
                                    <Descriptions.Item label='Movement Type'><span style={{ fontWeight: 'bold' }}>{Shipment.movementtype}</span></Descriptions.Item>
                                    <Descriptions.Item label='pieces'><span style={{ fontWeight: 'bold' }}>{Shipment.pieces}</span></Descriptions.Item>
                                    <Descriptions.Item label='Declare'><span style={{ fontWeight: 'bold' }}>{Shipment.declare}</span></Descriptions.Item>
                                    <Descriptions.Item label='From Country'><span style={{ fontWeight: 'bold' }}>{Shipment.fromcountry}</span></Descriptions.Item>
                                    <Descriptions.Item label='To Country'><span style={{ fontWeight: 'bold' }}>{Shipment.tocountry}</span></Descriptions.Item>
                                    <Descriptions.Item label='From State'><span style={{ fontWeight: 'bold' }}>{Shipment.fromstate}</span></Descriptions.Item>
                                    <Descriptions.Item label='To state'><span style={{ fontWeight: 'bold' }}>{Shipment.tostate}</span></Descriptions.Item>
                                    <Descriptions.Item label='From City'><span style={{ fontWeight: 'bold' }}>{Shipment.fromcity}</span></Descriptions.Item>
                                    <Descriptions.Item label='To City'><span style={{ fontWeight: 'bold' }}>{Shipment.tocity}</span></Descriptions.Item>
                                    <Descriptions.Item label='From Port'><span style={{ fontWeight: 'bold' }}>{Shipment.fromport}</span></Descriptions.Item>
                                    <Descriptions.Item label='To Port'><span style={{ fontWeight: 'bold' }}>{Shipment.toport}</span></Descriptions.Item>
                                    <Descriptions.Item label='From Zip'><span style={{ fontWeight: 'bold' }}>{Shipment.fromzip}</span></Descriptions.Item>
                                    <Descriptions.Item label='To Zip'><span style={{ fontWeight: 'bold' }}>{Shipment.tozip}</span></Descriptions.Item>
                                    <Descriptions.Item label='Note'><span style={{ fontWeight: 'bold' }}>{Shipment.note}</span></Descriptions.Item>
                                    <Descriptions.Item label='Mode'><span style={{ fontWeight: 'bold' }}>{Shipment.mode}</span></Descriptions.Item>
                                    <Descriptions.Item label='Height'><span style={{ fontWeight: 'bold' }}>{Shipment.hwd1}</span></Descriptions.Item>
                                    <Descriptions.Item label='Width'><span style={{ fontWeight: 'bold' }}>{Shipment.hwd2}</span></Descriptions.Item>
                                    <Descriptions.Item label='Dimension'><span style={{ fontWeight: 'bold' }}>{Shipment.hwd3}</span></Descriptions.Item>
                                    <Descriptions.Item label='Tracking ID'><span style={{ fontWeight: 'bold' }}>{Shipment.trackingID}</span></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    </form>
                </div>

                :
                <div style={{ paddingTop: '40px', }}>
                    <h2>{requestType}</h2>
                    <form>
                        <div>
                            <div style={{ border: 'solid 1px lightgrey', padding: '10px' }}>
                                <Descriptions title='Request Information'>
                                    <Descriptions.Item label='Status'><span style={{ fontWeight: 'bold' }}>{Shipment.status}</span></Descriptions.Item>
                                    <Descriptions.Item label='Client Email' id="email"><a href={`mailto: ${Shipment.userEmail}`} style={{}}>{Shipment.userEmail}</a></Descriptions.Item>
                                    <Descriptions.Item label='Pick Up Time'><span style={{ fontWeight: 'bold' }}>{Shipment.datevalue}</span></Descriptions.Item>
                                    <Descriptions.Item label='Period'><span style={{ fontWeight: 'bold' }}>{Shipment.period}</span></Descriptions.Item>
                                    <Descriptions.Item label='Origin'><span style={{ fontWeight: 'bold' }}>{Shipment.origination}</span></Descriptions.Item>
                                    <Descriptions.Item label='Destination'><span style={{ fontWeight: 'bold' }}>{Shipment.destination}</span></Descriptions.Item>
                                    <Descriptions.Item label='Description'><span style={{ fontWeight: 'bold' }}>{Shipment.description}</span></Descriptions.Item>
                                    <Descriptions.Item label='Tracking ID'><span style={{ fontWeight: 'bold' }}>{Shipment.trackingID}</span></Descriptions.Item>

                                </Descriptions>

                                {Shipment.cargo === "vehicle" &&
                                    <div>
                                        <Descriptions>
                                            < Descriptions.Item label='Cargo Type'><span style={{ fontWeight: 'bold' }}>{Shipment.cargo}</span></Descriptions.Item>
                                            <Descriptions.Item label='VIN'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].identifier}</span></Descriptions.Item>
                                            <Descriptions.Item label='Year'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].year}</span></Descriptions.Item>
                                            <Descriptions.Item label='Make'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].make}</span></Descriptions.Item>
                                            <Descriptions.Item label='Model'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].model}</span></Descriptions.Item>
                                            <Descriptions.Item label='#Buyer'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].buyer}</span></Descriptions.Item>
                                            <Descriptions.Item label='Height'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].height}</span></Descriptions.Item>
                                            <Descriptions.Item label='Dimension'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].dimension}</span></Descriptions.Item>
                                            <Descriptions.Item label='Widht'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].width}</span></Descriptions.Item>
                                            <Descriptions.Item label='Weight'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].weight}</span></Descriptions.Item>
                                            <Descriptions.Item label='#Lot'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].lot}</span></Descriptions.Item>

                                        </Descriptions>
                                    </div>
                                }

                                {Shipment.cargo === "dry cargo" &&
                                    <div>
                                        <Descriptions>
                                            <Descriptions.Item label='Cargo Type'><span style={{ fontWeight: 'bold' }}>{Shipment.cargo}</span></Descriptions.Item>
                                            <Descriptions.Item label='PO'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].identifier}</span></Descriptions.Item>
                                            <Descriptions.Item label='Specific Destination'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].destination2}</span></Descriptions.Item>
                                            <Descriptions.Item label='#Buyer'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].buyer}</span></Descriptions.Item>
                                            <Descriptions.Item label='Measurement'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].measurement}</span></Descriptions.Item>
                                            <Descriptions.Item label='Height'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].height}</span></Descriptions.Item>
                                            <Descriptions.Item label='Dimension'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].dimension}</span></Descriptions.Item>
                                            <Descriptions.Item label='Widht'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].width}</span></Descriptions.Item>
                                            <Descriptions.Item label='#Lot'><span style={{ fontWeight: 'bold' }}>{Shipment.cargodescription[0].lot}</span></Descriptions.Item>

                                        </Descriptions>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            }

            <br />
            <h3>Update Request</h3>
            {}
            <form>
                <Row gutter={[16, 16]} >
                    <Col lg={12} sm={12}>
                        <Input placeholder="Input Tracking Id"  onChange={handleInput} />
                    </Col>
                    <Col lg={12} sm={12}>
                        <Select defaultValue="pending" onChange={handleSelect}>
                            {ShipmentStatus}
                        </Select>
                    </Col>
                </Row>
                <Button type="primary" onClick={handleSubmit}>Update Request</Button>
            </form>
        </div>

    )
}

export default AdminSingleShipments
