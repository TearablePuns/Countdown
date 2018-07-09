import React, { Component } from 'react';
import Picker from './picker';
import Button from './button';
import Clock from './clock';
import ChangeDate from './changeDate';
import LargeText from './largeText';

import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.timer = 0;
    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      age: 0
    }

    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleChange = function (date) {
    console.log('APP JS HANDLE CHANGE', date._d);
    clearInterval(this.timer);
    this.setState({
      startDate: date
    });
  }.bind(this)

  handleGenerate = function () {

    var bday = this.state.startDate.toDate();
    var today = new Date();
    var currentMonth = today.getMonth();
    var birthMonth = bday.getMonth();

    

    var timeBetween = today.getTime() - bday.getTime();
    var daysOld = Math.floor(timeBetween / (1000 * 60 * 60 * 24))
    var yearsOld = Number((daysOld / 365).toFixed(0));
    var ageString = yearsOld.toString();

    this.setState({
      age: yearsOld,
      active: true,
      affix: "th"
    })
    if ((ageString.charAt(ageString.length - 1) == 1) && ageString.charAt(ageString.length - 2) != 1) {
      this.setState({
        affix: "st"
      })
    } else if ((ageString.charAt(ageString.length - 1) == 2) && ageString.charAt(ageString.length - 2) != 1) {
      this.setState({
        affix: "nd"
      })
    } else if ((ageString.charAt(ageString.length - 1) == 3) && ageString.charAt(ageString.length - 2) != 1) {
      this.setState({
        affix: "rd"
      })
    } else {
      this.setState({
        affix: "th"
      })
    }
    if (birthMonth > currentMonth) {
      bday.setFullYear(today.getFullYear())
    } else if (birthMonth < currentMonth) {
      bday.setFullYear(today.getFullYear() + 1)
    } else if (birthMonth == currentMonth) {
      var currentDay = today.getDate();
      var birthDay = bday.getDate();

      if (birthDay > currentDay) {
        bday.setFullYear(today.getFullYear())
      }
      if (birthDay <= currentDay) {
        bday.setFullYear(today.getFullYear() + 1)
      }
    }

    var countDownDate = bday.getTime();

    this.timer = setInterval(function () {

      var now = today.getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const time = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
      const timeRemaining = {
        days,
        hours,
        minutes,
        seconds
      }

      this.setState({ timeRemaining })
      // console.log(this.state.timeRemaining)

      if (distance < 0) {
        clearInterval(this.timer);
      }
    }.bind(this), 1000);
  }.bind(this)

  getBirthDate = function(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if(month < 10) {
      return `0${month}/${day}`
    }
    return `${month}/${day}`
  }.bind(this);
  renderItems = function () {
    if (this.state.active) {
      return [
        <Clock key={0} timeRemaining={this.state.timeRemaining} />,
        ChangeDate('Change Date', () => this.setState({ active: false })),
        LargeText(this.getBirthDate(this.state.startDate.toDate())),
        <label key={3} className="grid__remaining">remaining until the {this.state.age}{this.state.affix} occurrence of this event</label>
      ]
    } else {
      return [
        <Picker key={0} startDate={this.state.startDate} callback={(date) => this.handleChange(date)} />,
        Button('Generate Countdown', () => this.handleGenerate())
      ]
    }
  }.bind(this)

  render() {

    return (
      <div className="grid">
        <h1 className="grid__title">Countdown</h1>
        <div className="grid__skew-dark-two"></div>
        <div className="grid__skew-dark-three"></div>

        <div className="grid__skew-light-one"></div>
        <div className="grid__skew-light-two"></div>
        <div className="grid__skew-light-three-box"></div>

        {this.renderItems()}
      </div>
    );
  }
}
