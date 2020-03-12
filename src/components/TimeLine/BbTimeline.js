import React, { useRef, useEffect }   from 'react'
import { select } from 'd3'
import useResizeObserver from '../hooks/useResizeObserver'

const BbTimeline = ({ data, highlight }) => {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return;
    }, [data, dimensions, highlight])

    return(
        <div ref={wrapperRef} style={{ marginBottom: '2rem'}}>
            <svg ref={svgRef}>
                <g className="x-axis" />
            </svg>
        </div>
    );
}

export default BbTimeline;