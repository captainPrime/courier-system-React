import React, { useState } from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import AddVendor from './AddVendor'
import RequestFilter from './Filter'
import Axios from 'axios'

function Vendor(props) {

    const [Result, setResult] = useState(false)
    const [ShowSearch, setShowSearch] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [Request, setRequest] = useState()
    const [account, setAccount] = useState()
    const [company, setCompany] = useState()
    const [lastname, setLastName] = useState()
    const [firstname, setFirstName] = useState()
    const [VendorArray, setVendorArray] = useState([])
    const [searchValue, setSearchValue] = useState(false)
    const [Filter, setFilter] = useState({})


    //user ID from redux state
    const writer = props.user.userData
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value.toLowerCase()
        if (name === 'Account') setAccount(value)
        if (name === 'FirstName') setFirstName(value)
        if (name === 'LastName') setLastName(value)
        if (name === 'Company') setCompany(value)
        setRequest(event.target.value)
    }
    const handleAddButton = () => {
        setShowSearch(false)
        setShowAdd(true)
    }
    const handleCancel = () => {
        setShowSearch(true)
        setShowAdd(false)
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
        Axios.post(`/api/users/getVendor `, variable)
            .then(res => {
                if (res.data.success) {

                    setVendorArray(res.data.searchedVendor)
                }
            })
    }
    return (
        <div style={{ paddingTop: "60px" }}>
            {ShowSearch &&
                <div>
                    <h2>Vendor List</h2>
                    <Row gutter={[16, 16]}>
                        <Col lg={6} md={6} sm={12} >
                            <Button type="primary" style={{ width: '100%' }} onClick={onSearch}>Search</Button>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <Button type="primary" style={{ width: '110%' }} onClick={handleAddButton}>Add new Vendor</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} sm={12} >
                            <Form.Item label="">
                                <Input type="text" name="Account" placeholder="#Account" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Form.Item label="">
                                <Input type="text" name="FirstName" placeholder="Contact First Name" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} sm={12} >
                            <Form.Item label="">
                                <Input type="text" name="Company" placeholder="Company" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Form.Item label="">
                                <Input type="text" name="LastName" placeholder="Last Name" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <br />
                    <RequestFilter
                        VendorArray={VendorArray}
                    />
                </div>
            }
            <AddVendor
                handleCancel={handleCancel}
                showAdd={showAdd}
                writer={writer}
            />
        </div>
    )
}
export default Vendor