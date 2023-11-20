import Table from "cli-table";
import { green } from '../utils/colors.js';
import { 
  setColumnsWidth, 
  objectSeparator, 
  verticalAxisFormat, 
  matchMessage 
} from "../utils/display/tools.js";
import { hideFields, fselect, fwhere } from "../utils/display/filters.js";

export class Display {
  constructor(data, x = true, y = false) {
    this.data = data || {};
    [this.headers, this.rows] = objectSeparator(this.data);

    let horizontal = {
      style: {head : ['reset']},
      head: this.headers.map(header => green(header)),
      colWidths: setColumnsWidth(this.headers, false)
    }
    let info;

    info = x ? horizontal : false;
    info = y & !info ? {style: {head : ['reset']}} : info;
    this.info = {
      info: x === y ? horizontal : info,
      axis: (
        (x ? 1 : 0) ||
        (y ? 2 : 0) ||
        (x === y ? 1 : 0)
      )
    }
  }

  filter(filter) {
    /**
     * 
     * filter structure:
     * 
     * {
     *    where : {
     *        field : value,
     *        field : {
     *          greater : value,
     *          smaller : value,
     *          no : value
     *        }
     *    },
     *    select {
     *          field : bool
     *     }
     * }
     */

    const where = filter.where ? fwhere(filter.where, this.data) : this.data;
    const select = filter.select ? fselect(filter.select, where) : this.data;

    return new Display(select);
  }

  show(
    hidefields = ['password', 'masterPassword']
  ) {
    const table = new Table(this.info.info);
    let matches = 0;

    this.rows.forEach(row => {
      let newRow = hideFields(this.headers, row, hidefields)
      if (this.info.axis === 1) table.push(newRow[1]);
      if (this.info.axis === 2) table.push(...verticalAxisFormat(newRow[0]));
      matches++;
    });

    const transform = table.toString();
    console.log(
      transform ?
      transform + matchMessage(matches) :
      matchMessage(matches)
    );
  }
}