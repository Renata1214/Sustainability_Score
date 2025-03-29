# import json

# # Load the file and parse its content as JSON
# with open("message.txt", "r", encoding="utf-8") as file:
#     raw_json = file.read()
#     data = json.loads(raw_json)

# # Now you can use it like a dictionary
# print(data["merchant"]["name"])  # Walmart
# print(len(data["transactions"])) # Number of transactions

import sqlite3

with open("sustainability_schema.sql", "r") as file:
    schema = file.read()

conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()
cursor.executescript(schema)
conn.commit()
conn.close()



