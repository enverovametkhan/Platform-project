module.exports = {
  async up(db, client) {
    await db.createCollection("BlogLikes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "blogId"],
          properties: {
            userId: {
              bsonType: "objectId",
            },
            blogId: {
              bsonType: "objectId",
            },

            createdAt: {
              bsonType: "date",
            },
            updatedAt: {
              bsonType: "date",
            },
          },
        },
      },
    });
  },
  validationLevel: "strict",
  validationAction: "error",

  async down(db, client) {
    await db.collection("BlogLikes").drop();
  },
};
