module.exports = {
  async up(db, client) {
    await db.createCollection("Blogs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "title", "content", "image", "visible"],
          properties: {
            userId: {
              bsonType: "objectId",
            },
            title: {
              bsonType: "string",
            },
            content: {
              bsonType: "string",
            },
            image: {
              bsonType: "string",
            },
            views: {
              bsonType: "int",
            },
            likes: {
              bsonType: "int",
            },
            visible: {
              bsonType: "bool",
            },
            category: {
              bsonType: "string",
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
    await db.collection("Blogs").drop();
  },
};
