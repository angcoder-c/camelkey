import { saveGroup, allGroupsIn } from "../utils/db/tools.js";

export class Group {
    constructor({
        name,
        notes,
        category
    }) {
        // group data
        this.name = name;
        this.notes = notes || '';
        this.categoryName = category;
    }

    save(db){
        var data = {
            name : this.name,
            notes : this.notes,
        }
        
        // gets categoryId and save in the db
        saveGroup(db, data, this.categoryName);
    }

    static getById(
        db, id, args, callback
    ) {
        
        // static method that gets an group by its id

        db.query_filter_by_first({
            table : 'Group',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            },
            cb : (rows) => callback(rows, args)
        });
    }

    static getAll(db, category, args, cb) {

        // static method that gets all groups in category

        allGroupsIn(db, category, args, cb);
    }

    static updateNotesById(db, id, notes) {
        db.update_by_id({
            id : id,
            table : 'Group',
            field : 'notes',
            value : notes
        });
    }

    static deleteById(db, id) {
        db.delete({
            table : 'Group',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            }
        });
    }
}