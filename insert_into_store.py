import pandas as pd
import sqlite3

# Load the Excel file
df = pd.read_excel("store_data_hackathon.xlsx", engine="openpyxl")

# df.rename(columns={
#     "Store": "name",
#     "Co2 emissions": "co2_emissions",
#     "Revenue": "revenue",
#     "Emissions Intensity": "emissions_intensity"
# }, inplace=True)

# Optional cleanup (remove commas and convert to float)
for col in ["co2_emissions", "revenue", "emissions_intensity"]:
    df[col] = df[col].astype(str).str.replace(",", "").astype(float)

# Drop any rows with missing required values
df.dropna(subset=["name", "co2_emissions", "revenue", "emissions_intensity"], inplace=True)

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

print("INSERT_INTO_STORE Data inserted into store_emissions table successfully.")
