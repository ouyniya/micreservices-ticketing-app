import express, { Request, Response } from "express";
import { requireAuth } from "@nysticket/common";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).send("Provide a valid title");
    }

    if (!price || typeof price !== "number") {
      return res.status(400).send("Provide a valid price");
    }

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser?.id!,
    });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
