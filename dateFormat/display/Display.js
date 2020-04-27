import React, { Component } from 'react';
import styles from './Display.module.css'
import axios from 'axios';
import { APIs } from '../../keyAPI';
import { dateFormat } from '../../dateFormat/date'

const api = {
    "key": APIs.keyAPI,
    "url": "http://api.openweathermap.org/data/2.5/weather?q="
}

export class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchCity: '',
            weatherAPI: []
        }
        this.myRef = React.createRef()
    }


    componentDidMount() {
        this.myRef.current.focus();
    }

    getDate = (day) => {
        let months = dateFormat.months;
        let days = dateFormat.days;

        let currentDay = days[day.getDay()], // Sunday - Saturday : 0 - 6
            currentDate = day.getDate(), // the day of the month
            currentMonth = months[day.getMonth()],
            currentYear = day.getFullYear()

        return currentDay + ', ' + currentMonth + ' ' + currentDate + ' ' + currentYear
    }

    handleKeyUp = (x) => {
        if (x.keyCode === 13) {
            axios.get(api.url + this.state.searchCity + '&units=metric&APPID=' + api.key)
                .then((res) => {
                    console.log("Success!");
                    this.setState({
                        searchCity: '',
                        weatherAPI: res.data
                    })
                })
                .catch((err) => {
                    alert("Hey bro, don't have anything like that? ");
                    this.setState({
                        searchCity: '',
                        weatherAPI: []
                    })
                })
        }
    }

    inputOnChange = (x) => {
        this.setState({
            searchCity: x.target.value
        })
    }

    //////////
    render() {
        const { weatherAPI } = this.state;

        return (
            <div className={typeof (weatherAPI.main) !== 'undefined' ? (weatherAPI.main.temp > 16 ? (styles.display_warm) : (weatherAPI.weather[0].main === 'Rain' ? (styles.display_rain) : (styles.display))) : (styles.display)}>
                <main>
                    <div className={styles.search} type="submit">
                        <input
                            onChange={this.inputOnChange}
                            onKeyUp={this.handleKeyUp}
                            ref={this.myRef}
                            className={styles.search_input}
                            type="text"
                            name="searchCity"
                            value={this.state.searchCity}
                            placeholder="Search your city..."
                        />
                    </div>
                    {typeof (weatherAPI.main) !== 'undefined' ? (
                        <div className={styles.location}>
                            <div className={styles.location_name}>
                                {weatherAPI.name}, {weatherAPI.sys.country}
                            </div>
                            <div className={styles.date}>
                                {this.getDate(new Date())}
                            </div>
                            <div className={styles.popup}>
                                <div className={styles.temp}>
                                    {weatherAPI.main.temp} °C
                            </div>

                            </div>
                        </div>
                    ) : ('')}
                </main>
            </div>
        );
    }
}

export default Display;
