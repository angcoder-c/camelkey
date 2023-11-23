# Management manual

## DB

#### Create database
```bash
$ camelkey create database --name <name> --description <description> --password <password> --to <directory>
```

> `$ camelkey create database -n <name> -d <description> -p <password>`

| option | flag | required |
|---|---|---|
| `name` | `-n`| ✅ |
| `description` | `-d`| ❌|
| `password` | `-p`| ✅ |

> output:  `Database created successfully`

#### Authenticate for database managment

The `open` command enters administration mode for the database specified by the name `-db <database>` and authenticated by the `-p <password>`

```bash
keyman open --database <name> --password <password>`
```

> `camelkey open -db <name> -p <password>`

| option | flag | required |
|---|---|---|
| `database` | `-db`| ✅ |
| `password` | `-p`| ✅ |

> output:  `camelkey> `

#### Delete database

The `delete database` command within database administration mode will delete the current database and require the password `-p <password>` as a security measure.

```bash
camelkey> delete database --password <password>
```

> `camelkey> delete database -p <password>`

| option | flag | required |
|---|---|---|
| `password` | `-p`| ✅ |

This command will stop the current process and exit database administration mode

## Entries

#### Create Entry

```bash
camelkey> create entry --title <title> --user <username> --password <password> --url <url> --notes <notes> --category <category-name> --group <group-name>
```

> `camelkey> create entry -t <title> -u <username> -p <password> --url <url> --notes <notes> -c <category-name> -g <group-name>`

| option | flag | required |
|---|---|---|
| `title` | `-t`| ✅ |
| `user` | `-u`| ✅ |
| `password` | `-p`| ✅ |
| `url` | ` `| ❌ |
| `notes` | ` `| ❌ |
| `category` | `-c`| ❌ |
| `group` | `-g`| ❌ |

#### Show Entries

## Groups


#### Create group

```bash
camelkey> create group --name <name> --category <category-name> --notes <note>
```

> `camelkey> create group -n <name> -c <category-name> --notes <note>`

| option | flag | required |
|---|---|---|
| `name` | `-n`| ✅ |
| `notes` | ` `| ❌ |
| `category` | `-c`| ✅ |

#### Delete group

```bash
camelkey> delete group --id <group-id>
```

> `camelkey> delete group --id <group-id>`

| option | flag | required |
|---|---|---|
| `id` | ` `| ✅ |

## Categories

#### Create category

```bash
camelkey> create category --name <name>
```

> `camelkey> create category -n <name>`

| option | flag | required |
|---|---|---|
| `name` | `-n`| ✅ |

#### Delete category

```bash
camelkey> delete category --id <category-id>
```

> `camelkey> delete category --id <category-id>`

| option | flag | required |
|---|---|---|
| `id` | ` `| ✅ |