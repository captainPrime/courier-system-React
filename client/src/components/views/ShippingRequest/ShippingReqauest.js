import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Radio, Select, Typography, DatePicker, notification, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import { shippingRequest } from "../../../_actions/user_actions";
import Axios from 'axios';
import { shipFromCountries, shipToCountries, shipFromPort, shipToPort, shipFromState, shipToState, sizes, commodity, moveType, mode } from './data/data.js'
import { useDispatch } from "react-redux";
import uuid from 'uuid'


const { Option } = Select;

const { Title } = Typography

function ShippingRequest(props) {
    const dispatch = useDispatch();
    //===================VARIABLES===================================
    const [Dimension, setdimensionvalue] = useState('inches')
    const [Commodity, setCommodity] = useState()
    const [Description, setdecription] = useState()
    const [Weight, setweight] = useState()
    const [Quantity, setquantity] = useState()
    const [MovementType, setmovementType] = useState()
    const [Pieces, setpieces] = useState()
    const [Declare, setdeclare] = useState()

    const [FromCountry, setFromCountry] = useState()
    const [ToCountry, setToCountry] = useState()
    const [ToState, setToState] = useState()
    const [FromState, setFromState] = useState()
    const [FromPort, setFromPort] = useState()
    const [ToPort, setToPort] = useState()
    const [ToCity, setToCity] = useState()
    const [ToZIP, setToZIP] = useState()
    const [FromZIP, setFromZIP] = useState()
    const [FromCity, setFromCity] = useState()

    const [Note, setnote] = useState()
    const [Mode, setMode] = useState()
    const [DateValue, setDate] = useState()
    const [HWD1, setHWD1] = useState(0)
    const [HWD2, setHWD2] = useState(0)
    const [HWD3, setHWD3] = useState(0)

    //console.log(props.user.userData.name)


    //----------------------------------------------------------------------
    let result = []
    let mapFunction = (parameter) => {
        parameter.map((item, index) => {
            result.push(<Option key={index} value={item}>{item}</Option>)
        })

    }

    //-------------------------------------------------------------------------------------

    //============================SELECT AND RADIO BUTTONS POPULATORS==========================
    let pieces = [];
    for (let i = 1; i <= 10; i++) {
        pieces.push(<Option key={i}>{i}</Option>)
    }
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

    const country = shipFromCountries.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const SizeCal = sizes.map((item, index) => {
        return <Option key={index} value={item}>{item}</Option>
    })

    const Movement = moveType.map((item, index) => {
        return <Select.Option key={index} value={item} >{item}</Select.Option>
    })

    const CommodityList = commodity.map((item, index) => {
        return <Radio key={index} value={item}>{item}</Radio>
    })

    const ModeList = mode.map((item, index) => {
        return <Radio key={index} value={item}>{item}</Radio>
    })
    //-------------------------------------------------------------------------------------

    //============================HANDLERS============================================
    const handleDimension = (value) => {
        setdimensionvalue(value)
    }
    const handleMovement = (value) => {
        setmovementType(value)
    }
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

    const handleRadioButton = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'mode') setMode(value)
        else if (name === 'commodity') setCommodity(value)
    }

    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'weight') setweight(value)
        else if (name === 'quantity') setquantity(value)
        else if (name === 'description') setdecription(value)
        else if (name === 'declaredValue') setdeclare(value)
        else if (name === 'note') setnote(value)
        else if (name === 'toZIP') setToZIP(value)
        else if (name === 'toCity') setToCity(value)
        else if (name === 'fromCity') setFromCity(value)
        else if (name === 'fromZip') setFromZIP(value)
    }

    const handleDate = (event) => {
        const value = (event._d.getDate() + "-"+ (event._d.getMonth() + 1) + "-" + event._d.getFullYear())
        setDate(value)
    }

    const handleHWD = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (name === 'setHWD1') { setHWD1(value) }
        else if (name === 'setHWD2') { setHWD2(value) }
        else { setHWD3(value) }

        console.log(HWD1, name, value)
    }

    const handlePieces = (value) => {
        console.log(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let variables = {
            // props.user.userData._id is gotten redux AUTH function (user_reducer)

            writer: props.user.userData._id,
            uid: uuid(),
            dimension: Dimension,
            cargo: Commodity,
            description: Description,
            weight: Weight,
            quantity: Quantity,
            movementtype: MovementType,
            pieces: Pieces,
            declare: Declare,
            fromcountry: FromCountry,
            tocountry: ToCountry,
            tostate: ToState,
            fromstate: FromState,
            fromport: FromPort,
            toport: ToPort,
            tocity: ToCity,
            tozip: ToZIP,
            fromzip: FromZIP,
            fromcity: FromCity,
            note: Note,
            mode: Mode,
            datevalue: DateValue,
            hwd1: HWD1,
            hwd2: HWD2,
            hwd3: HWD3,
            typeOFRequest: "shipping request"
        }
        //==========================USING AXIOS DIRECTLY======================================
        Axios.post('/api/shipping/shippingRequest', variables)
            .then(response => {
                if (response.data.success) {
                    alert("Request successfully recorded")
                    message.success('Product successfully uploaded');
                    window.location.reload(true)
                }

                else {
                    message.error('Failed to record request')
                }
            })
        //==========================USING REDUX===============================================
        /*  dispatch(shippingRequest(variables))
              .then(response => {
                  console.log(response.data)
                if (response.payload.success) {
                      message.success('Your request has been successfully recorded')
                      console.log(response.payload.shippingRequest)
                      
                  }
  
                  else {
                      message.error('Failed to record request')
                      console.log('error')
                  } 
              })  */
    }



    //----------------------------------------------------------------------------------

    return (
        <div style={{ paddingTop: '69px', width: '90%', margin: '3em auto' }}>
            <Title level={3} >Cargo Details</Title>
            <form >
                <Row gutter={[16, 16]}>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="Date of Shipment" className="label" >
                            <DatePicker onChange={handleDate} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="Dimension" className="label">
                            <Select name="dimension" defaultValue="inches" onChange={handleDimension}>
                                {SizeCal}
                            </Select >
                        </Form.Item >
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="movement type" className="label">
                            <Select name="movement" placeholder='please select' onChange={handleMovement} >
                                {Movement}
                            </Select >
                        </Form.Item >
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="declare value" className="label">
                            <Input type='text' name='declaredValue' onChange={handleInput} placeholder="type in a value" />
                        </Form.Item >
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} xs={24} >
                        <div style={{ width: '100%', display: 'flex' }}>
                            <Form.Item label="commodity" style={{ marginBottom: 0, width: '50%' }} className="label">
                                <Radio.Group name="commodity" onChange={handleRadioButton}>
                                    {CommodityList}
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="mode" style={{ marginBottom: 0, width: '50%' }} className="label">
                                <Radio.Group name="mode" onChange={handleRadioButton}>
                                    {ModeList}
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col lg={12} md={12} xs={24} >
                        <Form.Item label="HWD" style={{ marginBottom: 0 }} className="label">
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Input
                                    type='number'
                                    style={{ width: '50%', margin: '0 20px 0 0px' }}
                                    onChange={handleHWD} name="setHWD1"
                                    defaultValue='0'
                                /> X
                                <Input type='number'
                                    style={{ width: '50%', margin: '0 20px 0 20px' }}
                                    onChange={handleHWD}
                                    name="setHWD2"
                                    defaultValue='0'
                                /> X
                                <Input type='number'
                                    style={{ width: '50%', margin: '0 20px 0 20px' }}
                                    onChange={handleHWD}
                                    name="setHWD3"
                                    defaultValue='0'
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="commodity description" style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='description' placeholder="year, make and model" onChange={handleInput} />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="weight" style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='weight' onChange={handleInput} />
                        </Form.Item>
                    </Col>

                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="quantity" style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='quantity' onChange={handleInput} />
                        </Form.Item>
                    </Col>

                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="pieces" style={{ marginBottom: 0 }} className="label">
                            <Select name="dimension" defaultValue="1" onChange={handlePieces}  >
                                {pieces}
                            </Select >
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} xs={24} >
                        <h3>Shipping From</h3>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="ShipFromCountries" defaultValue="United States" onChange={handleFromCountry} id="countries">
                                {ShipFromCountries}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="ShipFromState" defaultValue="select state" onChange={handleFromState} >
                                {ShipFromState}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="ShipFromPort" defaultValue="select port" onChange={handleFromPort} >
                                {ShipFromPort}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='fromCity' onChange={handleInput} placeholder="select city" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label" >
                            <Input type='text' name='fromZip' onChange={handleInput} placeholder="Zip" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} xs={24} >
                        <h3>Shipping To</h3>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="shipToCountries" defaultValue="select country" onChange={handleToCountry} >
                                {ShipToCountries}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="shipToState" defaultValue="select state" onChange={handleToState} >
                                {ShipToState}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Select name="shipToPort" defaultValue="select port" onChange={handleToPort} >
                                {ShipToPort}
                            </Select >
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='toCity' onChange={handleInput} placeholder="select city" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }} className="label">
                            <Input type='text' name='toZIP' onChange={handleInput} placeholder="Zip" />
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
                    type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '30%' }} onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </div >
    )

}

export default ShippingRequest