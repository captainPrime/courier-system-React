import React, { useState } from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import AddConsignee from './AddConsignee'
import RequestFilter from './Filter'
import Axios from '../../../../node_modules/axios';

function Consignee(props) {
    const [Result, setResult] = useState(false)
    const [ShowSearch, setShowSearch] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [Request, setRequest] = useState()
    const [account, setAccount] = useState()
    const [company, setCompany] = useState()
    const [lastname, setLastName] = useState()
    const [firstname, setFirstName] = useState()
    const [ConsigneeArray, setConsigneeArray] = useState([])
    const [searchValue, setSearchValue] = useState(false)
    const [Filter, setFilter] = useState({})
    const writer = props.user.userData
    const handleAddButton = () => {
        setShowSearch(false)
        setShowAdd(true)
    }
    const handleCancel = () => {
        setShowSearch(true)
        setShowAdd(false)
    }
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value.toLowerCase()
        if (name === 'Account') setAccount(value)
        if (name === 'FirstName') setFirstName(value)
        if (name === 'LastName') setLastName(value)
        if (name === 'Company') setCompany(value)
        setRequest(event.target.value)
    }
    const onSearch = () => {
        let variable = {
            searchValue,
            Request,
            Filter: {
                writer: props.user.userData._id,
                Company: company,
                UI: account,
                FirstName: firstname,
                LastName: lastname,
            }
        }
        Axios.post(`/api/users/getConsignee `, variable)
            .then(res => {
                if (res.data.success) {
                    const consigneeArray = []

                    setConsigneeArray(res.data.searchedConsignee)
                }
            })
    }
    return (
        <div style={{ paddingTop: "60px" }}>
            {ShowSearch &&
                <div>
                    <h2>Consignee List</h2>
                    <Row gutter={[16, 16]}>
                        <Col lg={6} md={6} sm={12} >
                            <Button type="primary" style={{ width: '100%' }} onClick={onSearch}>Search</Button>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <Button type="primary" style={{ width: '120%' }} onClick={handleAddButton}>Add new Consignee</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} sm={12} >
                            <Form.Item label="">
                                <Input type="text" placeholder="#Account" onChange={handleChange} name="Account" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Form.Item label="">
                                <Input type="text" placeholder="Contact First Name" onChange={handleChange} name="FirstName" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} sm={12} >
                            <Form.Item label="">
                                <Input type="text" placeholder="Company" onChange={handleChange} name="Company" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Form.Item label="">
                                <Input type="text" placeholder="Last Name" onChange={handleChange} name="LastName" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <RequestFilter
                        ConsigneeArray={ConsigneeArray}
                    />
                </div>
            }
            <AddConsignee
                handleCancel={handleCancel}
                showAdd={showAdd}
                writer={writer}
            />
        </div>
    )
}
export default Consignee