import './index.scss'
import React, { Component } from 'react'
import { scrapeSite } from "../../utils"
import Filters from '../filters'
import Flight from '../flight'

export default class extends Component {

    state = {
        flightType: null,
        arrivalList: [],
        departureList: []
    }

    componentWillMount() {
        scrapeSite('https://www.cph.dk/flyinformation/afgange')
            .then(listOfFlights => {
                this.setState({ arrivalList: listOfFlights })
            })
    }

    render() {
        const { arrivalList, flightType } = this.state

        return (
            <div className="flight-list">
                <Filters flightType={flightType} onFlightTypeChange={type => this.setState({ flightType: type })} />

                <table className="flight-list__table">
                    <thead>
                        <tr className="flight-list__header">
                            <th className="flight-list__category">Tid</th>
                            <th className="flight-list__category">Forventet</th>
                            <th className="flight-list__category">Selskab</th>
                            <th className="flight-list__category">Destination</th>
                            <th className="flight-list__category">Gate</th>
                            <th className="flight-list__category">Terminal</th>
                            <th className="flight-list__category">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrivalList.map(flight =>
                            <Flight key={flight.id} data={flight} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}