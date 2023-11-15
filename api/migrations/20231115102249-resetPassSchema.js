module.exports = {
  async up(db, client) {
    await db.createCollection("ResetPass", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["id", "userId", "token"],
          properties: {
            id: {
              bsonType: "string",
            },
            userId: {
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
    await db.collection("ResetPass").drop();
  },
};
