const express = require("express");

const guestInfoRoute = require("./routes/guestInfo");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Guest Survey" });
});

app.use("/guestinfo", guestInfoRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
