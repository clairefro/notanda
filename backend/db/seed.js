const { pool } = require("./_db");

const seedData = async () => {
  try {
    // Insert authors
    const authors = [{ name: "Martin Buber" }, { name: "Violette Leduc" }];

    const authorIds = [];
    for (const author of authors) {
      const result = await pool.query(
        "INSERT INTO authors (name) VALUES ($1) RETURNING id",
        [author.name]
      );
      authorIds.push(result.rows[0].id);
    }

    // Insert items
    const items = [
      { title: "I and Thou", type: "book", authorId: authorIds[0] },
      {
        title: "La Batarde (The Bastard)",
        type: "book",
        authorId: authorIds[1],
      },
    ];

    for (const item of items) {
      const result = await pool.query(
        "INSERT INTO items (title, type) VALUES ($1, $2) RETURNING id",
        [item.title, item.type]
      );

      const itemId = result.rows[0].id;

      // Associate authors with items
      await pool.query(
        "INSERT INTO item_authors (item_id, author_id) VALUES ($1, $2)",
        [itemId, item.authorId]
      );
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  } finally {
    // Ensure pool.end() is called only once
    if (!pool.ended) {
      await pool.end();
      console.log("Database connection pool closed.");
    }
  }
};

seedData();
