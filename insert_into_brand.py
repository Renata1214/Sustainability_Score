import pandas as pd
import sqlite3

# Load Excel file
df = pd.read_excel("brand_data_hackathon.xlsx", engine="openpyxl")

# # Rename columns to match expected names
# df.rename(columns={
#     "Brand": "name",
#     "Co2 emissions": "co2_emissions",
#     "Revenue": "revenue",
#     "Emissions Intensity": "emissions_intensity"
# }, inplace=True)

for col in ["co2_emissions", "revenue", "emissions_intensity"]:
    df[col] = df[col].astype(str).str.replace(",", "").astype(float)

# Optional: print preview
print("📄 Preview of brand emissions data:")
print(df.head())

# Connect to the SQLite database
conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()

# Insert each row into the brand_emissions table
for _, row in df.iterrows():
    cursor.execute("""
        INSERT OR REPLACE INTO brand_emissions (name, co2_emissions, revenue, emissions_intensity)
        VALUES (?, ?, ?, ?)
    """, (
        row["name"],
        row["co2_emissions"],
        row["revenue"],
        row["emissions_intensity"]
    ))

# Commit and close
conn.commit()
conn.close()

print("INSERT_INTO_BRAND Brand emissions data inserted successfully.")
