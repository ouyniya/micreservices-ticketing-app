import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";


const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Provide a valid Id");
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    return res.status(404).send("Ticker not found");
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
