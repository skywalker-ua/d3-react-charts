import React, { useRef, useEffect, useState } from 'react'
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3'
import './styles.css'
import Button from '../Button'

const LineChart = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 77])
    const svgRef = useRef();
    useEffect(() => {
        const svg = select(svgRef.current)

        const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300])
        const yScale = scaleLinear().domain([0, 150]).range([150, 0])
        
        const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1)
        const yAxis = axisRight(yScale)
        svg.select('.x-axis').style('transform', 'translateY(150px').call(xAxis)
        svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis)

        const myLine = line()
         .x((value, index) => xScale(index))
         .y(yScale)
         .curve(curveCardinal)
        svg
         .selectAll('.line')
         .data([data])
         .join('path')
         .attr('class', 'line')
         .attr('d', myLine)
         .attr('fill', 'none')
         .attr('stroke', 'blue')
    }, [data])
    return(
        <div>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <Button onClick={() => setData((data) => data.map(d => d > 100 ? d / 20 : d * 1.1))} text="Update" />
        </div>
    );
};

export default LineChart;