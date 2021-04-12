import React,  { Component, Fragment } from "react";
import Counter from './components';

function App(props){
    return (
        <Counter 
            date="2021-01-10T14:48:00" 
            timerStyle={{marginTop:'10px', width:'auto'}} 
            counterStyle={{fontSize:'15px', color:'grey', border:'1px solid red', padding:'10px', margin:'5px', backgroundColor:'white', borderRadius:'5px'}} 
            labelStyle={{color:'grey',fontSize:'12px', textTransform:'uppercase'}}
            currentDateStyle={{backgroundColor:'red',color:'white'}}
            selectedDateStyle={{backgroundColor:'green',color:'white',border:'1px solid green'}}
        />
    )
}
export default App;