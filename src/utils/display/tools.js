import { green } from "../colors.js";

export function setColumnsWidth(headers, strict = true) {
  const widthHeaders = {
    default: 10,
    id: 5,
    name: 15,
    title: 15,
    user: 10,
    password: 10,
    masterPassword: 16,
    url: 25,
    uri: 25,
    notes: 10,
    description: 13,
    createdAt: 12,
    categoryId: 15,
    groupId: 15
  }

  const widths = headers.map(head => {
    let fieldWidth = widthHeaders[head];
    return Boolean(fieldWidth) || strict ? fieldWidth : widthHeaders.default;
  }).filter(head => head);

  return widths;
}

export function objectSeparator(data) {
  /**
   * separates an object into keys and values.
   * returns two nested lists, the first is 
   * the keys and the second is the values
   */
  let fields = []

  const rows = data?.map(
    row => Object.values(row).map(e => e === null ? '' : e)
  );

  if (data.length) {
    fields = Object.keys(data[0]);
  }

  return [fields, rows];
}

export function dataFormat(properties, values) {

  /**
   * input: 
   *      properties : ['foo', 'baz', 'bar']
   *      values : [
   *                  [1,'a', 1.1], 
   *                  [2,'b', 2.2], 
   *                  [3,'c', 3.3], 
   *                  [4,'d', 4.4]
   *               ]
   * output:
   *      [
   *          { foo: 1, baz: 'a', bar: 1.1 },
   *          { foo: 2, baz: 'b', bar: 2.2 },
   *          { foo: 3, baz: 'c', bar: 3.3 },
   *          { foo: 4, baz: 'd', bar: 4.4 }
   *      ]
   * 
   * 
   */

  let valsIsObject = (
    (typeof values[0] === 'object') &
    !(Array.isArray(values[0]))
  );

  const data = values.map(value => {
    if (valsIsObject) {
      properties = Object.keys(value);
      value = Object.values(value);
    }
    let newValue = {};

    properties
    .map(p => properties.indexOf(p))
    .filter(f => typeof f === 'number')
    .map(index => {
      return Object.defineProperty(newValue, properties[index], {
        value: value[index],
        writable: true,
        enumerable: true,
        configurable: true
      });
    })
    return newValue;
  });
  return data
}


export function verticalAxisFormat(row = {}) {
  /**
   * input: 
   *    row:
   *    { 
   *      foo: value,
   *      baz: value,
   *      bar: value 
   *    }
   * 
   * output:
   *    [
   *      { foo : value },
   *      { baz : value },
   *      { bar : value } 
   *    ]
   */
  const rowSplit = Object.keys(row).map(field => {
    return Object.defineProperty({}, green(field), {
      value: row[field],
      writable: true,
      enumerable: true,
      configurable: true
    })
  });
  return rowSplit;
}

export function matchMessage (matches) {
  return green(`\n${ matches } matches found`)
}