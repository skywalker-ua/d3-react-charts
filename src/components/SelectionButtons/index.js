import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
const SelectionButton = () => {
    return(
        <div className="selection-div">
            <Link className="link" to="timeline-chart" >
             <button className="select-buttons">
                 Time Line Chart
             </button>
            </Link>
            <Link className="link" to="gauge-chart" >
             <button className="select-buttons">
                 Gauge Chart
             </button>
            </Link>
            <Link className="link" to="bar-chart" >
             <button className="select-buttons">
                 Bar Chart
             </button>
            </Link>
            <Link className="link" to="line-chart" >
             <button className="select-buttons">
                 Line Chart
             </button>
            </Link>
            <Link className="link" to="race-bar-chart" >
             <button className="select-buttons">
                 Race Bar Chart
             </button>
            </Link>
            <Link className="link" to="geochart" >
             <button className="select-buttons">
                 Geo Chart
             </button>
            </Link>
        </div>
    );
}

export default SelectionButton;