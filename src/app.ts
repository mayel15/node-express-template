// src/app.ts
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at: [http://localhost:${PORT}]`);
});
