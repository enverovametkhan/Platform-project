const { getNamespace } = require("cls-hooked");

const namespace = getNamespace("req");

async function getAccessToUserData() {
  const req = namespace.get("req");
  const userData = req.userData;
  return userData;
}

module.exports = { getAccessToUserData };
