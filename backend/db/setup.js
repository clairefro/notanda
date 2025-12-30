const { setupDatabase } = require("./_db");

(async () => {
  try {
    await setupDatabase();
    console.log("Database setup script executed successfully.");
  } catch (err) {
    console.error("Error executing database setup script:", err.message);
  }
})();
