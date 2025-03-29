
-- Drop existing tables if needed
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS store_scores;
DROP TABLE IF EXISTS brand_scores;

-- Table 1: Raw purchase data
CREATE TABLE purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    store TEXT NOT NULL,
    brand TEXT NOT NULL,
    product_name TEXT,
    quantity INTEGER DEFAULT 1,
    unit_price REAL,
    total_price REAL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Per-purchase sustainability score
CREATE TABLE scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    store_points INTEGER DEFAULT 0,
    brand_points INTEGER DEFAULT 0,
    total_score INTEGER AS (store_points + brand_points) STORED,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
);

-- Table 3: Aggregated user leaderboard
CREATE TABLE leaderboard (
    user_id TEXT PRIMARY KEY,
    total_score INTEGER DEFAULT 0,
    last_updated TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Reference Table: Store point values
CREATE TABLE store_scores (
    store TEXT PRIMARY KEY,
    points INTEGER NOT NULL
);

-- Reference Table: Brand point values
CREATE TABLE brand_scores (
    brand TEXT PRIMARY KEY,
    points INTEGER NOT NULL
);

-- Sample store points
INSERT INTO store_scores (store, points) VALUES
('airbnb', 2),
('american airlines', 1),
('instacart', 3),
('uber eats', 2),
('doordash', 2),
('spotify', 4),
('uber', 2);

-- Sample brand points
-- Extended brand scores for Target, Walmart, Instacart, and DoorDash
INSERT INTO brand_scores (brand, points) VALUES
-- Target brands
('Good & Gather', 5),
('Up & Up', 4),
('Everspring', 4),
('Cat & Jack', 3),
('Archer Farms', 3),
('Threshold', 2),
('Market Pantry', 3),
('Made By Design', 2),

-- Walmart brands
('Great Value', 4),
('Equate', 4),
('Sam’s Choice', 5),
('Parent’s Choice', 5),
('Mainstays', 3),
('Wonder Nation', 2),
('Time and Tru', 3),
('George', 2),

-- Instacart brands
('O Organics', 5),
('365 by Whole Foods', 5),
('Signature Select', 3),
('Open Nature', 4),
('Instacart Organic', 4),

-- DoorDash / food brands
('Local Restaurants', 3),
('Plant Power Fast Food', 5),
('Sweetgreen', 5),
('Chipotle', 4),
('Panda Express', 2),
('McDonald’s', 1);

