export class Category {
    constructor ({
        name
    }){
        this.name = name;
    }

    save(db){
        db.insert({
            table : 'Category',
            data :{
                name : this.name
            }
        })
    }

    static getById(
        db, id, args, callback
    ) {

        // static method that gets an group by its id

        db.query_filter_by_first({
            table : 'Category',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            },
            cb : rows => callback(rows, args)
        });
    }
    
    static getAll(db, args, callback) {
        db.query_all({
            table : 'Category',
            fields : ['*'],
            cb : rows => callback(rows, args)
        });
    }

    static deleteById(db, id) {
        db.delete({
            table : 'Category',
            filters : {
                id : {
                    value : id,
                    operator : '='
                }
            }
        });
    }
}