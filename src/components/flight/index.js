import './index.scss'
import React, { Component } from 'react'

export default ({ data }) => (
    <tr className="flight">
        <td className="flight__cell">{data.time}</td>
        <td className="flight__cell"><b>{data.expectedTime}</b></td>
        <td className="flight__cell">{data.company}</td>
        <td className="flight__cell">{data.destination}</td>
        <td className="flight__cell">{data.gate}</td>
        <td className="flight__cell">{data.terminal}</td>
        <td className="flight__cell">{data.status}</td>
    </tr>
)