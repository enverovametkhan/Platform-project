process.on("uncaughtException", (error) => {
  console.error("Dealing with Unhandled Exception in a unique way");
  console.error("Uncaught Exception:", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Dealing with Unhandled Rejection in a unique way");
  console.error("Unhandled Rejection:", reason);

  process.exit(1);
});
