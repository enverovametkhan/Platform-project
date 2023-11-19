module.exports = {
  async up(db, client) {
    await db.createCollection("Users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              bsonType: "string",
            },
            email: {
              bsonType: "string",
            },
            password: {
              bsonType: "string",
            },
            verifyEmail: {
              bsonType: "string",
            },
            accessToken: {
              bsonType: "string",
            },
            refreshToken: {
              bsonType: "string",
            },
            deletedAt: {
              bsonType: "string",
            },
            createdAt: {
              bsonType: "int",
            },
            updatedAt: {
              bsonType: "int",
            },
          },
        },
      },
    });
  },
  validationLevel: "strict",
  validationAction: "error",

  async down(db, client) {
    await db.collection("Users").drop();
  },
};