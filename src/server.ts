import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize().catch((error) =>
    console.error("Error during data Source initialization", error)
  );

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at port ${process.env.PORT || 3000}`);
  });
})();
