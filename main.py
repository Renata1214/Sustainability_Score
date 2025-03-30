import sqlite3
from collections import defaultdict

print("Main running")

# Connect to the updated database
conn = sqlite3.connect("sustainability.db")
cursor = conn.cursor()

# Step 1: Get distinct users from purchases
cursor.execute("SELECT DISTINCT user_id FROM purchases")
users = [row[0] for row in cursor.fetchall()]

user_scores = {}

for user_id in users:
    total_score = 0

    # Fetch all purchases for this user
    cursor.execute("""
        SELECT store, brand FROM purchases WHERE user_id = ?
    """, (user_id,))
    purchases = cursor.fetchall()

    for store, brand in purchases:
        # Get store sustainability score
        cursor.execute("SELECT sustainability_score FROM store_emissions WHERE name = ?", (store,))
        store_score_row = cursor.fetchone()
        store_score = store_score_row[0] if store_score_row else 0

        # Get brand sustainability score
        cursor.execute("SELECT sustainability_score FROM brand_emissions WHERE name = ?", (brand,))
        brand_score_row = cursor.fetchone()
        brand_score = brand_score_row[0] if brand_score_row else 0

        # Add to total
        total_score += (store_score + brand_score)

    user_scores[user_id] = total_score

# Step 2.5: Scale scores to 0–100
MAX_POSSIBLE_SCORE = 200  # Adjust based on your expected upper limit

scaled_scores = {
    user_id: round((score / MAX_POSSIBLE_SCORE) * 100, 2)
    for user_id, score in user_scores.items()
}

# Step 3: Save scaled scores to leaderboard table
for user_id, scaled_score in scaled_scores.items():
    cursor.execute("""
        INSERT OR REPLACE INTO leaderboard (user_id, total_score)
        VALUES (?, ?)
    """, (user_id, scaled_score))

conn.commit()
    

# Step 4: Print leaderboard
leaderboard = sorted(scaled_scores.items(), key=lambda x: x[1], reverse=True)

print("🏆 Sustainability Leaderboard (Scaled 0–100)")
print("-------------------------------------------")
for rank, (user, score) in enumerate(leaderboard, 1):
    print(f"{rank}. {user} — {score:.2f} points")

# Step 4: Track most harmful (lowest scoring) products
harmful_products = defaultdict(list)

for user_id in users:
    # Get all products with store, brand, and product_name
    cursor.execute("""
        SELECT store, brand, product_name FROM purchases
        WHERE user_id = ?
    """, (user_id,))
    purchases = cursor.fetchall()

    product_scores = []

    for store, brand, product_name in purchases:
        # Get store sustainability score
        cursor.execute("SELECT sustainability_score FROM store_emissions WHERE name = ?", (store,))
        store_score_row = cursor.fetchone()
        store_score = store_score_row[0] if store_score_row else 0

        # Get brand sustainability score
        cursor.execute("SELECT sustainability_score FROM brand_emissions WHERE name = ?", (brand,))
        brand_score_row = cursor.fetchone()
        brand_score = brand_score_row[0] if brand_score_row else 0

        combined_score = store_score + brand_score
        # print(store)
        # print(brand)
        # print(combined_score)
        # print(store_score)
        # print(brand_score)

        product_scores.append({
            "product_name": product_name,
            "store": store,
            "brand": brand,
            "score": combined_score,
            "store_score" : store_score,
            "brand_score" : brand_score
        })

    # Sort by lowest scoring products
    product_scores.sort(key=lambda x: x["score"])
    harmful_products[user_id] = product_scores[:5]

# Print harmful product summaries
for user, products in harmful_products.items():
    print(f"\n❌ Most Harmful Products for {user}")
    print("-------------------------------------")
    for p in products:
        print(f"{p['product_name']} (Brand: {p['brand']}, Store: {p['store']}) — Score: {p['score']:.2f}")

# Done
conn.close()

# user_scores and harmful_products are now available to use in frontend logic
