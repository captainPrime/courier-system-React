import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { message, table, Empty, Button } from 'antd'

function RequestFilter(props) {
    return (
        <div style={{ width: '100%', margin: '3em auto' }} className="List-Area">
            <br /><br />
            {props.Lenght > 0 || props.Result ?
                <div>
                    <div style={{ overflow: 'scroll', }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>UID</th>
                                    <th>commodity</th>
                                    <th>description</th>
                                    <th>vendor</th>
                                    <th>status</th>
                                    <th>booking date</th>
                                    <th>origin</th>
                                    <th>destination</th>
                                    <th>consignee</th>
                                </tr>
                            </thead>

                            {props.requestType === "search" ?
                                <tbody>
                                    {props.ShipmentArray[0] !== null && props.ShipmentArray.map((item, index) => (
                                        <tr key={index}>
                                            <td><a href={`/shipment/${item._id}/${item.typeOFRequest}`}>{item.uid}</a></td>
                                            <td>{item.cargo}</td>
                                            <td>{item.description}</td>
                                            <td>{item.vendor}</td>
                                            <td>{item.status}</td>
                                            <td>{item.datevalue}</td>
                                            <td>{item.origination}</td>
                                            <td>{item.destination}</td>
                                            <td>{item.consignee}</td>
                                        </tr>
                                    ))}
                                </tbody>

                                :

                                <tbody>
                                    {props.Lenght > 0 && props.Result.map((item, index) => (
                                        <tr key={index}>
                                            <td><a href={`/shipment/${item._id}/${item.typeOFRequest}`}>{item.uid}</a></td>
                                            <td>{item.cargo}</td>
                                            <td>{item.description}</td>
                                            <td>{item.vendor}</td>
                                            <td>{item.status}</td>
                                            <td>{item.datevalue}</td>
                                            <td>{item.origination}</td>
                                            <td>{item.destination}</td>
                                            <td>{item.consignee}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            }


                        </table>
                    </div>
                    <br /><br />
                    {props.Lenght >= props.Limit &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={props.onLoadMore}>Load More</Button>
                        </div>
                    }

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
