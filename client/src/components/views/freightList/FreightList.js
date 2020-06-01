import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Radio, Select, Typography, DatePicker, notification, message } from 'antd';
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import RequestFilter from './sections/listing'
import Axios from 'axios';

const { Option } = Select;

const { Title } = Typography

const request = ["Shipping Request", "Inland Request"]

function FreightList(props) {

    const [Request, setRequest] = useState()
    const [SearchValue, setSearchValue] = useState('')
    const [SearchName, setSearchName] = useState()

    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(10)

    const [Result, setResult] = useState()
    const [Lenght, setLenght] = useState()
    const [ShipmentArray, setShippingArray] = useState()

    const RequestType = request.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>

    })


    const handleRequestList = (value) => {
        setRequest(value)
        /*      document.getElementById('firstField').value = ''
             document.getElementById('secondField').value = '' */
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
                    //console.log(response.data.AllShippingRequest)
                    setLenght(response.data.postLength)

                    if (Request === "search") {
                        const shipmentArray = []

                        shipmentArray.push(response.data.AllShippingRequest)

                        setShippingArray(shipmentArray)
                    }
                }
            })

    }


    const onSubmit = () => {


        let variables = {
            searchvalue: SearchValue,
            skip: Skip,
            limit: Limit
        }

        //console.log(variables.searchvalue)

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


            <form>
                <Row gutter={[16, 16]}>
                    <Col lg={6} md={6} xs={24} >
                        <Select name="cargoType" placeholder="select shipping request to show" id="requestSearch" onChange={handleRequestList} >
                            {RequestType}
                        </Select >
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Select name="location" defaultValue="Warehouse" id="areaSearch">
                            <Select.Option key={1}>Warehouse</Select.Option>
                            <Select.Option key={2}>In Transit</Select.Option>
                            <Select.Option key={3}>Completed</Select.Option>
                            <Select.Option key={4}>Show All</Select.Option>
                        </Select >
                    </Col>

                    <Col lg={6} md={6} xs={24} >
                        <Input type="text" placeholder="search by #PO" onChange={handleInput} id="firstField" name="searchPO" />
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Input type="text" placeholder="search by #VIN" onChange={handleInput} id="secondField" name="searchVIN" />
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
