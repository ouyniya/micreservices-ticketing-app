import express from "express";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { currentUser } from "@nysticket/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createTicketRouter);

export { app };
