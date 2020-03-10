import React from 'react';
import './App.css';
import Layout from './containers/Layout'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import GaugeChart from './components/GaugeChart'
import Header from '../src/components/Header'
import TimeLine from '../src/components/TimeLine'
import SelectionButtons from './components/SelectionButtons'
import { 
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
 } from 'react-router-dom' 
const data = [25, 30];

class App extends React.Component {

  render() {
    return(
      <Router>
      <div className="main">
        <Header />
        <SelectionButtons />
        <Layout>
          <Switch>
            <Route exact path="/line-chart">
              <LineChart />
            </Route>
            <Route exact path="/bar-chart">
              <BarChart />
            </Route>
            <Route exact path="/gauge-chart">
              <GaugeChart  />
            </Route>
            <Route exact path="/timeline-chart">
              <TimeLine data={data} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
      </Router>
    );
  }
}

export default App;
