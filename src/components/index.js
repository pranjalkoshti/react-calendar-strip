import React, { Component, Fragment } from "react";
import moment from 'moment';

class TimerSegment extends Component {

  defaultDate = new Date(new Date().setDate(new Date().getDate() + 1))

  leadingZero(num) {
    return num < 10 ? "0" + num : num;
  }

  getTimeUntil(deadline) {
    const time =
      Date.parse(deadline) - Date.parse(new Date());

    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      activeWeek: [],
      months: moment.months(),
      years: [],
      selectedDate: moment(),
      display: window.screen.width > 450 ? 'desktop' : 'mobile',
      activeMonth: moment().format("MMMM"),
      activeYear:moment().year()
    };
  }

  componentDidMount() {
    let yearData = [];
    for (let i = 0; i < 100; i++) {
      yearData.push(moment().add(i, 'years').year())
    }
    this.setState({
      years: yearData
    })

    this.getCurrentWeek()
  }

  getCurrentWeek = (i) => {
    var currentDate = i ? moment(i) : moment();
    var weekStart = currentDate.clone().startOf('isoweek');
    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push({
        label: { date: moment(weekStart).add(i, 'days').format('ddd'), day: moment(weekStart).add(i, 'days').format('DD') },
        value: moment(weekStart).add(i, 'days').toISOString()
      })
    }

    this.setState({
      activeWeek: days
    })
  }

  getNextWeek = () => {
    let dd = this.state.activeWeek[this.state.activeWeek.length - 1]
    let dd2 = moment(dd.value).add('days', 1).toISOString()
    this.setState({
      activeMonth: moment(dd2).format("MMMM"),
      activeYear: moment(dd2).year()
    })
    this.getCurrentWeek(dd2)
  }

  getPrevWeek = () => {
    let dd = this.state.activeWeek[0];
    let dd2 = moment(dd.value).subtract('days', 1).toISOString()
    this.setState({
      activeMonth: moment(dd2).format("MMMM"),
      activeYear: moment(dd2).year()
    })
    this.getCurrentWeek(dd2)
  }

  getCurrentWeekOnChange = (type, value) => {
    if (type == 'year') {
      let dd = moment(this.state.selectedDate).set('year', parseInt(value))
      this.setState({
        selectedDate: dd,
        activeMonth: moment(dd).format("MMMM"),
        activeYear: moment(dd).year()
      })
      this.getCurrentWeek(dd.toISOString())
    }

    if (type == 'month') {
      let mm = moment().month(value).format("M");
      let dd = moment(this.state.selectedDate).set('month', mm-1)
      this.setState({
        selectedDate: dd,
        activeMonth: moment(dd).format("MMMM"),
        activeYear: moment(dd).year()
      })
      this.getCurrentWeek(dd.toISOString())
    }
  }


  render() {
    let counterStyle = this.props.counterStyle ? this.props.counterStyle : {};
    let timerStyle = this.props.timerStyle ? this.props.timerStyle : {};
    let labelStyle = this.props.labelStyle ? this.props.labelStyle : {};
    let currentDateStyle = this.props.currentDateStyle ? this.props.currentDateStyle : {};
    let selectedDateStyle = this.props.selectedDateStyle ? this.props.selectedDateStyle : {};

    return (
      <div style={timerStyle} >
        <div style={{ padding: '0px', textAlign: 'center', height: '100%', background: 'none' }}  >
          <div style={{marginBottom:'20px'}}>
            <select value={this.state.activeMonth}
            onChange={(e) => {
              this.getCurrentWeekOnChange('month', e.target.value)
            }}>
              {this.state.months.map((a) => {
                return (
                  <option value={a}>{a}</option>
                )
              })}
            </select>
            <select value={this.state.activeYear}
            onChange={(e) => {
              this.getCurrentWeekOnChange('year', e.target.value)
            }}>
              {this.state.years.map((a) => {
                return (
                  <option value={a}>{a}</option>
                )
              })}
            </select>
          </div>
          {/* <p style={{color: labelStyle.color ? labelStyle.color : 'grey', marginBottom:'0px'}}>STARTS IN</p> */}

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
            <button onClick={() => {
              this.getPrevWeek()
            }}>Prev</button>
            {this.state.activeWeek.map((a) => {
              let obj = {flex:1, height: '100px', cursor: 'pointer', display:'flex',flexDirection:'column',justifyContent:'center', alignContent:'center' }
              let containerStyle = { ...obj,...counterStyle };
              let currentDateFlag = moment().format('DD-MM-YYYY') == moment(a.value).format('DD-MM-YYYY')

              if (currentDateFlag == true) {
                containerStyle = { ...containerStyle, ...currentDateStyle }
              }

              let selectedDateFlag = this.state.selectedDate ? moment(a.value).format('DD-MM-YYYY') == moment(this.state.selectedDate).format('DD-MM-YYYY') : false;

              if (selectedDateFlag == true) {
                containerStyle = { ...containerStyle, ...selectedDateStyle }
              }

              return (
                <div style={containerStyle}
                  onClick={() => {
                    this.setState({
                      selectedDate: moment(a.value)
                    })
                  }}>
                 
                    <h2 style={{ margin: '0px' }}>{a.label.day}</h2>
                    <span style={{textTransform:'uppercase'}}>{a.label.date}</span>
             
                  {/* <p style={labelStyle}>Days</p> */}
                </div>
              )
            })}
            <button onClick={() => {
              this.getNextWeek()
            }}>Next</button>
          </div>

        </div>
      </div>
    );
  }
}

export default TimerSegment;
