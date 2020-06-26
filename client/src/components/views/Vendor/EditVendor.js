import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Modal, Button, Input, Form, message, Row, Col } from 'antd'

function EditVendor(props) {
    const showModal = () => {
        setvisible(true)
        setResult(props.result)
    }

    const [visible, setvisible] = useState(false)
    const [Email, setEmail] = useState("")
    const [Result, setResult] = useState([])
    const [Company, setCompany] = useState(Result.Company)


    const handleCancel = e => {
        setvisible(false)
    };

    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'company') setCompany(value)
        /*         else if (name === 'firstname') setFirstname(value)
                else if (name === 'lastname') setLastname(value)
                else if (name === 'country') setCountry(value)
                else if (name === 'state') setState(value)
                else if (name === 'city') setCity(value)
                else if (name === 'zip') setZip(value)
                else if (name === 'address1') setAddress1(value)
                else if (name === 'address2') setAddress2(value)
                else if (name === 'phone1') setPhone1(value)
                else if (name === 'phone2') setPhone2(value)
                else if (name === 'userName') setUserName(value) */


    }

    return (
        <Formik
            initialValues={{
                email: Result.Email,
            }}

            validationSchema={
                Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                })
            }

            onSubmit={(values, { setSubmitting }) => {

                let variables = {
                    /*      Company,
                         IDType,
                         IDNumber,
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
                         Others */
                }

                Axios.post('/api/users/updateVendor', variables)
                    .then(response => {
                        if (response.data.success) {
                            message.success('Vendor Details Successfully updated', 10)
                            //window.location.reload(true)
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
                                    <Form.Item label="Account" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='account' value={Result.UI} onChange={handleInput}></Input>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="Company" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='company' value={Company} onChange={handleInput}></Input>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="First Name" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='firstname' onChange={handleInput} />
                                    </Form.Item>
                                </Col>

                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="Last Name" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='lastname' onChange={handleInput} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} xs={24} >
                                    <Form.Item label="Email" style={{ marginBottom: 0 }} className="label">
                                        <Input type='text' name='email' value={values.email} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </Row>



                        </Modal>
                    </div>

                )

            }}

        </Formik>
    )
}

export default EditVendor
