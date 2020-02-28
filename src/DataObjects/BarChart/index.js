import React,
{
    useState,
    useRef,
    useEffect
} from 'react'
import './styles.css'
import {
    select,
    axisBottom,
    axisRight,
    scaleLinear,
    scaleBand
} from 'd3'

const BarChart = () => {

    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, 300])
            .padding(0.5)
        
        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0])

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(['green', 'orange', 'red'])
            .clamp(true)

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index + 1)
        
        svg
            .select('.x-axis')
            .style('transform', 'translateY(150px)')
            .call(xAxis)
        
        const yAxis = axisRight(yScale)

        svg
            .select('.y-axis')
            .style('transform', 'translateX(300px')
            .call(yAxis)

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .style('transform', 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -150)
            .attr('width', xScale.bandwidth())
            .transition()
            .attr('fill', colorScale)
            .attr('height', value => 150 - yScale(value))
            

    }, [data])

    return(
        <div className="bar-chart">
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <button onClick={() => setData(data.map(d => d + 10))} >
                Update
            </button>
        </div>
    );
};

export default BarChart;