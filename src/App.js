import React from 'react';
import './App.css';
import Layout from './containers/Layout'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'

class App extends React.Component {
  
  render() {
    return(
      <div className="main">
        <Layout>
          <LineChart />
          <BarChart />
        </Layout>
      </div>
    );
  }
}

export default App;
