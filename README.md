# Sample Database Ledger

A small database for a one-person digital shop selling downloadable planners, trackers, and templates. Customers buy a file, download it instantly, and this database tracks the product catalog.

## Table: `products`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER (PK, AUTOINCREMENT) | Unique product ID, assigned automatically |
| productName | TEXT (NOT NULL) | Name of the digital product |
| category | TEXT (NOT NULL) | Product type (Planner, Finance, Business, etc.) |
| price | INTEGER (NOT NULL) | Price in whole Philippine pesos (₱) |
| downloads | INTEGER (NOT NULL) | Total number of times the product has been downloaded |
| status | TEXT (NOT NULL) | Either `Active` or `Archived` |

## What each query answers

1. **Active products query** — Which products can customers currently buy? Filters out anything archived, since those shouldn't show up in the shop.
2. **Downloads query** — Which products are the most popular? Sorts every product by download count, highest first, so I know what's actually selling.
3. **Category count query** — How is my catalog balanced across categories? Groups products by category and counts how many exist in each, so I can see if I'm overloaded in one area (e.g. too many Business templates) and light in others.
4. **Price-over-₱200 query** — Which are my higher-priced products? Filters to anything above ₱200 and sorts by price, useful for spotting which premium items are worth promoting more.

## Running it

```
npm install better-sqlite3
node setup.js
```

This creates `planners.db` and prints the full product list plus the results of all four queries to the terminal.
