import { getCategoryByName, getGroupByName, eachEntry } from './callbacks.js'

export function saveEntry(db, data, location){

    /*
     * function that gets the location information and inserts a new entry
     * arguments : 
     *      db : a sqlite3 object
     *      data : an object with the data to insert into the new record
     *      location : contains the following storage information
     *          category : a string with the name of the category to search for
     *          group : a string with the name of the category to search for
     */
    const categoryName = Boolean(location.categoryName);
    const groupName = Boolean(location.groupName);
    const saveData = (category, group) => {
        category ? data['categoryId'] = category : undefined;
        group ? data['groupId'] = group : undefined;

        db.insert({ 
            table : 'Entry',
            data : data
        });
    }
    
    getCategoryByName(db, location.categoryName, {}, (category, args) => {
        getGroupByName(db, location.groupName, {}, (group, args) => {
            
            if (Boolean(group) & Boolean(category)) {
                saveData(category.id, group.id);
                return undefined;
            }

            if (Boolean(category) & !Boolean(group)) {
                saveData(category.id, null);
                return undefined;
            }

            saveData(null, null)
        })
    });
}

export function lastEntries(db, n, args, callback){

    /*
     * function that gets the last elements of the entry table
     * arguments : 
     *      db : a sqlite3 object
     *      n : number of last items
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    eachEntry(db, {db : db, n : n}, (entryRows, entryArgs) => {
        let lastvals = entryRows.length-entryArgs.n;
        entryArgs.db.query_filter_by({
            table : 'Entry', 
            filters : {
                id : {
                    value : lastvals >= 0 ? lastvals : 0,
                    operator : '>='
                }
            }, cb : rows => callback(rows, args)
        });
    });
}

export function firstEntries(db, n, args, callback){

    /*
     * function that gets the first elements of the entry table
     * arguments : 
     *      db : a sqlite3 object
     *      n : number of first items
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */
    db.query_filter_by({
        table : 'Entry', 
        filters : {
            id : { value : n, operator : '<=' }
        }, cb : rows => callback(rows, args)
    });
}

export function allEntries(db, args, callback){

    /*
     * function that gets all the records from the Entry table
     * arguments : 
     *      db : a sqlite3 object
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */
    db.query_all({
        table : 'Entry',
        fields : ['*'],
        cb : rows => callback(rows, args)
    });
}

export function allEntriesInCategory(db, category, args, callback){

    /*
     * function that gets all the records from the Entry table
     * arguments : 
     *      db : a sqlite3 object
     *      category : a string with the name of the category to search for
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    
    const filteredEntries = (rows, categoryId)=> {
        var rowsFiltered = rows.filter(r => {
            if (r?.categoryId === categoryId) return r;
        });
        
        callback(rowsFiltered, args);
    }
    
    const cbFilter = rows => {
        db.query_filter_by_first({
            table : 'Category',
            filters : { name : { value: category, operator: '=' } },
            cb : row => filteredEntries(rows, row?.id)
        });
    }

    db.query_all({
        table : 'Entry',
        fields : ['*'],
        cb : rows => cbFilter(rows)
    });
}

export function allEntriesInGroup(db, group, args, callback){

    /*
     * function that gets all the records from the Entry table
     * arguments : 
     *      db : a sqlite3 object
     *      category : a string with the name of the category to search for
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */

    
    const filteredEntries = (rows, groupId)=> {
        var rowsFiltered = rows.filter(r => {
            if (r?.groupId === groupId) return r;
        });
        
        callback(rowsFiltered, args);
    }
    
    const cbFilter = rows => {
        db.query_filter_by_first({
            table : 'Group',
            filters : { name : { value: group, operator: '=' } },
            cb : row => filteredEntries(rows, row?.id)
        });
    }

    db.query_all({
        table : 'Entry',
        fields : ['*'],
        cb : rows => cbFilter(rows)
    });
}

export function saveGroup(db, data, category){

    /*
     * function that gets the category information and inserts a new group
     * arguments : 
     *      db : a sqlite3 object
     *      data : an object with the data to insert into the new record
     *      category : a string with the name of the category to search for
     */

    getCategoryByName(db, category, {}, (categoryRow, args) => {
        data['categoryId'] = categoryRow?.id;
        db.insert({ table : 'Group', data : data })
    })
}

export function allGroupsIn(db, categoryName, args, callback){

    /*
     * function that looks for the category indicated by the name 
     * and filters the groups by the id of this category
     * arguments : 
     *      db : a sqlite3 object
     *      categoryName : category name string
     *      args : an object containing the parameters to be used within the callback function
     *      callback : a callback function that will use the data obtained
     */
    db.query_filter_by_first({
        table : 'Category',

        filters : {
            name : { value : categoryName, operator : '=' }
        }, 

        cb : row => {
            
            db.query_filter_by({ table : 'Group', filters : {
                categoryId : { value : row?.id, operator : '='}
            }, 

            cb : rows => callback(rows)
        });
    }});
}