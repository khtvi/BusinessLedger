const Database = require('better-sqlite3');
const db = new Database('planners.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    downloads INTEGER NOT NULL,
    status TEXT NOT NULL
  )
`);

console.log('Table created!');

const insert = db.prepare(`
  INSERT INTO products (productName, category, price, downloads, status)
  VALUES (?, ?, ?, ?, ?)
`);

insert.run('2026 Digital Weekly Planner', 'Planner', 8, 142, 'Active');
insert.run('Personal Budget Tracker', 'Finance', 6, 231, 'Active');
insert.run('Small Business Expense Tracker', 'Business', 10, 87, 'Active');
insert.run('Instagram Content Planner', 'Social Media', 9, 156, 'Active');
insert.run('Freelancer Invoice Template', 'Business', 7, 113, 'Active');
insert.run('Monthly Meal Planner', 'Lifestyle', 5, 98, 'Active');
insert.run('Student Study Planner', 'Education', 6, 205, 'Active');
insert.run('Wedding Planning Checklist', 'Events', 8, 64, 'Archived');

console.log(db.prepare('SELECT * FROM products').all());

// Which digital products are currently available for customers to purchase?
const activeProducts = db.prepare(`
  SELECT productName, category, price
  FROM products
  WHERE status = ?
`).all('Active');
console.log('Active products:', activeProducts);

// Which products are the most popular based on number of downloads?
const byDownloads = db.prepare(`
  SELECT productName, downloads
  FROM products
  ORDER BY downloads DESC
`).all();
console.log('Products ranked by downloads:', byDownloads);

// How many products does the shop have in each category?
const byCategory = db.prepare(`
  SELECT category, COUNT(*) as total
  FROM products
  GROUP BY category
`).all();
console.log('Products per category:', byCategory);

// Which products are priced above $7?
const overSeven = db.prepare(`
  SELECT productName, category, price
  FROM products
  WHERE price > ?
  ORDER BY price DESC
`).all(7);
console.log('Products priced above $7:', overSeven);
