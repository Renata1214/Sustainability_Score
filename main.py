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

# Step 2: Calculate sustainability score for each user
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

        # Add to user's total score
        total_score += (store_score + brand_score)

    user_scores[user_id] = total_score

# Step 3: Generate leaderboard (sorted by score descending)
leaderboard = sorted(user_scores.items(), key=lambda x: x[1], reverse=True)

# Print leaderboard
print("🏆 Sustainability Leaderboard")
print("----------------------------")
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

        product_scores.append({
            "product_name": product_name,
            "store": store,
            "brand": brand,
            "score": combined_score
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
