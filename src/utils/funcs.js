import fs from 'fs'
import path from 'path';
import os from 'node:os';

export function sqlFileData(schema) {
    return fs.readFileSync(`./db/${schema}.sql`, 'utf-8');
}

export function formatDataValues(data) {
    var values = Object.values(data);
    var str = '';

    for (let v in values) {
        if (typeof (values[v]) == 'number') str += `${values[v]},`
        else if (typeof (values[v]) === 'object') str += `'${JSON.stringify(values[v])}',`
        else str += `${JSON.stringify(values[v])},`
    }
    return str.slice(0, str.length - 1);
}

export function formatFilters({ data, table }) {
    /*
     * field0=value0, field1=value1, field2=value2
     * fields fromat: 
     *      table.field
     * values format: 
     *      numbers: 1
     *      strings, datetime: ''
    */
    var sentence = '';
    var fields = Object.keys(data);
    var values = Object.values(data).map(v => {
        if (v.value === undefined) v.value=null
        return JSON.stringify(v.value)
    });

    var opts = Object.values(data).map(v => v.operator);

    var noFilters = values.length-1;

    for (var i in values) {
        sentence +=`${fields[i]}${opts[i]}${values[i]}`;
        sentence += i != noFilters ? ' and ' : ''
    }
    return sentence;
}

export function dbExists(path) {
    // a function that checks if a file exists

    try {
        let stats = fs.statSync(path)
        return stats.isFile()
    } catch (err) {
        return false
    }
}

export function uri(name, directory='') {
    let local = `${os.homedir()}/.camelkey/user`
    let { ext, dir, base } = path.parse(directory ? directory : local)
    let uri = ''

    if (!Boolean(ext) && Boolean(name)) {
        uri = `${dir}/${base}/${name}.db`
    }
    
    if (Boolean(ext) && ext==='.db') {
        uri = `${dir}/${base}`
    }
    return path.normalize(uri);
}

export function command2args(command) {
    var regex = /'([^']*)'|"([^"]*)"/g;
    
    // args return
    let args = [process.argv[0], process.argv[1]]
    var words = [];
    var match;

    while ((match = regex.exec(command)) !== null) {
    // the content of single or double quotes will be stored in words
        var content = match[1] || match[2];
        words.push(content);
    }

    command
    .split(regex)
    .filter(c=>c)
    .forEach(
        c => {
        let commandValidate = Boolean(c);
        let includes = words?.includes(c);

        if (!includes & commandValidate) {
            let arg = c.trim().split(/\s/);
            return args.push(...arg);
        }
        args.push(c)
    })
    return args;
}

export function createDirs() {
    let main = `${os.homedir()}\\.camelkey`
    let user = `${main}\\user`

    fs.existsSync(main) ? undefined : fs.mkdirSync(main);
    fs.existsSync(user) ? undefined : fs.mkdirSync(user);
}