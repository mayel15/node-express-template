// src/app.ts
import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes";
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

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the template server dude!",
    swaggerDocs: "http://localhost:3000/docs",
    commands: [
      {
        exec: "npm install",
        description: "Install dependencies",
      },
      {
        exec: "npm run dev",
        description: "Start the development server",
      },
      {
        exec: "npm run build",
        description: "Build the project",
      },
      {
        exec: "npm run start",
        description: "Start the production server",
      },
      {
        exec: "npm run test",
        description: "Run tests",
      },
      {
        exec: "npm run swagger",
        description: "Generate swagger documentation",
      },
      {
        exec: "npm run prisma:studio",
        description: "Launch Prisma Studio for database management",
      },
      {
        exec: "npm run prisma:migrate:dev",
        description: "Migrate the database",
      },
    ],
    author: {
      name: "Pape THIAM",
      github: "https://github.com/mayel15",
    },
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at: [http://localhost:${PORT}]`);
});

export default app;
