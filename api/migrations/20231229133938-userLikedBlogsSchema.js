module.exports = {
  async up(db, client) {
    await db.createCollection("BlogLikes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "blogId", "likes"],
          properties: {
            userId: {
              bsonType: "objectId",
            },
            blogId: {
              bsonType: "objectId",
            },

            likes: {
              bsonType: "int",
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
