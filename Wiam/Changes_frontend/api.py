# api.py
import sqlite3
import json

# def export_leaderboard_to_json():
#     conn = sqlite3.connect("/workspaces/Sustainability_Score/sustainability.db")
#     cursor = conn.cursor()
#     cursor.execute("SELECT user_id, total_score FROM leaderboard ORDER BY total_score DESC")
#     rows = cursor.fetchall()
#     conn.close()

#     data = [{"user_id": user_id, "score": score} for user_id, score in rows]

#     # Save to a file inside your Expo project
#     with open("/workspaces/Sustainability_Score/Wiam/app/data/leaderboard.json", "w") as f:
#         json.dump(data, f, indent=2)

# if __name__ == "__main__":
#     export_leaderboard_to_json()
def export_leaderboard_and_harmful_products():
    conn = sqlite3.connect("/workspaces/Sustainability_Score/sustainability.db")
    cursor = conn.cursor()

    # Export leaderboard
    cursor.execute("SELECT user_id, total_score FROM leaderboard ORDER BY total_score DESC")
    leaderboard_rows = cursor.fetchall()
    leaderboard_data = [{"user_id": user_id, "score": score} for user_id, score in leaderboard_rows]

    # Get top 5 harmful products for user_001
    cursor.execute("""
        SELECT store, brand, product_name FROM purchases WHERE user_id = ?
    """, ("user_001",))
    purchases = cursor.fetchall()

    product_scores = []
    for store, brand, product_name in purchases:
        cursor.execute("SELECT sustainability_score FROM store_emissions WHERE name = ?", (store,))
        store_score_row = cursor.fetchone()
        store_score = store_score_row[0] if store_score_row else 0

        cursor.execute("SELECT sustainability_score FROM brand_emissions WHERE name = ?", (brand,))
        brand_score_row = cursor.fetchone()
        brand_score = brand_score_row[0] if brand_score_row else 0

        combined_score = store_score + brand_score

        product_scores.append({
            "product_name": product_name,
            "store": store,
            "brand": brand,
            "score": combined_score,
        })

    product_scores.sort(key=lambda x: x["score"])
    harmful_top_5 = product_scores[:5]

    # Export both to one JSON file
    with open("/workspaces/Sustainability_Score/Wiam/app/data/leaderboard.json", "w") as f:
        json.dump({
            "leaderboard": leaderboard_data,
            "harmful_products_user_001": harmful_top_5
        }, f, indent=2)

    conn.close()

if __name__ == "__main__":
    export_leaderboard_and_harmful_products()
