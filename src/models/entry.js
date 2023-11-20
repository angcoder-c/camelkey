import { 
    saveEntry, 
    lastEntries, 
    firstEntries, 
    allEntries, 
    allEntriesInCategory, 
    allEntriesInGroup 
} from '../utils/db/tools.js'


export class Entry {

    // class that provides CRUD tools for inputs

    constructor({
        title,
        user,
        url,
        notes,
        password,
        categoryName,
        groupName
    }){

        // entry data to insert
        this.title = title;
        this.user = user;
        this.password = password;
        this.url = url || '';
        this.notes = notes ? notes : '';
        this.location = {
            categoryName : categoryName,
            groupName : groupName
        }
    }

    save(db) {
        var data = {
            title : this.title,
            user : this.user,
            password : this.password,
            url : this.url,
            notes : this.notes,
        } 

        // add CategoryID and GroupID to the data if you have them
        saveEntry(db, data, this.location)
    }

    static getById(
        db, id, args, callback
    ) {

        // static method that gets an entry by its id

        db.query_filter_by_first({
            table : 'Entry',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            },
            cb : (rows) => callback(rows, args)
        });
    }

    static getLast(
        db,
        n,
        args, 
        cb
    ) {

        // static method that gets the last n entries

        lastEntries(db, n, args, cb)
    }

    static getFirst(
        db,
        n,
        args, 
        cb
    ) {

        // static method that gets the first n entries

        firstEntries(db, n, args, cb)
    }

    static getAll(db, args, cb) {

        // static method that gets all entries

        allEntries(db, args, cb);
    }

    static getEntriesInGroup(db, group, args, cb) {

        // static method that gets all entries in a group.

        allEntriesInGroup(db, group, args, cb);
    }

    static getEntriesInCategory(db, category, args, cb) {

        // static method that gets all entries in a category.

        allEntriesInCategory(db, category, args, cb);
    }

    static updatePasswordById(db, id, password) {
        db.update_by_id({
            id : id,
            table : 'Entry',
            field : 'password',
            value : password
        });
    }

    static updateTitleById(db, id, title) {
        db.update_by_id({
            id : id,
            table : 'Entry',
            field : 'title',
            value : title
        });
    }

    static updateUserById(db, id, user) {
        db.update_by_id({
            id : id,
            table : 'Entry',
            field : 'user',
            value : user
        });
    }

    static updateURLById(db, id, url) {
        db.update_by_id({
            id : id,
            table : 'Entry',
            field : 'url',
            value : url
        });
    }

    static updateNotesById(db, id, notes) {
        db.update_by_id({
            id : id,
            table : 'Entry',
            field : 'notes',
            value : notes
        });
    }

    static deleteById(db, id) {
        db.delete({
            table : 'Entry',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            }
        });
    }
}