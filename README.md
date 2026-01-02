# Local dev

only use docker for db, use hot reloading for others

```sh
# Start just the db in docker

# (first time)
npm run docker:build

npm run docker:dev:up    # Starts DB only

# (first time)
npm run be:db:setup      # Setup tables
npm run be:db:seed       # Add sample data

# Run backend locally (uses Docker DB)
npm run be:dev

# Run frontend locally (proxies to local backend)
npm run fe:dev
```

when done:

```sh
npm run docker:dev:down
```

# Test prod build

```sh
npm run docker:build
npm run docker:up
```

# Setting Up PostgreSQL

This guide explains how to set up PostgreSQL for development on macOS and Linux.

## Automated Databse Setup

For a streamlined setup process, use the `setup_postgres.sh` script included in this repository. This script supports both macOS and Linux environments.

### Make the Script Executable

Before running the script, ensure it is executable and your user has permission to modify /usr/local. Run the following command:

```bash
chmod +x ./setup_postgres.sh
sudo chown -R $(whoami):admin /usr/local
```

then

```bash
./setup_postgres.sh
```

You will be prompted for database name, user name and password - remember these to update your environment later!

---

### Update Environment Variables

Ensure your `.env` file is updated to use the username, database name and password you setup.

This ensures your application connects to the database using the correct user.

---

## Troubleshooting

### Permission Denied for `/usr/local/var/postgres`

If you encounter a `Permission denied` error, fix it by changing the ownership of the directory:

```bash
sudo chown -R $(whoami) /usr/local/var
```

### PostgreSQL Service Not Found

If the `brew services` command does not work, try managing PostgreSQL manually using `pg_ctl`:

```bash
pg_ctl -D /usr/local/var/postgres start
```

### Missing `postgres` Role

If the `postgres` role is missing, recreate it:

```bash
createuser -s postgres
```

### Verify the `postgres` User

To check if the `postgres` user exists, you can use the `psql` command-line tool:

1. Access the PostgreSQL REPL:

   ```bash
   psql postgres
   ```

2. List all roles to verify the `postgres` user:
   ```sql
   \du
   ```

If the `postgres` user is listed, it exists and is ready for use. If not, you may need to create it manually.

---

## PostgreSQL Cheatsheet

### Logging in as a User

To log into a PostgreSQL database as a specific user:

```bash
psql -U <username> -d <database_name>
```

If the database is hosted on a specific host or port, include:

```bash
psql -U <username> -d <database_name> -h <host> -p <port>
```

### Viewing All Tables in a Database

```bash
\dt
```

### Making Basic Queries

Here are some examples of basic SQL queries:

- **Select all rows from a table**:

  ```sql
  SELECT * FROM items;
  ```

- **Insert a new row into a table**:

  ```sql
  INSERT INTO <table_name> (column1, column2) VALUES ('value1', 'value2');
  ```

- **Update rows in a table**:

  ```sql
  UPDATE <table_name>
  SET column1 = 'new_value'
  WHERE column2 = 'condition';
  ```

- **Delete rows from a table**:
  ```sql
  DELETE FROM <table_name>
  WHERE column = 'condition';
  ```

For further assistance, refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/).

---

## Seeding the Database for Development

To populate the database with initial data for development, use the `seed.js` script:

1. Run the following command:
   ```bash
   npm run be:db:seed
   ```
2. This will insert sample data into the database tables.

Ensure the database is set up before running the seed script.

---

## Clearing and Destroying the Database

### Clearing the Database

To remove all data from the database while keeping the schema intact, use the `clear.js` script:

1. Run the following command:
   ```bash
   npm run be:db:clear
   ```
2. You will be prompted to confirm the action. This will truncate all tables and reset their identities.

### Destroying the Database

To drop all tables and completely destroy the database schema, use the `destroy.js` script:

1. Run the following command:
   ```bash
   npm run be:db:destroy
   ```
2. You will be prompted to confirm the action. This will drop all tables in the database.

Use these scripts with caution, especially in production environments.
