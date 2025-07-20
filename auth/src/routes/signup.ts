import express from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).send("Provide a valid email");
  }

  if (!password || typeof password !== "string") {
    return res.status(400).send("Provide a valid password");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log("Email in use...");
    return res.status(400).send("Email in use");
  }

  const user = User.build({ email, password });
  await user.save();

  // generate JWT
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  console.log(userJWT);

  // Store it on session object
  req.session = {
    jwt: userJWT,
  };

  console.log("Created a user...");

  res.status(201).send(user);
});

export { router as signupRouter };
