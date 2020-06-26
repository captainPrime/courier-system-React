import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Descriptions } from 'antd'
import EditVendor from '../Vendor/EditVendor'
function Single(props) {

    const UI = props.match.params.userID
    const typeOfRequest = props.match.params.typeOfRequest

    const [Result, setResult] = useState([])


    useEffect(() => {
        Axios.get(`/api/users/user_by_ui?id=${UI}&type=${typeOfRequest}`)
            .then(response => {
                if (response.data.success) {
                    setResult(response.data.result)
                }
            })
    }, [])


    return (
        <div style={{ paddingTop: '60px' }}>
            <h2>{typeOfRequest}</h2>
            <br />
            <form>
                <div style={{ paddingTop: '40px', }}>
                    <div>
                        <div style={{ border: 'solid 1px lightgrey', padding: '10px' }}>


                            <Descriptions>
                                < Descriptions.Item label='Account'><span style={{ fontWeight: 'bold' }}>{Result.UI}</span></Descriptions.Item>
                                <Descriptions.Item label='Company'><span style={{ fontWeight: 'bold' }}>{Result.Company}</span></Descriptions.Item>
                                <Descriptions.Item label='FirstName'><span style={{ fontWeight: 'bold' }}>{Result.FirstName}</span></Descriptions.Item>
                                <Descriptions.Item label='LastName'><span style={{ fontWeight: 'bold' }}>{Result.LastName}</span></Descriptions.Item>
                                <Descriptions.Item label='Email'><span style={{ fontWeight: 'bold' }}>{Result.Email}</span></Descriptions.Item>
                                <Descriptions.Item label='SalesRep'><span style={{ fontWeight: 'bold' }}>{Result.SalesRep}</span></Descriptions.Item>
                                <Descriptions.Item label='Country'><span style={{ fontWeight: 'bold' }}>{Result.Country}</span></Descriptions.Item>
                                <Descriptions.Item label='City'><span style={{ fontWeight: 'bold' }}>{Result.City}</span></Descriptions.Item>
                                <Descriptions.Item label='Address1'><span style={{ fontWeight: 'bold' }}>{Result.Address1}</span></Descriptions.Item>
                                <Descriptions.Item label='Address2'><span style={{ fontWeight: 'bold' }}>{Result.Address2}</span></Descriptions.Item>
                                <Descriptions.Item label='ZIP'><span style={{ fontWeight: 'bold' }}>{Result.ZIP}</span></Descriptions.Item>
                                <Descriptions.Item label='Phone1'><span style={{ fontWeight: 'bold' }}>{Result.Phone1}</span></Descriptions.Item>
                                <Descriptions.Item label='Phone2'><span style={{ fontWeight: 'bold' }}>{Result.Phone2}</span></Descriptions.Item>
                                <Descriptions.Item label='Others'><span style={{ fontWeight: 'bold' }}>{Result.Others}</span></Descriptions.Item>

                                <Descriptions.Item label='IDType'><span style={{ fontWeight: 'bold' }}>{Result.IDType}</span></Descriptions.Item>
                                <Descriptions.Item label='IDNumber'><span style={{ fontWeight: 'bold' }}>{Result.IDNumber}</span></Descriptions.Item>

                            </Descriptions>

                            <br />
                            {/*   <EditVendor
                                result={Result}
                            /> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Single
