import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Cell,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

import CustomTooltip from './CustomTooltip';

const BarLineChart = ({ data, onClick }) => {
    const [activeBarIndex, setActiveBarIndex] = useState();

    const primaryColor = '#413ea0';
    const secondaryColor = '#9ccae9';

    const handleOnClick = (bar, index) => {
        setActiveBarIndex(index === activeBarIndex ? null : index);
        onClick(bar);
    };

    return (
        <ResponsiveContainer width="98%" height="90%" aspect={3}>
            <ComposedChart
                margin={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10,
                }}
                data={data}
            >
                <Bar
                    dataKey="uv"
                    barSize={80}
                    fill={primaryColor}
                    onClick={handleOnClick}
                >
                    {data.map((entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={
                                index === activeBarIndex
                                    ? secondaryColor
                                    : primaryColor
                            }
                            key={entry.name}
                        />
                    ))}
                </Bar>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Tooltip content={<CustomTooltip />} />
                <XAxis dataKey="name" dx={0} dy={10} />
                <YAxis />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

BarLineChart.propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
};

export default BarLineChart;
