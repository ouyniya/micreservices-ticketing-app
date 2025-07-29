import express from "express";
import { currentUser } from "@nysticket/common";
import { requireAuth } from "@nysticket/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {

    res.send({ currentUser: req.currentUser || null });

  //   if (!req.session?.jwt) {
  //     return res.send({ currentUser: null }); // not login
  //   }

  //   //   console.log("key", process.env.JWT_KEY)

  //   try {
  //     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  //     res.send({ currentUser: payload });
  //   } catch (error) {
  //     console.log(error);
  //     res.send({ currentUser: null }); // not login
  //   }
});

export { router as currentUserRouter };
