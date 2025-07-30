import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { requireAuth } from "@nysticket/common";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    const { title, price } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).send("Provide a valid title");
    }

    if (!price || typeof price !== "number" || price < 0) {
      return res.status(400).send("Provide a valid price");
    }

    if (!ticket) {
      return res.status(404).json("Ticket not found");
    }

    if (ticket.userId !== req.currentUser?.id) {
      return res.status(401).json("Unauthorized");
    }

    ticket.set({
      title,
      price,
    });

    return res.send(ticket);
  }
);

export { router as updateTicketRouter };
