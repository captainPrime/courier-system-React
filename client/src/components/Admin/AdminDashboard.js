import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Button, Empty } from 'antd'
function AdminDashboard() {

    const [Lenght, setLenght] = useState()
    const [Result, setResult] = useState()

    const [Lenght2, setLenght2] = useState()
    const [Result2, setResult2] = useState()

    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)

    function getAdminShippingRequest(params) {
        Axios.post(`/api/shipping/getAdminShippingRequest?type=${Request} `, params)
            .then(response => {
                if (response.data.success) {
                    setResult(response.data.AllShippingRequest)
                    //console.log(response.data.AllShippingRequest)
                    setLenght(response.data.postLength)
                }
            })
    }

    function getAdminInlandRequest(params) {
        Axios.post(`/api/shipping/getAdminInlandRequest?type=${Request} `, params)
            .then(response => {
                if (response.data.success) {
                    setResult2(response.data.AllShippingRequest)
                    //console.log(response.data.AllShippingRequest)
                    setLenght2(response.data.postLength)
                }
            })
    }

    useEffect(() => {
        let variables = {
            skip: Skip,
            limit: Limit
        }


        getAdminShippingRequest(variables)
        getAdminInlandRequest(variables)
    })



    const onLoadMore = (event) => {
        let limit = Limit + Limit;
        setLimit(limit)
        const variables = {
            //skip of 8
            skip: Skip,
            limit: limit,
        }

        if (event.target.name === "first-button") {
            getAdminShippingRequest(variables)
        }

        else {
            getAdminInlandRequest(variables)
        }

    }


    return (
        <div style={{ padding: '40px' }}>
            <h3>latest Shipping Request</h3>
            <br />
            {Lenght > 0 || Result &&
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


                            <tbody>
                                {Result && Result.map((item, index) => (
                                    <tr key={index}>
                                        <td><a href={`/admin/${item._id}/${item.typeOFRequest}`}>{item.uid}</a></td>
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
                        </table>
                    </div>
                    <br />
                    <Button name="first-button" type="primary" onClick={onLoadMore}> Load More </Button>
                </div>
            }

            <br />

            <h3>latest Inland Request</h3>
            <br />
            {Lenght2 > 0 || Result2 &&
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


                            <tbody>
                                {Result2 && Result2.map((item, index) => (
                                    <tr key={index}>
                                        <td><a href={`/admin/${item._id}/${item.typeOFRequest}`}>{item.uid}</a></td>
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
                        </table>
                    </div>
                    <br />
                    <Button type="primary" onClick={onLoadMore}> Load More </Button>
                </div>
            }

        </div>
    )
}

export default AdminDashboard
