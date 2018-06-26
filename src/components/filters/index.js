import './index.scss'
import 'react-select/dist/react-select.css';
import React, { Component } from 'react'
import { flightTypes } from "../../utils";
import DatePicker from 'react-date-picker'
import Select from 'react-select';
export default class extends Component {

    render() {
        const {flightType, onFlightTypeChange, datePicked, onDateChange, time, } = this.props

        return (
            <div className="filters">
                <label className="flight-type">
                    <input className="flight-type__input" onChange={() => onFlightTypeChange(flightTypes.DEPARTURE)} type="radio" name="flightType" checked={flightType === flightTypes.DEPARTURE} />
                    <span className="flight-type__name">Departures</span>
                </label>

                <label className="flight-type">
                    <input className="flight-type__input" onChange={() => onFlightTypeChange(flightTypes.ARRIVAL)} type="radio" name="flightType" checked={flightType === flightTypes.ARRIVAL} />
                    <span className="flight-type__name">Arrivals</span>
                </label>

                <div className="filters__bar">
                    <div className="search">
                        <Select placeholder="Type a destination" />
                    </div>
                    <div className="datepicker">
                        <DatePicker minDate={new Date()} onChange={date => onDateChange(date)} value={datePicked}/>
                    </div>
                </div>

            </div>
        )
    }
}