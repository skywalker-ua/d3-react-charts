import React,
{
    useState,
    useRef,
    useEffect
} from 'react'
import './styles.css'
import Button from '../Button'
import {
    select,
    axisBottom,
    axisRight,
    scaleLinear,
    scaleBand
} from 'd3'
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            console.log(entries)
            // set resized dimensions
            entries.forEach(entry => {
                setDimensions(entry.contentRect)
            })
        })
        resizeObserver.observe(observeTarget)
        return () => {
            resizeObserver.unobserve(observeTarget)
        } 
    }, [ref])
    return dimensions;
}

const BarChart = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])

    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)

        if (!dimensions) return; 

        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, dimensions.width])
            .padding(0.5)
        
        const yScale = scaleLinear()
            .domain([0, 150])
            .range([dimensions.height, 0])

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(['green', 'orange', 'red'])
            .clamp(true)

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index + 1)
        
        svg
            .select('.x-axis')
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis)
        
        const yAxis = axisRight(yScale)

        svg
            .select('.y-axis')
            .style('transform', `translateX(${dimensions.width}px)`)
            .call(yAxis)

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .style('transform', 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (value, index) => {
                svg
                 .selectAll('.tooltip')
                 .data([value])
                 .join(enter => enter.append('text').attr('y', yScale(value) - 4))
                 .attr('class', 'tooltip')
                 .text(value)
                 .attr('x', xScale(index) + xScale.bandwidth() / 2)
                 .attr('text-anchor', 'middle')
                 .transition()
                 .attr('y', yScale(value) - 8)
                 .attr('opacity', 1)
            })
            .on('mouseleave', () => svg.select('.tooltip').remove())
            .transition()
            .attr('fill', colorScale)
            .attr('height', value => dimensions.height - yScale(value))
            
    }, [data, dimensions])

    return(
        <div className="bar-chart">
            <div ref={wrapperRef}>
                <svg id="bar" ref={svgRef}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </div>
            <div className="actions-btn">
                <Button onClick={() => setData(data.map(d => (d > 140) ? d = 0 : d + 10))} text="Update" />
                <Button onClick={() => setData([...data, Math.round(Math.random() * 100)])} text="Add Data" />
            </div>
        </div>
    );
};

export default BarChart;