# api.py
import sqlite3
import json

def export_leaderboard_to_json():
    conn = sqlite3.connect("/workspaces/Sustainability_Score/sustainability.db")
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, total_score FROM leaderboard ORDER BY total_score DESC")
    rows = cursor.fetchall()
    conn.close()

    data = [{"user_id": user_id, "score": score} for user_id, score in rows]

    # Save to a file inside your Expo project
    with open("/workspaces/Sustainability_Score/Wiam/app/data/leaderboard.json", "w") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    export_leaderboard_to_json()
