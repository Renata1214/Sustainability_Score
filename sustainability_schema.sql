-- Drop existing tables if needed
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS store_emissions;
DROP TABLE IF EXISTS brand_emissions;

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

-- Store emissions table
CREATE TABLE store_emissions (
    name TEXT PRIMARY KEY,
    co2_emissions REAL NOT NULL,
    revenue REAL NOT NULL,
    emissions_intensity REAL NOT NULL,
    sustainability_score REAL GENERATED ALWAYS AS (
        100 - ((emissions_intensity / 501) * 100)
    ) STORED
);

-- Brand emissions table
CREATE TABLE brand_emissions (
    name TEXT PRIMARY KEY,
    co2_emissions REAL NOT NULL,
    revenue REAL NOT NULL,
    emissions_intensity REAL NOT NULL,
    sustainability_score REAL GENERATED ALWAYS AS (
        100 - ((emissions_intensity / 12.61) * 100)
    ) STORED
);
 