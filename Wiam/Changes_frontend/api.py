from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/leaderboard")
def leaderboard():
    conn = sqlite3.connect("/workspaces/Sustainability_Score/sustainability.db")
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, total_score FROM leaderboard ORDER BY total_score DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"user_id": u, "score": s} for u, s in rows])

@app.route("/")
def home():
    return "API is running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
