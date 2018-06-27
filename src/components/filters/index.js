import './index.scss'
import 'react-select/dist/react-select.css';
import React from 'react'
import { flightTypes } from "../../utils";
import DatePicker from 'react-date-picker'
import Select from 'react-select';

export default ({ flightType, onFlightTypeChange, destinationSearch, onDestinationSearchChange, datePicked, onDateChange, hours, hoursPicked, onHoursChange }) => (
    <div className="filters">
        <div className="flight-type">
            <label className="flight-type__label">
                <input className="flight-type__input" onChange={() => onFlightTypeChange(flightTypes.DEPARTURE)} type="radio" name="flightType" checked={flightType === flightTypes.DEPARTURE} />
                <span className="flight-type__name">Departures</span>
            </label>
        </div>

        <div className="flight-type">
            <label className="flight-type__label">
                <input className="flight-type__input" onChange={() => onFlightTypeChange(flightTypes.ARRIVAL)} type="radio" name="flightType" checked={flightType === flightTypes.ARRIVAL} />
                <span className="flight-type__name">Arrivals</span>
            </label>
        </div>

        <div className="filters__bar">
            <div className="search">
                <input onChange={e => onDestinationSearchChange(e.target.value)} value={destinationSearch} className="search__input" placeholder="Type a destination" type="text"/>
            </div>
            <div className="timepicker">
                <Select onChange={hours => onHoursChange(hours)} value={hoursPicked} clearable={false} options={hours} className="timepicker__input" placeholder="Select hours" />
            </div>
            <div className="datepicker">
                <DatePicker minDate={new Date()} onChange={date => onDateChange(date)} value={datePicked} clearIcon={false} />
            </div>
        </div>

    </div>
)