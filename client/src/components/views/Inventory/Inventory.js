import React, { useState, useEffect, useMemo } from 'react'
import { Select, Input, Button, Row, Col, Radio, Form, message } from "antd"
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import { countryList } from "../Vendor/data"
import axios from 'axios'
import uuid from 'uuid'
import { shipFromCountries, shipToCountries, shipFromPort, shipToPort, shipFromState, shipToState } from '../ShippingRequest/data/data.js'

function Inventory(props) {
    return (
        <h1 className="app">Coming Soon</h1>
    )
    /* 
        const [Requesttype, setRequest] = useState("Vehicle")
        const [Condition, setCondition] = useState()
        const [Vendor, setVendor] = useState()
        const [Consignee, setConsignee] = useState()
        const [VehicleCondition, setVehicleCondition] = useState()
        const [Country, setCountry] = useState()
    
        const [ShowVehicleDetails, setShowVehicle] = useState(true)
        const [ShowDryCargoDetails, setShowCargo] = useState(false)
    
        const [FromCountry, setFromCountry] = useState("United States")
        const [ToCountry, setToCountry] = useState()
        const [ToState, setToState] = useState()
        const [FromState, setFromState] = useState()
        const [FromPort, setFromPort] = useState()
        const [ToPort, setToPort] = useState()
    
        const [Vin, setVin] = useState()
        const [PO, setPO] = useState()
        const [Make, setMake] = useState()
        const [Model, setModel] = useState()
        const [Year, setYear] = useState()
        const [Trim, setTrim] = useState()
        const [BodyType, setBodyType] = useState()
        const [EngineType, setEngineType] = useState()
        const [EngineLiters, setEngineLiters] = useState()
        const [EngineCyl, setEngineCyl] = useState()
        const [Color, setColor] = useState()
        const [Description, setDescription] = useState()
        const [Note, setNote] = useState()
    
        const [VendorList, setVendorList] = useState([])
        const [ConsigneeList, setConsigneeList] = useState([])
    
        const request = ["Vehicle", "Dry Cargo"]
        const conditionlist = ["Drivable", "Non-drivable", "Rollable"]
    
        useEffect(() => {
            axios.get('/api/users/vendors')
                .then(response => {
                    if (response.data.success) {
                        setVendorList(response.data.vendors)
                    }
                })
    
            axios.get('/api/users/consignees')
                .then(response => {
                    if (response.data.success) {
                        setConsigneeList(response.data.consignees)
                    }
                })
        })
    
        const RequestType = request.map((Item, index) => {
            return <Select.Option key={index} value={Item}> {Item} </Select.Option>
        })
    
        const VendorCompany = VendorList.map((Item, index) => {
            return <Select.Option key={index} value={Item.UI + " " + Item.Company}> {Item.Company} </Select.Option>
        })
    
        const ConsigneeCompany = ConsigneeList.map((Item, index) => {
            return <Select.Option key={index} value={Item.UI + " " + Item.Company}> {Item.FirstName + " " + Item.LastName + " " + "passport" + " " + Item.UI} </Select.Option>
        })
    
        const CountryList = countryList.map((Item, index) => {
            return <Select.Option key={index} value={Item}> {Item} </Select.Option>
        })
    
    
        const condition = conditionlist.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
    
        const ShipFromCountries = shipFromCountries.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
        const ShipToCountries = shipToCountries.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
        const ShipFromPort = shipFromPort.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
        const ShipToPort = shipToPort.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
        const ShipToState = shipToState.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
        const ShipFromState = shipFromState.map((item, index) => {
            return <Select.Option key={index} value={item}>{item}</Select.Option>
        })
    
        const handleFromCountry = (value) => {
            setFromCountry(value)
        }
        const handleFromState = (value) => {
            setFromState(value)
        }
        const handleFromPort = (value) => {
            setFromPort(value)
        }
    
        const handleToCountry = (value) => {
            setToCountry(value)
        }
        const handleToState = (value) => {
            setToState(value)
        }
        const handleToPort = (value) => {
            setToPort(value)
        }
        const handleCondition = (value) => {
            setVehicleCondition(value)
        }
        const handleCountry = (value) => {
            setCountry(value)
        }
    
        const handleRequest = (value) => {
            setRequest(value)
    
    
            if (value === "Vehicle") {
                setShowVehicle(true)
                setShowCargo(false)
            }
            else {
                setShowVehicle(false)
                setShowCargo(true)
            }
        }
    
        const handleVendors = (value) => {
            setVendor(value)
    
        }
        const handleConsignees = (value) => {
            setConsignee(value)
        }
    
        //get vendors api
        const handleInput = (event) => {
            const name = event.target.name
            const value = event.target.value
    
            if (name === 'vin') setVin(value)
            else if (name === 'po') setPO(value)
            else if (name === 'make') setMake(value)
            else if (name === 'model') setModel(value)
            else if (name === 'year') setYear(value)
            else if (name === 'trim') setTrim(value)
            else if (name === 'bodyType') setBodyType(value)
            else if (name === 'engineType') setEngineType(value)
            else if (name === 'engineLiters') setEngineLiters(value)
            else if (name === 'engineCyl') setEngineCyl(value)
            else if (name === 'color') setColor(value)
            else if (name === 'description') setDescription(value)
            else if (name === 'note') setNote(value)
        }
    
        const onSubmit = async (event) => {
            event.preventDefault()
            let variables = {
                uid: uuid(),
                Requesttype,
                Vendor,
                Consignee,
                VehicleCondition,
                Country,
                FromCountry,
                ToCountry,
                ToState,
                FromState,
                FromPort,
                ToPort,
                Vin,
                PO,
                Make,
                Model,
                Year,
                Trim,
                BodyType,
                EngineType,
                EngineLiters,
                EngineCyl,
                Color,
                Description,
                Note
            }
    
            await axios.post('/api/shipping/Inventory', variables)
                .then(response => {
                    if (response.data.success) {
                        message.success('Request successfully recorded');
                        props.history.push('/inventory');
                    }
    
                    else {
                        message.error('Failed to record request')
                    }
                })
    
        }
    
        return (
            <div style={{ paddingTop: '60px' }}>
                <h2>Add Inventory</h2>
                <Select style={{ width: '180px' }} defaultValue="Vehicle" onChange={handleRequest}>
                    {RequestType}
                </Select>
                <br /><br />
                <form onSubmit={onSubmit}>
                    <Row gutter={[16, 16]} >
                        {ShowVehicleDetails &&
                            <Col lg={6} md={12} sm={24} >
                                <Form.Item label="*VIN">
                                    <Input type="text" name="vin" onChange={handleInput} />
                                </Form.Item>
                            </Col>
                        }
    
                        {ShowDryCargoDetails &&
                            <Col lg={6} md={12} sm={24} >
                                <Form.Item label="*PO">
                                    <Input type="text" name="po" onChange={handleInput} />
                                </Form.Item>
                            </Col>
                        }
                        <Col lg={6} md={12} sm={24} >
                            <Form.Item label="Vendor">
                                <Select defaultValue="Select Vendor" style={{ width: '100%' }} onChange={handleVendors}>
                                    {VendorCompany}
                                </Select>
                            </Form.Item>
                        </Col>
    
                        {ShowVehicleDetails &&
                            <div>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Vehicle Condition">
                                        <Select placeholder="select vehicle condition" style={{ width: '100%' }} onChange={handleCondition} required>
                                            {condition}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Make">
                                        <Input type="text" name="make" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Model">
                                        <Input type="text" name="model" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Year">
                                        <Input type="text" name="year" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Trim">
                                        <Input type="text" name="trim" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Assembly Country">
                                        <Select defaultValue="Select Country" style={{ width: '100%' }} onChange={handleCountry}>
                                            {CountryList}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Body Type">
                                        <Input type="text" name="bodyType" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Engine Type">
                                        <Input type="text" name="engineType" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Engine Liters">
                                        <Input type="text" name="engineLiters" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Engine Cyl">
                                        <Input type="text" name="engineCyl" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Color">
                                        <Input type="text" name="color" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                            </div>
                        }
    
                        {ShowDryCargoDetails &&
                            <div>
                                <Col lg={6} md={12} sm={24} >
                                    <Form.Item label="Description">
                                        <Input type="text" name="description" onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                            </div>
    
                        }
                        <Col lg={6} md={12} sm={24} >
                            <Form.Item label="Vendor">
                                <Select defaultValue="Select Consignee" style={{ width: '100%' }} onChange={handleConsignees}>
                                    {ConsigneeCompany}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
    
    
                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} xs={24} >
                            <h3>Shipping From</h3>
                            <Form.Item style={{ marginBottom: 0 }} className="label">
                                <Select name="ShipFromCountries" defaultValue="United States" onChange={handleFromCountry} id="countries" className="field" required>
                                    {ShipFromCountries}
                                </Select >
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }} className="label">
                                <Select name="ShipFromState" defaultValue="select state" onChange={handleFromState} className="field" required>
                                    {ShipFromState}
                                </Select >
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }} className="label">
                                <Select name="ShipFromPort" defaultValue="select port" onChange={handleFromPort} className="field" required>
                                    {ShipFromPort}
                                </Select >
                            </Form.Item>
                        </Col>
    
                        <Col lg={12} md={12} xs={24} >
                            <h3>Shipping To</h3>
                            <Form.Item style={{ marginBottom: 0 }} className="label">
                                <Select name="shipToCountries" defaultValue="select country" onChange={handleToCountry} className="field" required >
                                    {ShipToCountries}
                                </Select >
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }} className="label">
                                <Select name="shipToState" defaultValue="select state" onChange={handleToState} className="field" required>
                                    {ShipToState}
                                </Select >
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }} className="la" bel>
                                <Select name="shipToPort" defaultValue="select port" onChange={handleToPort} className="field" required >
                                    {ShipToPort}
                                </Select >
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Note" style={{ marginBottom: 0 }} className="label">
                        <TextArea
                            style={{ height: '150px' }}
                            name="note"
                            placeholder="Leave a note here"
                            onChange={handleInput}
                        >
                        </TextArea>
                    </Form.Item>
                    <br />
                    <Button
                        type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '30%' }} onClick={onSubmit}
                    >
                        Submit
                    </Button>
    
                </form>
            </div>
        ) */
}

export default Inventory
