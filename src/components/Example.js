import React, { Component } from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries } from 'react-jsx-highcharts';

const plotOptions = {
};

class Example extends Component {
  // use axios to get stock data
  constructor (props) {
   super(props);
   this.state = { data: [], formattedData: [] };
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

   this.setState({
     data: response.data.data,
     formattedData:this.formatData(response.data.data)
   });
 })
 .catch(function (error) {
   console.log(error);
 });
 }

 // format the origin data from date format to Unix time stamp
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

// render chart
  render() {
    return (
  <div className="app">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Stock Close Price Line Chart, 2017 Jun - 2018 Jun</Title>

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
