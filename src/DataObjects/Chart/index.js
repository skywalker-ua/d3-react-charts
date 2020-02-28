import React, { useRef, useEffect, useState } from 'react'
import { select } from 'd3'
import './styles.css'

const Chart = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20])
    const svgRef = useRef();
    useEffect(() => {
        console.log(svgRef)
        const svg = select(svgRef.current);
        svg
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('r', value => value)
            .attr('cx', value => value * 2)
            .attr('cy', value => value * 2);
    }, [data])
    return(
        <div className="content">
            <svg ref={svgRef}/>
            <br/>
            <button onClick={() => setData(data.map(value => value + 5))}>
                Updated Data
            </button>
            <button onClick={() => setData(data.filter(value => value < 35))} >
                Filter Data
            </button>
        </div>
    );
};

export default Chart;