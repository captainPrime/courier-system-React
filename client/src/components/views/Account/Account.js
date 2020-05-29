import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, Button, Select, Descriptions, message } from 'antd';
import Axios from 'axios'
import EditProfile from './sections/EditProfile.js'

function Account(props) {

    // console.log()

    const [Profile, setUser] = useState([])

    useEffect(() => {
        Axios.get('/api/users/getUser')
            .then(response => {
                setUser(response.data.userInfo)
            })
    })

    const [Company, setComapny] = useState()
    const [FirstName, setFirstName] = useState()

    const handleInput = (event) => {

        const name = event.target.name
        const value = event.target.value

        if (name === 'firstname') setFirstName(value)
    }

    return (
        <div style={{ paddingTop: '40px', }}>

            {Profile && Profile.map((user, i) => {

                return (
                    <div style={{ paddingTop: '40px', }}>
                        <h2>Account {user.UI}</h2>
                        <form>
                            <div>
                                <div style={{ border: 'solid 1px lightgrey', padding: '20px' }}>
                                    <Descriptions title='Account Information'>
                                        <Descriptions.Item label='FirstName'><span style={{ fontWeight: 'bold' }}>{user.name}</span></Descriptions.Item>
                                        <Descriptions.Item label='LastName'><span style={{ fontWeight: 'bold' }}>{user.lastname}</span></Descriptions.Item>

                                        <Descriptions.Item label='Company'><span style={{ fontWeight: 'bold' }}>{user.company}</span></Descriptions.Item>
                                        <Descriptions.Item label='Country'><span style={{ fontWeight: 'bold' }}>{user.country}</span></Descriptions.Item>
                                        <Descriptions.Item label='State'><span style={{ fontWeight: 'bold' }}>{user.state}</span></Descriptions.Item>
                                        <Descriptions.Item label='City'><span style={{ fontWeight: 'bold' }}>{user.city}</span></Descriptions.Item>
                                        <Descriptions.Item label='ZIP'><span style={{ fontWeight: 'bold' }}>{user.zip}</span></Descriptions.Item>
                                        <Descriptions.Item label='Address 1'><span style={{ fontWeight: 'bold' }}>{user.address1}</span></Descriptions.Item>
                                        <Descriptions.Item label='Address 2'><span style={{ fontWeight: 'bold' }}>{user.address2}</span></Descriptions.Item>
                                        <Descriptions.Item label='Phone 1'><span style={{ fontWeight: 'bold' }}>{user.phone1}</span></Descriptions.Item>
                                        <Descriptions.Item label='Phone 2'><span style={{ fontWeight: 'bold' }}>{user.phone2}</span></Descriptions.Item>
                                    </Descriptions>
                                    <br />
                                    <Descriptions title='User Information'>
                                        <Descriptions.Item label='User Name'><span style={{ fontWeight: 'bold' }}>{user.username}</span></Descriptions.Item>
                                        <Descriptions.Item label='Login Email'><span style={{ fontWeight: 'bold' }}>{user.email}</span></Descriptions.Item>
                                    </Descriptions>
                                </div>

                            </div>

                        </form>

                        <br />
                        <EditProfile
                            firstname={user.name}
                            company={user.company}
                            lastname={user.lastname}
                            country={user.country}
                            state={user.state}
                            city={user.city}
                            zip={user.zip}
                            address1={user.address1}
                            address2={user.address2}
                            phone1={user.phone1}
                            phone2={user.phone2}
                            username={user.username}
                            password={user.password}
                            email={user.email}
                        />
                    </div>
                )
            })}


        </div>
    )
}

export default Account
