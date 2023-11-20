export function getGroupByName(db, groupName, args, callback) {

    /*
     * function that searches for a group by name and returns the first result
     * arguments : 
     *      db : a sqlite3 object
     *      groupName : a string with the name of the group to search for
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    db.query_filter_by_first({ 
        table : 'Group', 
        filters : {
            name : { value : groupName, operator : '=' }
        },
        cb : row => callback(row, args)
    })
}

export function getCategoryByName(db, categoryName, args, callback) {

    /*
     * function that searches for a category by name and returns the first result
     * arguments : 
     *      db : a sqlite3 object
     *      groupName : a string with the name of the group to search for
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    db.query_filter_by_first({
        table : 'Category',
        filters : {
            name : { value : categoryName, operator : '='}
        },
        cb : row => callback(row, args)
    })
}

export function eachEntry(db, args, callback) {

    /*
     * function that obtains the total of the elements of the Entry table to iterate over them
     * arguments : 
     *      db : a sqlite3 object
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    db.query_all({
        table : 'Entry',
        fields : ['id'],
        cb : rows => callback(rows, args)
    });
}