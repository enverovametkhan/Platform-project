module.exports = {
  async up(db, client) {
    await db.createCollection("EmailSwap", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "newEmail", "token"],
          properties: {
            userId: {
              bsonType: "objectId",
            },
            newEmail: {
              bsonType: "string",
            },
            token: {
              bsonType: "string",
            },
            expiresAt: {
              bsonType: "date",
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
    await db.collection("EmailSwap").drop();
  },
};
