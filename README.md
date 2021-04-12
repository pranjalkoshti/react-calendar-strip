### React Customizable Countdown


You can install the module via npm:

 `npm install react-countdown-customizable --save`


### Usage
For using counter with standard styles - 

```
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from 'react-countdown-customizable';
 
ReactDOM.render(
  <Counter 
    date="2021-01-10T14:48:00" 
  />,
  document.getElementById('root')
);
```

For applying custom styles for labels, counter or timer component itself 

```
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from 'react-countdown-customizable';
 
ReactDOM.render(
   <Counter 
        date="2021-01-10T14:48:00" 
        timerStyle={{marginTop:'10px', width:'20%'}} 
        counterStyle={{fontSize:'15px', color:'white', border:'1px solid red', padding:'10px', margin:'5px', backgroundColor:'red'}} 
        labelStyle={{color:'grey',fontSize:'12px', textTransform:'uppercase'}}
    /> ,
  document.getElementById('root')
```
### Demo
[live](https://codesandbox.io/s/strange-glitter-2biqw?file=/src/App.js)

### Props

| Name  | Type | Default |
| ------------- | ------------- | ------------- | 
| date  | String  | date 24 Hrs from now |
| timerStyle | style Object | undefined | 
| counterStyle | style Object | undefined | 
| labelStyle | style Object | undefined | 

