import { objectSeparator, dataFormat } from "./tools.js";

export function hideFields(headers, row, fields) {
    const rowCopy = row;

    fields
    .map(f => {
        return headers.includes(f) ? 
        headers.indexOf(f) : 
        undefined;

    })
    .filter(f => typeof f === 'number')
    .map(index => {
        let value = rowCopy[index];

        return index !== -1 & Boolean(value) ?
        rowCopy[index] = '*'.repeat(value.length || 3) :
        value;
    });
    return [ dataFormat(headers, [rowCopy])[0], rowCopy ];
}

export function fwhere(where = {}, data = {}) {
    const [fields, rows] = objectSeparator(data);
    const indexFields = Object.keys(where).map(f => {
        return fields.includes(f) ? fields.indexOf(f) : undefined
    }).filter(f => typeof f === 'number');

    const newRows = rows.filter(row => {
        let validFields = indexFields.map(index => {
            let field = where[fields[index]] ? where[fields[index]] : '';
            const value = row[index];
            const noValue = value !== field?.no
            let flag = false;

            // type fields for conditions
            let types = {
                isObject: typeof field === 'object',
                isString: typeof field === 'string',
                isNumber: typeof field === 'number',
                greater: typeof field?.greater === 'number',
                smaller: typeof field?.smaller === 'number',
            }

            if (types.isNumber || types.isString) {
                flag = value === field
            }

            if (types.isObject & types.greater) {
                flag = value > field.greater & noValue;
            }

            if (types.isObject & types.smaller) {
                flag = value < field.smaller & noValue & (types.greater ? flag : true);
            }

            return flag
        }).filter(f => f);

        return validFields.length === indexFields.length;
    });
    return dataFormat(fields, newRows);
}

export function fselect(select = {}, data = {}) {
    const [fields, rows] = objectSeparator(data);
    const indexFields = Object.keys(select).map(f => {
        // does the field exist? and it's true?
        return (
            fields.includes(f) & select[f] ?
                fields.indexOf(f) :
                undefined
        )
    }).filter(f => typeof f === 'number').sort();


    const fieldsFiltered = indexFields.map(index => fields[index]);

    let newRows = rows.map(row => {
        return indexFields.map(index => row[index])
    });

    return dataFormat(fieldsFiltered, newRows);
}