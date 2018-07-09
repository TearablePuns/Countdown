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
    var timer = 0;
    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds:0
      }
    }

    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleChange = function(date) {
    console.log('APP JS HANDLE CHANGE', date._d);
    this.setState({
        startDate: date
    });
  }.bind(this)

  handleGenerate = function() {
    this.setState({active: true})

    var countDownDate = this.state.startDate.toDate().getTime();

    timer=setInterval(function() {

      var now = new Date().getTime();
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

        this.setState({active: true})
    console.log(this.state.timeRemaining)

      if(distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  }.bind(this)

  renderItems = function() {
    if(this.state.active) {
      return [
        <Clock/>,
        ChangeDate('Change Date', () => this.setState({active: false})),
        LargeText('04/03'),
        <label className="grid__remaining">remaining until next occurrence of this event</label>
      ]
    } else {
      return [
        <Picker startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>,
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

        { this.renderItems() }
      </div>
    );
  }
}
