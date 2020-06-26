import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, Radio, Select, Typography, DatePicker, notification, message } from 'antd';
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import RequestFilter from './sections/listing'
import Axios from 'axios';
const { Option } = Select;
const { Title } = Typography
const request = ["Shipping Request", "Inland Request"]

function FreightList(props) {
    const [Request, setRequest] = useState('location')
    const [SearchValue, setSearchValue] = useState('')
    const [SearchName, setSearchName] = useState()
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(10)
    const [Result, setResult] = useState()
    const [Lenght, setLenght] = useState()
    const [LocationValue, setLocation] = useState()
    const [ShipmentArray, setShippingArray] = useState([])
    const shipmentLocation = [
        "pending",
        "warehouse",
        "in transit",
        "completed"
    ]
    const RequestType = request.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })
    const ShipmentLocation = shipmentLocation.map((item, index) => {
        return <Select.Option key={index} value={item}> {item}</Select.Option >
    })

    const handleRequestList = (value) => {
        setRequest(value)
    }
    const handleLocation = (value) => {
        setRequest("location")
        setLocation(value)
    }
    const setDefault1 = (event) => {
        event.preventDefault()
    }
    const setDefault2 = (event) => {
        event.preventDefault()
    }
    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        setRequest("search")
        if (name === "searchPO") {
            setSearchValue(value)
            setSearchName("dryCargo")
            document.getElementById('secondField').disabled = true
            if (value === "") {
                document.getElementById('secondField').disabled = false
            }
        }
        else {
            setSearchValue(value)
            setSearchName("vehicle")
            document.getElementById('firstField').disabled = true
            if (value === "") {
                document.getElementById('firstField').disabled = false
            }
        }

    }


    function getRequest(params) {
        Axios.post(`/api/shipping/getShippingRequest?type=${Request} `, params)
            .then(response => {
                if (response.data.success) {
                    setResult(response.data.AllShippingRequest)
                    console.log(response.data.AllShippingRequest)
                    console.log(response.data.postLength)
                    setLenght(response.data.postLength)

                    if (Request === "search") {
                        const shipmentArray = []
                        shipmentArray.push(response.data.AllShippingRequest)
                        setShippingArray(shipmentArray);
                    }
                }
            })
    }

    const onSubmit = () => {
        let variables = {
            searchvalue: SearchValue,
            skip: Skip,
            limit: Limit,
            location: LocationValue
        }
        getRequest(variables)
    }

    //get the remaining data after the first eight
    const onLoadMore = () => {
        let limit = Limit + Limit;
        setLimit(limit)
        const variables = {
            //skip of 8
            skip: Skip,
            limit: limit,
            searchvalue: SearchValue,
        }

        getRequest(variables)
    }

    return (

        <div style={{ paddingTop: '80px' }} >

            <h2>Search Freight</h2>
            <form>
                <Row gutter={[16, 16]}>
                    <Col lg={6} md={6} xs={24} >
                        <Select name="cargoType" placeholder="filter by request" id="requestSearch" onChange={handleRequestList} >
                            {RequestType}
                        </Select >
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Select name="location" placeholder="filter by status" id="areaSearch" onChange={handleLocation}>
                            {ShipmentLocation}
                        </Select >
                    </Col>

                    <Col lg={6} md={6} xs={24} >
                        <Input type="text" placeholder="search #PO" onChange={handleInput} id="firstField" name="searchPO" />
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Input type="text" placeholder="search #VIN" onChange={handleInput} id="secondField" name="searchVIN" />
                    </Col>
                </Row>

                <Button
                    type="primary"
                    onClick={onSubmit}
                >
                    Search
                </Button>

                <RequestFilter
                    requestType={Request}
                    searchvalue={SearchValue}
                    Result={Result}
                    Lenght={Lenght}
                    ShipmentArray={ShipmentArray}
                    Limit={Limit}
                    onLoadMore={onLoadMore}
                />
            </form>
        </div>
    )
}

export default FreightList
