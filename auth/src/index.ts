import express from "express";

const app = express();
app.use(express.json());

app.listen(3500, () => console.log("listening on port 3500"));
