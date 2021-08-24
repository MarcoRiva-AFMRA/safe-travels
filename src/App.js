import React, { useState, useEffect, useMemo } from 'react';
import {
    getSelection,
    getYearTotals,
    getTotal,
    getMaxArea,
    TOTAL,
} from './utils/Utils';
import Map from './components/Map';
import geoJson from './assets/CrashData.json';
import BarLineChart from './components/BarLineChart';
import './App.css';

const App = () => {
    const [data, setData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(TOTAL);
    const [detail, setDetail] = useState(getYearTotals(geoJson));

    useEffect(
        () => setDetail(data ? getSelection(data) : getYearTotals(geoJson)),
        [data, selectedYear]
    );

    const total = useMemo(
        () => getTotal(data, geoJson, selectedYear),
        [data, selectedYear]
    );
    const maxArea = useMemo(
        () => getMaxArea(geoJson, selectedYear),
        [selectedYear]
    );
    const setYear = (barData) =>
        setSelectedYear(barData.name === selectedYear ? TOTAL : barData.name);

    return (
        <div className="App">
            <h4 className="App-title">D.C. Area Impaired Driving Incidents</h4>
            <div className="box">
                <div className="row">
                    <div className="cell">
                        <Map
                            data={geoJson}
                            totalsField={selectedYear}
                            onSelection={setData}
                        />
                        <div className="legend-container">
                            0<span className="legend" />
                            {maxArea}
                        </div>
                    </div>
                    <div className="cell">
                        <div>
                            {detail.name
                                ? detail.name
                                : 'All D.C. Area Neighborhood'}
                        </div>
                        <div>
                            Incidents
                            {selectedYear !== TOTAL
                                ? ` (${selectedYear})`
                                : ' (2010 to 2014)'}
                        </div>
                        <div>Total: {total}</div>
                        <BarLineChart data={detail.data} onClick={setYear} />
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    Hover over neighborhood in map to see its number of
                    incidents.
                </li>
                <li>
                    Click on a neighborhood to view number of incidents by year.
                </li>
                <li>Click on a bar in the year chart to filter map by year.</li>
                <li>
                    A highlighted bar indicates a filter on that year. Click the
                    bar again to clear year filter.
                </li>
            </ul>
        </div>
    );
};

export default App;
