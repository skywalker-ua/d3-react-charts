import React, { useState } from 'react'
import GeoChart from './GeoChart'
import data from './custom.geo.json'

const GeoChartContainer = () => {
    const [property, setProperty] = useState('pop_est')
    return(
        <div className="geo-chart">
            <h2>World Map with d3-geo</h2>
            <GeoChart data={data} property={property} />
            <h2>Select propery to highlight</h2>
            <select
                value={property}
                onChange={event => setProperty(event.target.value)}
                >
                    <option value="pop_est">Population</option>
                    <option value="name_len">Name length</option>
                    <option value="gdp_md_est">GDP</option>
                </select>
        </div>
    );
}

export default GeoChartContainer;