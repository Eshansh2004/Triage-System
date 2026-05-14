import cors from "cors";
import express from "express";
import { apiRouter } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const ALLOWED_ORIGINS = [
  "https://triage-gamma-jade.vercel.app",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

export const createApp = () => {
  const app = express();

  const isLocalDev = process.env.NODE_ENV !== "production";

  app.use(
    cors({
      origin: isLocalDev ? true : ALLOWED_ORIGINS,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
