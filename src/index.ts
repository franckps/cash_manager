import express from "express";

console.log(`PORT: (${process.env.PORT})`);

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
