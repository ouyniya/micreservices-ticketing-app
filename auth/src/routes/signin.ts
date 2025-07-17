import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  // validation
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("No email or password for input data");
  }

  console.log("validate...1");

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    return res.status(400).json("Invalid credentials");
  }

  console.log("validate...password");

  // generate JWT
  const userJWT = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );

//   console.log(process.env.JWT_KEY);

  // Store it on session object
  req.session = {
    jwt: userJWT,
  };

  console.log("Creating a user...");

  res.status(201).send(existingUser);
});

export { router as signinRouter };
