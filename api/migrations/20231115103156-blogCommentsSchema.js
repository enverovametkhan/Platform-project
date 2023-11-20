module.exports = {
  async up(db, client) {
    await db.createCollection("BlogComments", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "blogId", "content"],
          properties: {
            userId: {
              bsonType: "objectId",
            },
            blogId: {
              bsonType: "objectId",
            },
            content: {
              bsonType: "string",
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
    await db.collection("BlogComments").drop();
  },
};
