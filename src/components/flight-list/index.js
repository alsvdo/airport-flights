import './index.scss'
import React, { Component } from 'react'
import { flightTypes, scrapeSite, generateHours } from "../../utils"
import { BubbleLoader } from "react-css-loaders";
import Filters from '../filters'
import Flight from '../flight'

const departureUrl = 'https://www.cph.dk/flyinformation/afgange'
const arrivalUrl = 'https://www.cph.dk/flyinformation/ankomster'

const hours = generateHours()

export default class extends Component {

    state = {
        flightType: flightTypes.DEPARTURE,
        flightTypeUrl: departureUrl,
        destinationSearch: '',
        datePicked: new Date(),
        hours: hours,
        hoursPicked: hours[0],
        listOfFlights: [],
        loading: true
    }

    componentWillMount() {
        scrapeSite(departureUrl)
            .then(listOfFlights => this.setState({ loading: false, listOfFlights }))
    }

    changeDestinationSearch = value => {
        this.setState({ destinationSearch: value })
    }

    changeFlightType = type => {
        let promise = null;
        let typeUrl = null

        this.setState({ loading: true })

        if (type === flightTypes.DEPARTURE) {
            promise = scrapeSite(departureUrl)
            typeUrl = departureUrl
        }
        else if (type === flightTypes.ARRIVAL) {
            promise = scrapeSite(arrivalUrl)
            typeUrl = arrivalUrl
        }

        promise.then(listOfFlights => {
            this.setState({
                flightType: type,
                flightTypeUrl: typeUrl,
                loading: false,
                datePicked: new Date(),
                listOfFlights
            })
        })
    }

    changeDate = date => {
        if (!date) return
        this.setState({ loading: true })

        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()

        const dateUrl = `${this.state.flightTypeUrl}?date=${day}%20-%20${month}%20-%20${year}`

        scrapeSite(dateUrl).then(listOfFlights => {
            this.setState({
                datePicked: date,
                loading: false,
                listOfFlights
            })
        })
    }

    changeTime = hours => {
        this.setState({ hoursPicked: hours })
    }

    render() {
        const { destinationSearch, hours, datePicked, hoursPicked, listOfFlights, flightType, loading } = this.state

        const filteredFlights = listOfFlights
            .filter(flight => (flight.destination.toLowerCase().indexOf(destinationSearch.toLowerCase()) !== -1))
            .filter(flight => {
                const flightHoursSubstr = parseInt(flight.time.substring(0, 2))
                const hoursPickedSubstr = parseInt(hoursPicked.label.substring(0, 2))

                return flightHoursSubstr >= hoursPickedSubstr
            })

        return (
            <div className="flight-list">
                <Filters destinationSearch={destinationSearch} onDestinationSearchChange={this.changeDestinationSearch} hours={hours} hoursPicked={hoursPicked} onHoursChange={this.changeTime}
                    datePicked={datePicked} onDateChange={this.changeDate}
                    flightType={flightType} onFlightTypeChange={this.changeFlightType} />

                {loading
                    ? <div className="loader">
                        <BubbleLoader color="#1abc9c" duration={0.8} />
                    </div>

                    : <table className="flight-list__table">
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
                            {filteredFlights.map(flight =>
                                <Flight key={flight.id} data={flight} />
                            )}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}