# User Manual

## Table of content

1. [Create Database](#create-database)
1. [Show Databases](#show-databases)
1. [Open Database](#open-database)
1. [Show Current Database](#show-current-database)
1. [Delete Database](#delete-database)
1. [Create Category](#create-category)
1. [Show Categories](#show-categories)
1. [Show Category](#show-category)
1. [Delete Category](#delete-category)
1. [Create Group](#create-group)
1. [Show Groups](#show-groups)
1. [Show Group](#show-group)
1. [Delete Group](#delete-group)
1. [Update Group](#update-group)
    1. [Notes](#update-group-notes)
1. [Create Entry](#create-entry)
1. [Show Entry](#show-entry)
1. [Show Entries](#show-entries)
    1. [Find](#find)
1. [Delete Entry](#delete-entry)
1. [Update Entry](#update-entry)
    1. [Title](#update-entry-title)
    1. [Password](#update-entry-password)
    1. [User](#update-entry-user)
    1. [Notes](#update-entry-notes)
    1. [URL](#update-entry-url)

## Create Database

Use the following command to create a new database, either in the default local directory or a directory of your choice.

**Command Syntax:**

```bash
camelkey create database -n <name> -d <description> -p <password> --to <directory> | --local
```

**Command Parameters:**

|Parameters |Flag     |required | Description                                  |
|-----------|---------|--------|-----------------------------------------------|
|name       |`-n`     |✅|Specifies the name of the database.|
|description|`-d`     |❌|Sets the password for securing the database.|
|password   |`-p`     |✅|Provides an optional description for the database.|
|to         |`--to`   |❌|Allows you to specify the directory where the database will be stored.|
|local      |`--local`|❌|Chooses the default local directory for storing the database. (Default option)|

This command provides flexibility in choosing the storage location for your database by utilizing the `--to` parameter or defaults to the local directory with `--local`. 

---

## Show Databases

Use this command to display all databases stored in the local directory.

**Command Syntax:**

```bash
camelkey show databases
```

---

## Open Database

Use this command to enter manager mode for a database, either in the default local directory (using the `--local` option) or in another specified directory (using the `--to` option).

**Command Syntax:**

```bash
camelkey open -db <name> -p <password> --to <directory> | --local
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| database   | `-db`    | ✅       | Name of the database to open.                       |
| password   | `-p`     | ✅       | Masster Password registered in the database.                |
| to         | `--to`   | ❌       | Specify the directory where the database is stored. |
| local      | `--local`| ❌       | Choose the local directory for the database. (Default option)|

If this command is successful, the following prompt should appear

```bash
camelkey>
```

---
## Show Current Database

Within manager mode you can display data from the current database. If you use the `--password` option, it shows all critical information without sensitivity.

**Command Syntax:**

```bash
camelkey> show database --password <password>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| password   | `-p`     | ❌       | Master Password registered in the database.       |

---


## Delete Database

Within manager mode you can delete the current database.

**Command Syntax:**

```bash
camelkey> delete database
```

---

## Create Category

Within the manager mode you can create a new category to store credentials in a segmented way.

**Command Syntax:**

```bash
camelkey> create category --name <name>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| name       | `-n`     | ✅      | Name for the new category                          |

---

## Show Categories

With the following command in manager mode you can list all the categories you have created

**Command Syntax:**

```bash
camelkey> show categories
```

---

## Show Category

With the following command in manager mode you can display the information of a specific category using its identifier.

**Command Syntax:**

```bash
camelkey> show category --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`     | ✅      | Category identifier.                             |

---

## Delete Category

With the following command in manager mode you can delete a specific category using its identifier.

**Command Syntax:**

```bash
camelkey> delete category --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`     | ✅      | Category identifier.                            |

---

## Create Group

Within the manager mode, you can subsegment categories by creating groups within them.

**Command Syntax:**

```bash
camelkey> group --name <name> --notes <notes> --category <category>
```

**Command Parameters:**

| Parameters | Flag      | Required | Description                                       |
|------------|-----------|----------|---------------------------------------------------|
| name       | `-n`      | ✅      | Name for the new group.                          |
| notes      | `--notes` | ❌      | Aditional information for group.                 |
| category   | `-c`      | ✅      | Categoty name to stored the new group.           |

---

## Show Groups

In the manager mode you can list all groups created within the specified category.

**Command Syntax:**

```bash
camelkey> show groups --category <category>
```

**Command Parameters:**

| Parameters | Flag      | Required | Description                                       |
|------------|-----------|----------|---------------------------------------------------|
| category   | `-c`      | ✅      | Name of the category to which the group belongs.   |

---

## Show Group

With the following command in manager mode you can display the information of a specific group using its identifier.

**Command Syntax:**

```bash
camelkey> show group --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Group identifier.                             |

---

## Delete Group

With the following command in manager mode you can delete a specific group using its identifier.

**Command Syntax:**

```bash
camelkey> delete group --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Group identifier.                             |

---

## Update Group

### Update Group: notes

You can modify the notes of a group within the manager mode, using its identifier and adding the new notes as an argument of the `notes` command.

**Command Syntax:**

```bash
camelkey> update group notes <notes> --id <id> 
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Group identifier.                             |
| notes      | `<notes>`| ✅      | Text for updating group notes.                |

---

## Create Entry

This command is used to create a new credential, which can belong to a group or a category.

**Command Syntax:**

```bash
camelkey> create entry --title <title> --user <username> --password <password> --url <url> --notes <notes> --category <category> --group <group>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| title      | `-t`     | ✅      | Text describing the new entry, may contain spaces. |
| user       | `-u`     | ✅      | User to which the new entry belongs.               |
| password   | `-p`     | ✅      | Password to be saved in the new entry.             |
| category   | `-c`     | ❌      | Category to which to assign the new entry.         |
| group      | `-g`     | ❌      | Group to which to assign the new entry.            |
| url        | `--url`  | ❌      | url in which to use the saved credentials.         |
| notes      | `--notes`| ❌      | Aditional information for entry                    |

---

## Show Entry

With the following command in manager mode you can display the information of a specific entry using its identifier.

**Command Syntax:**

```bash
camelkey> show entry --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅       | Entry identifier.                                |

---

## Show Entries

This command displays a list of entries, allowing for filtering based on the specified category and group, with priority given to the category. If the category or group options are not included, all registered entries will be displayed.

### Find

Its subcommand, `find`, enables filtering between the first or the last `n` elements of the list of entries.

**Command Syntax:**

```bash
camelkey> show entries --category <category> --group <group> find --last <n> --first <n>
```

**Command Parameters:**

| Parameters | Flag       | Required | Description                                       |
|------------|------------|----------|---------------------------------------------------|
| category   | `-c`       | ❌        | Name of a registered category.                    |
| group      | `-g`       | ❌        | Name of a registered group.                       |
| last       | `--last <n>` | ❌      | Specifies an integer number of entries to display.|
| first      | `--first <n>` | ❌     | Specifies an integer number of entries to display.|

---

## Delete Entry

With the following command in manager mode you can delete a specific entry using its identifier.

**Command Syntax:**

```bash
camelkey> delete entry --id <id>
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Entry identifier.                             |


---

## Update Entry

### Update Entry: title

This is a command to update the title of an entry. It can be inside single or double quotes if it contains spaces.

**Command Syntax:**

```bash
camelkey> update entry title <title> --id <id> 
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Entry identifier.                                 |
| title      | `<title>`| ✅      | New Title                                         |

---

### Update Entry: password

This is a command to update the password of an entry.

**Command Syntax:**

```bash
camelkey> update entry password <password> --id <id> 
```

**Command Parameters:**

| Parameters | Flag        | Required | Description                                       |
|------------|-------------|----------|---------------------------------------------------|
| id         | `--id`      | ✅      | Entry identifier.                                 |
| password   | `<password>`| ✅      | New Password                                      |

---

### Update Entry: user

Command to update the user name of an entry.

**Command Syntax:**

```bash
camelkey> update entry user <user> --id <id> 
```

**Command Parameters:**

| Parameters | Flag        | Required | Description                                       |
|------------|-------------|----------|---------------------------------------------------|
| id         | `--id`      | ✅      | Entry identifier.                                 |
| user       | `<user>`    | ✅      | New User                                          |

---

### Update Entry: notes

This command updates the notes of an entry. If they contain spaces, single or double quotes can be used.

**Command Syntax:**

```bash
camelkey> update entry notes <notes> --id <id> 
```

**Command Parameters:**

| Parameters | Flag     | Required | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| id         | `--id`   | ✅      | Group identifier.                                 |
| notes      | `<notes>`| ✅      | Text for updating group notes.                    |

---

### Update Entry: url

Command to update the URL registered in an entry.

**Command Syntax:**

```bash
camelkey> update entry url <url> --id <id>
```

**Command Parameters:**

| Parameters | Flag        | Required | Description                                       |
|------------|-------------|----------|---------------------------------------------------|
| id         | `--id`      | ✅      | Entry identifier.                                 |
| url        | `<url>`     | ✅      | New URL                                           |