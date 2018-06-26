import './index.scss'
import React, { Component } from 'react'

const flightTypes = {
    ARRIVAL: 'arrival',
    DEPARTURE: 'departure'
}

export default class extends Component {

    state = {
    }

    render() {
        const { flightType } = this.props || flightTypes.ARRIVAL
        const { onFlightTypeChange } = this.props
        console.log(flightType);
        
        
        return (
            <div className="filters">
                <div className="flight-type">
                    <label>
                        <input onChange={() => onFlightTypeChange(flightTypes.ARRIVAL)} type="radio" name="flightType" checked={flightType === flightTypes.ARRIVAL} />
                        <span className="flight-type__name">Arrival</span>
                    </label>
                </div>

                <div className="flight-type">
                    <label>
                        <input onChange={() => onFlightTypeChange(flightTypes.DEPARTURE)} type="radio" name="flightType" checked={flightType === flightTypes.DEPARTURE} />
                        <span className="flight-type__name">Departures</span>
                    </label>
                </div>

            </div>
        )
    }
}