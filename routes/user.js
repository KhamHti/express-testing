const { Router } = require("express");
const db = require("../dbConfig/db");
const { check, validationResult } = require("express-validator");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /user route");
  next();
});

router.get("/", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    const result = await db.promise().query(`SELECT * FROM USERS`);
    console.log(result[0]);
    res.status(200).send(result[0]);
  } else {
    res.status(403).send({ msg: "Not autnenticated" });
  }
});

router.get("/posts", (req, res) => {
  res.json({ route: "Posts" });
});

router.post(
  "/",
  [
    check("username")
      .notEmpty()
      .withMessage("Username should not be empty")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters"),
    check("password").notEmpty().withMessage("Password should not be empty"),
    //   .isLength({ min: 8 })
    //   .withMessage("Password must be at least 8 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    if (username && password) {
      try {
        db.promise().query(
          `INSERT INTO USERS VALUES ('${username}', '${password}')`
        );
        res.status(201).json({ msg: "Created User " });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

module.exports = router;
