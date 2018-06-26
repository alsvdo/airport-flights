import './index.scss'
import React, { Component } from 'react'
import { flightTypes, scrapeSite } from "../../utils"
import Filters from '../filters'
import Flight from '../flight'

const departureUrl = 'https://www.cph.dk/flyinformation/afgange'
const arrivalUrl = 'https://www.cph.dk/flyinformation/ankomster'

export default class extends Component {

    state = {
        flightType: flightTypes.DEPARTURE,
        datePicked: new Date(),
        timePicked: null,
        listOfFlights: []
    }

    componentWillMount() {
        scrapeSite(departureUrl)
            .then(listOfFlights => this.setState({ listOfFlights }))
    }

    changeFlightType = type => {
        let promise = null;

        if (type === flightTypes.ARRIVAL) {
            promise = scrapeSite(arrivalUrl)
        }
        else if (type === flightTypes.DEPARTURE) {
            promise = scrapeSite(departureUrl)
        }

        promise.then(listOfFlights => {
            this.setState({
                flightType: type,
                listOfFlights
            })
        })
    }

    changeDate = date => {
    }

    render() {
        const { datePicked, listOfFlights, flightType } = this.state

        if(!listOfFlights.length) return null

        return (
            <div className="flight-list">
                <Filters datePicked={datePicked} onDateChange={date => this.changeDate(date)} flightType={flightType} onFlightTypeChange={type => this.changeFlightType(type)} />

                <table className="flight-list__table">
                    <thead>
                        <tr className="flight-list__header">
                            <th className="flight-list__category">When</th>
                            <th className="flight-list__category">Expected</th>
                            <th className="flight-list__category">Company</th>
                            <th className="flight-list__category">Destination</th>
                            <th className="flight-list__category">Gate</th>
                            <th className="flight-list__category">Terminal</th>
                            <th className="flight-list__category">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfFlights.map(flight =>
                            <Flight key={flight.id} data={flight} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}