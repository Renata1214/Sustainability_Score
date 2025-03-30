import subprocess
import sqlite3

# 1. Load SQL schema
with open("sustainability_schema.sql", "r") as f:
    schema_sql = f.read()

conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()
cursor.executescript(schema_sql)
conn.commit()
conn.close()

print("✅ Database schema initialized.")

# 2. List of Python scripts to run in parallel
scripts = [
    "insert_into_store.py",
    "insert_into_brand.py",
    "insert_into_purchase.py",
    "main.py"
]

# # 3. Launch each script
# processes = [subprocess.Popen(["python", script]) for script in scripts]

# # 4. Optional: wait for all to complete
# for p in processes:
#     p.wait()
for script in scripts:
    print(f"▶️ Running {script}...")
    subprocess.run(["python3", script], check=True)

