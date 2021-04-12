import React,  { Component, Fragment } from "react";
import moment from 'moment';

class TimerSegment extends Component {

  defaultDate = new Date(new Date().setDate(new Date().getDate()+1))

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
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      deadline: this.props.date ? this.props.date : this.defaultDate,
      activeWeek:[],
      months:moment.months(),
      years: [],
      selectedDate: moment()
      // deadline: this.props.date ? this.props.date : "April, 6, 2019"
    };
  }

  componentDidMount() {
    let yearData = [];
    for(let i = 0;i<100;i++){
      yearData.push(moment().add(i,'years').year())
    }
    this.setState({
      years: yearData
    })
   
    this.getCurrentWeek()
  }

  getCurrentWeek=(i)=>{
    var currentDate = i ? moment(i) : moment();
    var weekStart = currentDate.clone().startOf('isoweek');
    var days = [];
    
    for (var i = 0; i <= 6; i++) {
        days.push({
          label: moment(weekStart).add(i, 'days').format('MMMM Do,ddd'),
          value:  moment(weekStart).add(i, 'days').toISOString()
        })
    }

    this.setState({
      activeWeek:days
    })
  }

  getNextWeek=()=>{
    let dd = this.state.activeWeek[this.state.activeWeek.length-1]
    this.getCurrentWeek(moment(dd.value).add('days',1).toISOString())
  }

  getPrevWeek=()=>{
    let dd = this.state.activeWeek[0]
    this.getCurrentWeek(moment(dd.value).subtract('days',1).toISOString())
  }

  getCurrentWeekOnChange=(type,value)=>{
    if(type == 'year'){
      let dd = moment(this.state.selectedDate).set('year',parseInt(value))

      this.setState({
        selectedDate:dd
      })
      this.getCurrentWeek(dd.toISOString())

    }
    if(type == 'month'){
      let mm = moment().month(value).format("M");
    
      let dd = moment(this.state.selectedDate).set('month',mm)

      this.setState({
        selectedDate:dd
      })
      this.getCurrentWeek(dd.toISOString())
    }
  }


  render() {
    const { days, hours, minutes, seconds } = this.state;
    let counterStyle = this.props.counterStyle ? this.props.counterStyle  : {};
    let timerStyle = this.props.timerStyle ? this.props.timerStyle : {};
    let labelStyle = this.props.labelStyle ? this.props.labelStyle : {};
    let currentDateStyle = this.props.currentDateStyle ? this.props.currentDateStyle : {};
    let selectedDateStyle = this.props.selectedDateStyle ? this.props.selectedDateStyle : {};

    return (
      <div style={timerStyle} >
          <div style={{padding:'0px',textAlign:'center', height:'100%',background:'none'}}  >
            <div>
            <select onChange={(e)=>{
         
              this.getCurrentWeekOnChange('month',e.target.value)
            }}>
              {this.state.months.map((a)=>{
                return(
                  <option value={a}>{a}</option>
                )
              })}
            </select>
            <select onChange={(e)=>{
     
              this.getCurrentWeekOnChange('year',e.target.value)

            }}>
              {this.state.years.map((a)=>{
                return(
                  <option value={a}>{a}</option>
                )
              })}
            </select>
            </div>
            {/* <p style={{color: labelStyle.color ? labelStyle.color : 'grey', marginBottom:'0px'}}>STARTS IN</p> */}

            <div style={{display:'flex', justifyContent:'center'}}>
              <button onClick={()=>{
                this.getPrevWeek()
              }}>Prev</button>
              {this.state.activeWeek.map((a)=>{
                let containerStyle = {...counterStyle};
                let currentDateFlag = moment().format('DD-MM-YYYY') == moment(a.value).format('DD-MM-YYYY')

                if(currentDateFlag == true){
                  containerStyle = {...containerStyle,...currentDateStyle}
                }

                let selectedDateFlag = this.state.selectedDate ? moment(a.value).format('DD-MM-YYYY') == moment(this.state.selectedDate).format('DD-MM-YYYY') : false;
                
                if(selectedDateFlag == true){
                  containerStyle = {...containerStyle,...selectedDateStyle}
                }
             
                return(
                  <div style={{flex:1, cursor:'pointer'}}
                  onClick={()=>{
                    this.setState({
                      selectedDate : moment(a.value)
                    })
                  }}>
                  <h1 className="timer-counter" style={containerStyle}>{a.label}</h1>
                  {/* <p style={labelStyle}>Days</p> */}
              </div>
                )
              })}
            <button onClick={()=>{
              this.getNextWeek()
            }}>Next</button>
            </div>
            
        </div>
        </div>
    );
  }
}

export default TimerSegment;
