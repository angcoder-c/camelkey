import { DB } from '../models/db.js'
import { Entry } from '../models/entry.js'
import { Display } from '../models/tables.js';
import { dbExists } from "../utils/funcs.js";

export async function createEntry(uri, data) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    var entry = new Entry(data);
    entry.save(db)
}


export async function showEntry(uri, id, hidePassword=true) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    fields = hidePassword ? ['password'] : []

    Entry.getById(db, id, {}, row => {
        new Display([row].filter(r => r), false, true).show(hideFields=fields)
    })
}

export async function showLastEntries(uri, n) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.getLast(db, n, {}, rows => {
        new Display(rows).show()
    })
}

export async function showFirstEntries(uri, n) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.getFirst(db, n, {}, rows => {
        new Display(rows).show()
    })
}

export async function showEntries(uri) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.getAll(db, {}, rows => {
        new Display(rows).show()
    })
}


export async function showEntriesInCategory(uri, category) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.getEntriesInCategory(db, category, {}, rows => {
        new Display(rows).show()
    })
}

export async function showEntriesInGroup(uri, group) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.getEntriesInGroup(db, group, {}, rows => {
        new Display(rows).show()
    })
}

export async function updateTitle(uri, id, title) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.updateTitleById(db, id, title);
}

export async function updatePassword(uri, id, password) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.updatePasswordById(db, id, password);
}

export async function updateUser(uri, id, user) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.updateUserById(db, id, user);
}

export async function updateURL(uri, id, url) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.updateURLById(db, id, url);
}

export async function updateNotes(uri, id, notes) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.updateNotesById(db, id, notes);
}

export async function deleteEntry(uri, id) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Entry.deleteById(db, id);
}