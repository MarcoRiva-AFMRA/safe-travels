import { keysIn, sum, filter, max } from 'lodash';

const TOTAL = 'total';

const getProperties = (data) => {
    const [feature] = data.features;
    return feature && keysIn(feature.properties);
};

const getYears = (data) =>
    filter(keysIn(data.properties), (prop) => !isNaN(parseInt(prop, 10)));

const getYearTotals = (data) => {
    const { features } = data;
    const [feature] = features;
    const years = getYears(feature);

    return {
        data: years.map((property) => ({
            name: property,
            uv: sum(features.map((feature) => feature.properties[property])),
        })),
        name: null,
    };
};

const getTotal = (selection, all, year) =>
    selection
        ? selection.properties[year]
        : sum(all.features.map((record) => record.properties[year]));

const getMaxArea = (data, property) =>
    max(data.features.map((record) => record.properties[property]));

const getSelection = (selection) => {
    const years = getYears(selection);

    return {
        data: years.map((year) => ({
            name: year,
            uv: selection.properties[year],
        })),
        name: selection.properties && selection.properties.name,
    };
};

export {
    getProperties,
    getSelection,
    getYearTotals,
    getYears,
    getTotal,
    getMaxArea,
    TOTAL,
};
