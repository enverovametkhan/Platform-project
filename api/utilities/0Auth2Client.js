const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "456070408145-hmq6d9tjej1s7eg3ovboem4qd42rd2gt.apps.googleusercontent.com",
  "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"
);

async function verifyGmailToken(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience:
      "456070408145-hmq6d9tjej1s7eg3ovboem4qd42rd2gt.apps.googleusercontent.com",
  });

  const payload = await ticket.getPayload();
  console.log(payload);
  return {
    email: payload.email,
    username: payload.username,
  };
}

module.exports = { verifyGmailToken };
