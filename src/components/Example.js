import React, { Component } from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries } from 'react-jsx-highcharts';

const plotOptions = {
  series: [{
    type: 'spline',
    id: 'my-series',
    data: [1,2,3,4,5,6,7,8]
  }]
};
const createDataPoint = (time = Date.now(), magnitude = 1000, offset = 0) => {
  return [
    time + offset * magnitude,
    Math.round((Math.random() * 100) * 2) / 2
  ];
};

const createRandomData = (time, magnitude, points = 100) => {
  const data = [];
  let i = (points * -1) + 1;
  for (i; i <= 0; i++) {
    data.push(createDataPoint(time, magnitude, i));
  }
  return data;
};

class Example extends Component {

  constructor (props) {
   super(props);
   this.state = { videos: [], data: [], formattedData: [] };
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
   console.log(new Date(response.data.data[0].date).getTime());

   this.setState({
     data: response.data.data,
     formattedData:this.formatData(response.data.data)
   });
 })
 .catch(function (error) {
   console.log(error);
 });
 }

 formatData(data) {
   var formatteddata = [];
   var length = data.length;
   var i =0;
   for (i=0; i<length; i++) {
     formatteddata.push([new Date(data[i].date).getTime(),data[i].value]);
   }
   console.log(formatteddata);
   return formatteddata;
 }

  createDataPoint(time = Date.now(), magnitude = 1000, offset = 0) {
   return [
     time + offset * magnitude,
     Math.round((Math.random() * 100) * 2) / 2
   ];
 }

  createRandomData(time, magnitude, points = 100) {
   const data = [];
   let i = (points * -1) + 1;
   for (i; i <= 0; i++) {
     data.push(createDataPoint(time, magnitude, i));
   }
   return data;
 }
 createRandomSeries (index) {
    return {
      name: `Series${index}`,
      data: createRandomData(this.state.now, 1e8)
    };
  }
  render() {
    return (
  <div className="app">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Stock Close Price Line Graph, 2017 Jun - 2018 Jun</Title>

      <Subtitle>Source: http://docs.intrinio.com/#historical-data </Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis type="datetime">
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Close Price</YAxis.Title>
        <LineSeries name="QCOM" data={this.state.formattedData} />
      </YAxis>
    </HighchartsChart>

  </div>);
}
}

export default withHighcharts(Example, Highcharts);
