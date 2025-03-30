from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# 👇 Equivalent to AllowAnyMethod, AllowAnyHeader, any origin, allow credentials
CORS(app, supports_credentials=True, origins="*")

@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    conn = sqlite3.connect("/workspaces/Sustainability_Score/sustainability.db")
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, total_score FROM leaderboard ORDER BY total_score DESC")
    rows = cursor.fetchall()
    conn.close()

    return jsonify([
        {"user_id": user_id, "score": score} for user_id, score in rows
    ])

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
