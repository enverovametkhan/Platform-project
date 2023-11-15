module.exports = {
  async up(db, client) {
    await db.createCollection("users");
  },

  async down(db) {
    await db.collection("users").drop();
  },
};
