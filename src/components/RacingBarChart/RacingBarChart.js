import React, { useRef, useEffect } from 'react'
import { select, scaleBand, scaleLinear, max} from 'd3'
import useResizeObserver from '../hooks/useResizeObserver'

const RacingBarChart = ({ data }) => {

    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if(!dimensions) return;

        // sorting the data
        data.sort((a, b) => b.value - a.value)

        const yScale = scaleBand()
            .paddingInner(0.1)
            .domain(data.map((value, index) => index))
            .range([0, dimensions.height])

        const xScale = scaleLinear()
            .domain([0, max(data, entry => entry.value)])
            .range([0, dimensions.width])
        // draw the bars

        svg 
            .selectAll('.bar')
            .data(data, (entry, index) => entry.name )
            .join(enter => enter.append('rect').attr('y', (entry, index) => yScale(index)))
            .attr('class', 'bar')
            .attr('fill' , entry => entry.color)
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .transition()
            .attr('width', entry => xScale(entry.value))
            .attr('y', (entry, index) => yScale(index))
        
        // draw label

        svg
            .selectAll('.label')
            .data(data, (entry, index) => entry.name)
            .join(enter => enter.append('text').attr('y', (entry, index) => yScale(index)))
            .text(entry => `🐎 ... ${entry.name} (${entry.value} meters)`)
            .attr('class', 'label')
            .attr('x', 10)
            .transition()
            .attr('y', (entry, index) => yScale(index) + yScale.bandwidth())

    }, [data, dimensions])

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem'}}>
            <svg style={{backgroundColor: 'white'}} ref={svgRef}></svg>
        </div>
    );
}

export default RacingBarChart;