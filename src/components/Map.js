// credit to muratkemaldar for borrowing his code as a starting point with his react geojson example
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import useResizeObserver from './useResizeObserver';
import pluralize from 'pluralize';

const Map = ({ data, totalsField, onSelection }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedAreaData, setSelectedAreaData] = useState(null);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const minProp = min(
            data.features,
            (feature) => feature.properties[totalsField]
        );
        const maxProp = max(
            data.features,
            (feature) => feature.properties[totalsField]
        );
        const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(['yellow', 'red']);

        // use resized dimensions
        // but fall back to getBoundingClientRect, if no dimensions yet.
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        // projects geo-coordinates on a 2D plane
        const projection = geoMercator()
            .fitSize([width, height], selectedArea || data)
            .precision(100);

        // takes geojson data,
        // transforms that into the d attribute of a path element
        const pathGenerator = geoPath().projection(projection);

        // render each Area
        svg.selectAll('.area')
            .data(data.features)
            .join('path')
            .on('mouseover', (e, feature) => setSelectedAreaData(feature))
            .on('mouseout', () => setSelectedAreaData(null))
            .on('click', (e, feature) => {
                const data = selectedArea === feature ? null : feature;
                setSelectedArea(data);
                onSelection(data);
            })
            .attr('class', 'area')
            .transition()
            .duration(500)
            .attr('fill', (feature) =>
                colorScale(feature.properties[totalsField])
            )
            .attr('d', (feature) => pathGenerator(feature));

        //render text
        svg.selectAll('.label')
            .data([selectedAreaData])
            .join('text')
            .attr('class', 'label')
            .text((feature) => {
                if (!selectedAreaData) {
                    svg.selectAll('.label').remove();
                } else {
                    const { properties } = feature;
                    const totals = feature.properties[totalsField];

                    return (
                        feature &&
                        `${properties.name}: 
                    ${totals ? totals : 0} ${pluralize('incident', totals)}`
                    );
                }
            })
            .attr('x', width / 2)
            .attr('y', 18);
    }, [
        data,
        dimensions,
        selectedArea,
        selectedAreaData,
        onSelection,
        totalsField,
    ]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}

Map.propTypes = {
    data: PropTypes.object.isRequired,
    totalsField: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
};

export default Map;
