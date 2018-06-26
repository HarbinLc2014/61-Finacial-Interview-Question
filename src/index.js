import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { PrismCode } from 'react-prism';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries} from 'react-jsx-highcharts';
import Example from './components/Example';

const API_KEY = 'AIzaSyDqsCmFJaxkv_vJDoNyl7b3E1MCvkVuWr0';
const plotOptions = {
  series: {
    pointStart: 2010
  }
};
const chart = () => (
  <div>
    <pre>
      <PrismCode className="language-jsx">{code}</PrismCode>
    </pre>
  </div>
);
class App extends Component {
  constructor(props){
    super(props);
    this.state = { videos: [], data: [] };
    axios({
      method: 'get',
      url: 'https://api.intrinio.com/historical_data?identifier=QCOM&item=close_price&start_date=2017-06-13&end_date=2018-06-12&page_size=300',
      auth: {
        username: '0a92cf3ea45d3a43b5ce258dd5c25bcf',
        password: '279ef0263d08cf4a5d2f329d8922249f'
    },
      maxContentLength: 20000
  }
).then((response)=> {
    console.log(response.data.data);
    this.setState({
      data: response.data.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  getTiming(data) {
    var date = new Date(data);
    var timer = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return timer;
  }

  getMax(data, index) {
    var max = 0;
    var target = 0;
    if( data.length!=0 ){
      max = data[0].value;
      for (var i=0; i<index; i++){
        if(data[i].value > max){
          max = data[i].value;
          target = i;
        }
      }
    return target;
  }
  return 0;
  }

  calculateMaxProfit(data) {
    var profit = 0;
    var date = '';
    var target1 = 0;
    var target2 = 0;
    var min = 0;
    var max = 0;
    if( data.length!=0 ){
      for (var i=0; i<data.length; i++){
          max = this.getMax(data,i);
          var re1 = data[max].value-data[i].value;
        //  console.log(re1);
          if(re1>profit){
            profit = re1;
            target2 = max;
            target1 = i;
          }
        }
        console.log(target1);
        console.log(target2);
        return {min: target1, max: target2, profit: data[target2].value-data[target1].value};
      }
      return [0,0]
  }

  render() {
  return (
    <div>
    <Example />
    <h4>The Highest Profit Strategy:</h4>
    <h5>Buy-in date: {this.state.data.length!=0? this.state.data[this.calculateMaxProfit(this.state.data).min].date : 0}</h5>
    <h5> close price: {this.state.data.length!=0?this.state.data[this.calculateMaxProfit(this.state.data).min].value : 0} </h5>
    <br />
    <h5>Sell-out date: {this.state.data.length!=0? this.state.data[this.calculateMaxProfit(this.state.data).max].date : 0} </h5>
    <h5>close price: {this.state.data.length!=0? this.state.data[this.calculateMaxProfit(this.state.data).max].value : 0} </h5>
    <h5>Profit: {this.state.data.length!=0? this.calculateMaxProfit(this.state.data).profit : 0}</h5>
    </div>
  );
  }
}
// create a component

ReactDOM.render(<App />, document.querySelector('.container'));