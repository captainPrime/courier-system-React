import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { message, table, Empty, Button } from 'antd'
function RequestFilter(props) {
    return (
        <div style={{ width: '100%', margin: '3em auto' }} className="List-Area">
            <br /><br />
            {props.ConsigneeArray.length >0 && props.ConsigneeArray !== null ?
                <div>
                    <div style={{ overflow: 'scroll', }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>UI</th>
                                    <th>company</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Sales Rep</th>
                                    <th>Email</th>
                                    <th>country</th>
                                    <th>City</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.ConsigneeArray !== null && props.ConsigneeArray.map((item, index) => (
                                    <tr key={index}>
                                        <td><a href={`/shipment/${item.UI}/${item.typeOFRequest}`}>{item.UI}</a></td>
                                        <td>{item.Company}</td>
                                        <td>{item.FirstName}</td>
                                        <td>{item.LastName}</td>
                                        <td>{item.SalesRep}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Country}</td>
                                        <td>{item.City}</td>
                                        <td>{item.Phone1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <br />
                    <Empty description={false} />
                    <div style={{ textAlign: 'center' }}>No Request recorded<br /> Add a new Request or filter through</div>

                </div>
            }
        </div>
    )
}
export default RequestFilter