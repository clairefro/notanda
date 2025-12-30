#!/bin/bash

# Simplified PostgreSQL setup script
# This script installs PostgreSQL, ensures the service is running, and sets up a default database and user.

set -e  # Exit on any error

# Detect the operating system
OS="$(uname -s)"

# Prompt the user to remember the values for their .env file
cat <<EOF
Before proceeding, please note that you will need to remember the following three values for your .env file:
  - Database Name (DB_NAME)
  - Database User (DB_USER)
  - Database Password (DB_PASSWORD)
EOF

# Prompt for database name, user, and password without hardcoded defaults
read -p "Enter the database name: " DB_NAME
while [ -z "$DB_NAME" ]; do
  echo "Database name cannot be empty. Please enter a valid name."
  read -p "Enter the database name: " DB_NAME
done
# Remember this value for your .env file: DB_NAME=$DB_NAME

read -p "Enter the database user: " DB_USER
while [ -z "$DB_USER" ]; do
  echo "Database user cannot be empty. Please enter a valid user."
  read -p "Enter the database user: " DB_USER
done
# Remember this value for your .env file: DB_USER=$DB_USER

read -sp "Enter the database password: " DB_PASSWORD
while [ -z "$DB_PASSWORD" ]; do
  echo "\nDatabase password cannot be empty. Please enter a valid password."
  read -sp "Enter the database password: " DB_PASSWORD
done
# Remember this value for your .env file: DB_PASSWORD=<your_database_password>
echo

# Ensure PostgreSQL is installed
if ! command -v psql &> /dev/null; then
  echo "PostgreSQL is not installed. Installing..."
  if [ "$OS" = "Darwin" ]; then
    if ! command -v brew &> /dev/null; then
      echo "Homebrew is not installed. Please install Homebrew first."
      exit 1
    fi
    brew install postgresql
  elif command -v apt &> /dev/null; then
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
  elif command -v yum &> /dev/null; then
    sudo yum install -y postgresql-server postgresql-contrib
    sudo postgresql-setup initdb
  else
    echo "No supported package manager found. Install PostgreSQL manually."
    exit 1
  fi
fi

# Ensure PostgreSQL service is running
if [ "$OS" = "Darwin" ]; then
  if ! brew services list | grep postgresql | grep started &> /dev/null; then
    echo "Starting PostgreSQL service..."
    brew services start postgresql
  fi
else
  if ! command -v systemctl &> /dev/null; then
    echo "Systemctl not found. Ensure PostgreSQL is running manually."
    exit 1
  fi
  if ! sudo systemctl is-active --quiet postgresql; then
    echo "Starting PostgreSQL service..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
  fi
fi

# Ensure the 'postgres' system user exists (Linux only)
if [ "$OS" != "Darwin" ]; then
  if ! id -u postgres &> /dev/null; then
    echo "Creating 'postgres' system user..."
    sudo useradd -m -s /bin/bash postgres
  fi
fi

# Ensure the database exists
if [ "$OS" = "Darwin" ]; then
  # macOS: Use the current user
  if ! psql -d postgres -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "Creating database '$DB_NAME'..."
    psql -d postgres -c "CREATE DATABASE $DB_NAME;"
  else
    echo "Database '$DB_NAME' already exists."
  fi
else
  # Linux: Use the postgres user
  if ! sudo -u postgres psql -d postgres -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "Creating database '$DB_NAME'..."
    sudo -u postgres psql -d postgres -c "CREATE DATABASE $DB_NAME;"
  else
    echo "Database '$DB_NAME' already exists."
  fi
fi

# Ensure the role exists
if [ "$OS" = "Darwin" ]; then
  # macOS: Use the current user
  psql -d postgres <<EOF
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD '$DB_PASSWORD';
  END IF;
END $$;
EOF
else
  # Linux: Use the postgres user
  sudo -u postgres psql -d postgres <<EOF
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD '$DB_PASSWORD';
  END IF;
END $$;
EOF
fi

echo "PostgreSQL setup complete!"

# Step 8: Output success message
cat <<EOF
PostgreSQL setup is complete!

Ensure your .env file contains the following (replace placeholders with your values):

DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_HOST=localhost <or other host>
DB_NAME=<your_database_name>
DB_PORT=5432 <or other>

You can now proceed with npm run be:bd:setup.
EOF