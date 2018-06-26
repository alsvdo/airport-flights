import React, { Component } from 'react'
import FlightList from './flight-list'

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <h1>
                    CPH Airport
                    <span className="light-text"> - Arrivals & Departures</span>
                </h1>

                <FlightList />

            </div>
        )
    }
}