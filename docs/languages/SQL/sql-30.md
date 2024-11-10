---
id: sql-create-database
sidebar_position: 30
title: "SQL CREATE DATABASE Statement"
sidebar_label: "SQL CREATE DATABASE"
description: "The SQL CREATE DATABASE statement is used to create a new database."
tags: [sql, dbms, database, create database]
---

The `CREATE DATABASE` statement in SQL is used to create a new database. It allows you to specify the name of the database and, in some SQL systems, additional configuration options such as character set, collation, and storage settings.

### Syntax

```sql
CREATE DATABASE database_name;
```

### Key Points
* Database Name: Must be unique within the SQL server.
* Permissions: Creating a database usually requires administrative or specific permissions.
* Optional Clauses: Some SQL systems support additional options like CHARACTER SET and COLLATE to define the database encoding and collation.

### Example

**Example 1: Basic CREATE DATABASE Statement**

Create a database named StoreDB.

```sql
CREATE DATABASE StoreDB;
```

**Example 2: CREATE DATABASE with Character Set and Collation**

Create a database named CustomerDB with specific character set and collation (supported in certain SQL systems like MySQL).

```sql
CREATE DATABASE CustomerDB 
CHARACTER SET utf8 
COLLATE utf8_general_ci;
```

**Example 3: Checking for Database Existence**

To avoid errors when creating a database that might already exist, use a conditional check (supported in certain databases).

```sql
CREATE DATABASE IF NOT EXISTS InventoryDB;
```

### Viewing Created Databases

After creating a database, you can view a list of databases using:

```sql
SHOW DATABASES;  -- MySQL
```

Or, in SQL Server:

```sql
SELECT name 
FROM sys.databases;
```

**Notes :**
* Database Creation: The CREATE DATABASE statement is supported in most SQL-based databases like MySQL, PostgreSQL, and SQL Server, but syntax may vary slightly.
* Modifying Databases: Once created, you can alter database settings with ALTER DATABASE.
* Dropping Databases: Use DROP DATABASE database_name; to remove a database, but be cautious as this action is irreversible.

The CREATE DATABASE statement is essential for setting up new databases within an SQL server, laying the foundation for organizing and managing data.
