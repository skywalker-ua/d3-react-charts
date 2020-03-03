import React,
{
    useEffect,
    useRef,
    useState
}
 from 'react'
import './styles.css'
import Button from '../Button'
import useResizeObserver from '../hooks/useResizeObserver'
import { select, arc, pie } from 'd3'
const GaugeChart = props => {

    const { data } = props;
    const [sliderData, setData] = useState({
        data: [50, 50]
    })
    

    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return;

        const arcGenerator = arc()
         .innerRadius(75)
         .outerRadius(150)

        const pieGenerator = pie().startAngle(-0.5 * Math.PI).endAngle(0.5 * Math.PI).sort(null)

        const instructions = pieGenerator(sliderData.data)

        svg 
            .selectAll('.slice')
            .data(instructions)
            .join('path')
            .attr('class', 'slice')
            .attr('stroke', 'none')
            .attr('fill', (instruction, index) => index % 2 === 1 ?  '#eee' : '#ffcc00')
            .style('transform', `translate(${dimensions.width / 2}px, ${dimensions.height}px)`)
            .attr('d', instruction => arcGenerator(instruction))
    }, [sliderData.data, dimensions])

    const sliderDataHandler = e => {
        const value = e.currentTarget.value;
        setData({
            data: [value, 100 - value]
        })
    }

    return(
        <div className="gauge">
            <div ref={wrapperRef}>
                <svg style={{backgroundColor: 'white'}}  id="gauge" ref={svgRef}>

                </svg>
            </div>
            <div className="slider-inp">
                <input onChange={sliderDataHandler} type="range" min="1" max="100" value={sliderData.data[0]} /> 
            </div>
        </div>
    );
}

export default GaugeChart;