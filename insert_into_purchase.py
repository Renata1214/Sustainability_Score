import sqlite3
import json
from datetime import datetime

# Load JSON data
with open("Mock_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Connect to the database
conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()

# Insert products into the purchases table
for txn in data["transactions"]:
    store = data["merchant"]["name"]
    user_id = txn.get("external_id", "test_user")  # use external_id or placeholder
    timestamp = txn.get("datetime", datetime.utcnow().isoformat())

    for product in txn["products"]:
        brand = product.get("brand", "Unknown")
        name = product.get("name")
        quantity = product.get("quantity", 1)
        price = product.get("price", {})
        unit_price = price.get("unit_price", 0)
        total_price = price.get("total", 0)

        cursor.execute("""
            INSERT INTO purchases (user_id, store, brand, product_name, quantity, unit_price, total_price, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (user_id, store, brand, name, quantity, unit_price, total_price, timestamp))

# Commit and close
conn.commit()
conn.close()

print("Sample transactions inserted into purchases table.")
