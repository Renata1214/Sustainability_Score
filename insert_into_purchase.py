import sqlite3
import json
from datetime import datetime

# Load JSON data
with open("Mock_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Connect to the database
conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()

# Iterate over users
for user in data["users"]:
    user_id = user["user_id"]

    # Each user has multiple examples (merchant + transactions)
    for example in user["Examples"]:
        store = example["merchant"]["name"]

        for txn in example["transactions"]:
            timestamp = txn.get("datetime", datetime.utcnow().isoformat())

            for product in txn["products"]:
                brand = product.get("brand", "Unknown")
                name = product.get("name")
                quantity = product.get("quantity", 1)

                price_data = product.get("price", {})
                unit_price = price_data.get("unit_price", 0)
                total_price = price_data.get("total", 0)

                cursor.execute("""
                    INSERT INTO purchases (user_id, store, brand, product_name, quantity, unit_price, total_price, timestamp)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (user_id, store, brand, name, quantity, unit_price, total_price, timestamp))

# Commit and close
conn.commit()
conn.close()

print("INSERT_INTO_PURCHASE Transactions successfully inserted into purchases table.")
