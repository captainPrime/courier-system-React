import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Form, Input, Select, message } from 'antd'
import { countryList } from './data'
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import { useHistory } from "react-router-dom"
import Axios from 'axios'
function AddConsignee(props) {
    const history = useHistory()
    const [Account, setAccount] = useState()
    const [UI, setUI] = useState("#" + Math.random().toString().slice(2, 11))
    const [Company, setCompany] = useState()
    const [FirstName, setFirstName] = useState()
    const [LastName, setLastName] = useState()
    const [SalesRep, setSalesRep] = useState()
    const [Country, setCountry] = useState()
    const [Address1, setAddress1] = useState()
    const [Address2, setAddress2] = useState()
    const [City, setCity] = useState()
    const [ZIP, setZIP] = useState()
    const [Phone1, setPhone1] = useState()
    const [Phone2, setPhone2] = useState()
    const [Email, setEmail] = useState()
    const [Others, setOthers] = useState()
    const CountryList = countryList.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })
    const handleCountry = (value) => {
        setCountry(value)
    }
    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (name === 'account') setAccount(value)
        else if (name === 'company') setCompany(value)
        else if (name === 'firstname') setFirstName(value)
        else if (name === 'lastname') setLastName(value)
        else if (name === 'salesrep') setSalesRep(value)
        else if (name === 'address1') setAddress1(value)
        else if (name === 'address2') setAddress2(value)
        else if (name === 'city') setCity(value)
        else if (name === 'zip') setZIP(value)
        else if (name === 'phone1') setPhone1(value)
        else if (name === 'phone2') setPhone2(value)
        else if (name === 'email') setEmail(value)
        else if (name === 'others') setOthers(value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        let variables = {
            writer: props.writer._id,
            UI,
            Company,
            FirstName,
            LastName,
            SalesRep,
            Country,
            Address1,
            Address2,
            City,
            ZIP,
            Phone1,
            Phone2,
            Email,
            Others
        }
         const axiosVariables = Object.keys(variables).map((key, index) => {
            if(typeof variables[key] === 'string'){
                variables[key] =  variables[key].toLowerCase()  
            }
        })
        await Axios.post('/api/users/addConsignee/', variables)
             .then(res => {
                 if (res.data.success) {
                     message.success("succesfully added consignee");
                     history.push('/consignee')
                 }
                 else {
                     message.error("failed to add consignee")
                 }
             })  
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {props.showAdd &&
                    <div>
                        <Row gutter={[16, 16]}>
                            <Col lg={6} md={6} sm={24} >
                                <Button htmlType="submit" type="primary" style={{ width: '100%' }} onSubmit={handleSubmit}>Save</Button>
                            </Col>
                            <Col lg={6} md={6} sm={24} >
                                <Button type="primary" style={{ width: '100%' }} onClick={props.handleCancel}>Cancel</Button>
                            </Col>
                        </Row>
                        <br />
                        <h2>Account {UI}</h2>
                        <Row gutter={[16, 16]}>
                            <Col lg={5} md={12} sm={24} >
                                <Form.Item label="#Account *">
                                    <Input type="text" name="account" value={UI} onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="Company *">
                                    <Input type="text" name="company" onChange={handleInput} required required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24} >
                                <Form.Item label="First Name *">
                                    <Input type="text" name="firstname" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="Last Name *">
                                    <Input type="text" name="lastname" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={12} sm={24}>
                                <Form.Item label="Sales Rep">
                                    <Input type="text" name="salesrep" onChange={handleInput}/>
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={12} sm={24} >
                                <Form.Item label="Country *">
                                    <Select defaultValue="Select Country" style={{ width: "100%" }} >
                                        {CountryList}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="Address 1 *">
                                    <Input type="text" name="address1" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24} >
                                <Form.Item label="Address 2">
                                    <Input type="text" name="address2" onChange={handleInput} />
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="City *">
                                    <Input type="text" name="city" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="ZIP">
                                    <Input type="text" name="zip" onChange={handleInput} />
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24} >
                                <Form.Item label="Phone 1 *">
                                    <Input type="text" name="phone1" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="Phone 2">
                                    <Input type="text" name="phone2" onChange={handleInput} />
                                </Form.Item>
                            </Col>
                            <Col lg={5} md={12} sm={24}>
                                <Form.Item label="Email *">
                                    <Input type="email" name="email" onChange={handleInput} required/>
                                </Form.Item>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <Form.Item label="Others">
                                    <TextArea
                                        style={{ height: '150px' }}
                                        name="others"
                                        placeholder="please input other information if necessary"
                                        onChange={handleInput}
                                    >
                                    </TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={[16, 16]}>
                            <Col lg={6} md={6} sm={24} >
                                <Button htmlType="submit" className="login-form-button" type="primary" style={{ width: '100%' }} onSubmit={handleSubmit}>Save</Button>
                            </Col>
                            <Col lg={6} md={6} sm={24} >
                                <Button htmlType="submit" type="primary" style={{ width: '100%' }} onClick={props.handleCancel}>Cancel</Button>
                            </Col>
                        </Row>
                    </div>
                }
            </form>
        </div>
    )
}
export default AddConsignee