import React, { useState, useEffect } from 'react'
import { Modal, Button, Input, message, Form, Row, Col, Icon } from 'antd';
import Axios from 'axios'
import { Formik } from 'formik';
import * as Yup from 'yup';

function EditProfile(props) {
    const [visible, setvisible] = useState(false)
    const [company, setCompany] = useState(props.company)
    const [name, setFirstname] = useState(props.firstname)
    const [lastname, setLastname] = useState(props.lastname)
    const [country, setCountry] = useState(props.country)
    const [state, setState] = useState(props.state)
    const [city, setCity] = useState(props.city)
    const [zip, setZip] = useState(props.zip)
    const [address1, setAddress1] = useState(props.address1)
    const [address2, setAddress2] = useState(props.address2)
    const [phone1, setPhone1] = useState(props.phone1)
    const [phone2, setPhone2] = useState(props.phone2)
    const [username, setUserName] = useState(props.username)

    const showModal = () => {
        setvisible(true)
    };



    const handleCancel = e => {
        console.log(e);
        setvisible(false)
    };

    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'company') setCompany(value)
        else if (name === 'firstname') setFirstname(value)
        else if (name === 'lastname') setLastname(value)
        else if (name === 'country') setCountry(value)
        else if (name === 'state') setState(value)
        else if (name === 'city') setCity(value)
        else if (name === 'zip') setZip(value)
        else if (name === 'address1') setAddress1(value)
        else if (name === 'address2') setAddress2(value)
        else if (name === 'phone1') setPhone1(value)
        else if (name === 'phone2') setPhone2(value)
        else if (name === 'userName') setUserName(value)


    }

    return (
        <Formik
            initialValues={{
                email: props.email,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid'),

            })}
            onSubmit={(values, { setSubmitting }) => {

                let variables = {
                    company,
                    name,
                    lastname,
                    country,
                    state,
                    city,
                    zip,
                    address1,
                    address2,
                    phone1,
                    phone2,
                    username,
                    email: values.email,
                }

                Axios.post('/api/users/updateprofile', variables)
                    .then(response => {
                        if (response.data.success) {
                            message.success('Profile Details Successfully updated', 10)
                            window.location.reload(true)
                        }
                    })
                setvisible(false)
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    handleBlur
                } = props;

                return (
                    <div>
                        <Button type="primary" onClick={showModal}>
                            Edit Profile
                       </Button>
                        <Modal
                            title="Edit Profile"
                            visible={visible}
                            onOk={handleSubmit}
                            onCancel={handleCancel}
                            width="70%"
                        >

                            <Row gutter={[16, 16]}>
                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="Company" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='company' value={company} onChange={handleInput}></Input>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="First Name" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='firstname' value={name} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="Last Name" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='lastname' value={lastname} onChange={handleInput} />
                                    </Form.Item>
                                </Col>


                            </Row>

                            <Row gutter={[16, 16]}>
                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="Country" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='country' value={country} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="State" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='state' value={state} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="City" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='city' value={city} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="ZIP" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='zip' value={zip} onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="Address 1" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='address1' value={address1} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="Address 2" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='address2' value={address2} onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="Phone 1" style={{ marginBottom: 0 }} className="label">
                                        <Input type='tel' name='phone1' value={phone1} onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={6} md={12} xs={24} >
                                    <Form.Item label="Phone 2" style={{ marginBottom: 0 }} className="label">
                                        <Input type='tel' name='phone2' value={phone2} onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <h3>User Information</h3>
                            <Row gutter={[16, 16]}>

                                <Col lg={12} md={12} xs={24} >
                                    <Form.Item style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='userName' value={username} onChange={handleInput} />
                                    </Form.Item>
                                </Col>



                                <Col lg={12} md={12} xs={24} >
                                    <Form.Item className="label" style={{ marginTop: '-17px' }}>
                                        <Input id="email" onBlur={handleBlur} type="email" placeholder="email" style={{ marginTop: '20px', marginBottom: '20px' }} onChange={handleChange} value={values.email}
                                            className={
                                                errors.email && touched.email ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.email && touched.email && (
                                            <div style={{ marginTop: '-27px' }} className="input-feedback">{errors.email}</div>
                                        )}
                                    </Form.Item>
                                </Col>


                            </Row>

                            {/*     <Input.Password type="text" placeholder="new password" style={{ marginTop: '20px' }} />
                                   <Input.Password type="text" placeholder="confirm new password" style={{ marginTop: '20px' }} /> */}

                        </Modal>
                    </div>
                )
            }}

        </Formik>
    )


}

export default EditProfile
