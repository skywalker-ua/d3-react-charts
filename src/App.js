import React from 'react';
import './App.css';
import Layout from './containers/Layout'
import BarChart from './DataObjects/BarChart'
import LineChart from './DataObjects/LineChart'
import DonutChart from './DataObjects/DonutChart'
import Chart from './DataObjects/Chart'

class App extends React.Component {
  
  render() {
    return(
      <div className="main">
        <Layout>
          <LineChart />
          <BarChart />
          {/* <DonutChart /> */}
          {/* <Chart /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
