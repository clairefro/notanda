const pool = require("../backend/db/_db");

const seedData = async () => {
  try {
    // Insert authors
    const authors = [{ name: "Author One" }, { name: "Author Two" }];

    for (const author of authors) {
      await pool.query("INSERT INTO authors (name) VALUES ($1)", [author.name]);
    }

    // Insert items
    const items = [
      { title: "Item One", type: "book" },
      { title: "Item Two", type: "pdf" },
    ];

    for (const item of items) {
      const result = await pool.query(
        "INSERT INTO items (title, type) VALUES ($1, $2) RETURNING id",
        [item.title, item.type]
      );

      const itemId = result.rows[0].id;

      // associate authors with items
      await pool.query(
        "INSERT INTO item_authors (item_id, author_id) VALUES ($1, $2)",
        [itemId, 1] // associate with Author One for simplicity
      );
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  } finally {
    pool.end();
  }
};

seedData();
