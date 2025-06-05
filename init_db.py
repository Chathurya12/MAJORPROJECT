import sqlite3

# Connect to SQLite database (or create it)
conn = sqlite3.connect('users.db')

# Create a table for users
conn.execute('''CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)''')

conn.close()
print("Database initialized!")
