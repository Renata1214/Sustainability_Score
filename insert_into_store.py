import pandas as pd
import sqlite3

# Load the Excel file
df = pd.read_excel("store_data_hackathon.xlsx", engine="openpyxl")

# Optional: show first few rows
print("Preview of imported data:")
print(df.head())

# Connect to your SQLite database
conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()

# Insert rows into the store_emissions table
for _, row in df.iterrows():
    cursor.execute("""
        INSERT OR REPLACE INTO store_emissions (name, co2_emissions, revenue, emissions_intensity)
        VALUES (?, ?, ?, ?)
    """, (
        row["name"],
        row["co2_emissions"],
        row["revenue"],
        row["emissions_intensity"]
    ))

# Commit changes and close connection
conn.commit()
conn.close()

print("Data inserted into store_emissions table successfully.")
