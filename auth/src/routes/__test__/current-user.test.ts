import request from "supertest";
import { app } from "../../app";

it("respond with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  //   console.log(response.body);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(response.body.currentUser).toEqual(null);
});
