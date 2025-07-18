import request from "supertest";
import { app } from "../../app";

it("return a 201 on a successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "password",
    })
    .expect(400);
});
