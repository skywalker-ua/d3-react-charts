import React from 'react';
import './App.css';
import Layout from './containers/Layout'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import GaugeChart from './components/GaugeChart'

const data = [25, 30];

class App extends React.Component {

  render() {
    return(
      <div className="main">
        <Layout>
          <LineChart />
          <BarChart />
          <GaugeChart data={data} />
        </Layout>
      </div>
    );
  }
}

export default App;
