import React, { useRef, useEffect} from 'react'
import { select } from 'd3'
import useResizeObserver from '../hooks/useResizeObserver'

const getData = dataString => {
    const date = dataString.split('-')
    return new Date(date[2], date[0] - 1, date[1])
}

const TimeLine = ({ data, highlight }) => {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {

    }, [data, dimensions, highlight])

    return(
        <div ref={wrapperRef} style={{ marginBottom: '2rem'}}>
            <svg ref={svgRef}>
                <g className="x-axis" />
            </svg>
        </div>
    );
}

export default TimeLine;