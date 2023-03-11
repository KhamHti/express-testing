const { Router } = require("express");
const db = require("../dbConfig/db");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /guestinfo route");
  next();
});

router.get("/", async (req, res) => {
  const result = await db.promise().query(`SELECT * FROM PERSONINFO`);
  console.log(result[0]);
  res.status(200).send(result[0]);

  //   res.status(200).send("get method okay pr byr");
});

router.get("/:guid", async (req, res) => {
  const { guid } = req.params;
  const result = await db
    .promise()
    .query(`SELECT * FROM PERSONINFO WHERE GUID="${guid}" `);
  console.log(result[0]);
  res.status(200).send(result[0]);
});

router.post("/", (req, res) => {
  const {
    guid,
    Name,
    PhNum,
    Org_Name,
    NRC,
    Address,
    City,
    Country,
    Visited_Reason,
  } = req.body;
  if (
    guid &&
    Name &&
    PhNum &&
    Org_Name &&
    NRC &&
    Address &&
    City &&
    Country &&
    Visited_Reason
  ) {
    try {
      db.promise().query(
        `INSERT INTO PERSONINFO VALUES ("${guid}", "${Name}", "${PhNum}", "${Org_Name}", "${NRC}", "${Address}", "${City}", "${Country}", "${Visited_Reason}")`
      );
      res.status(201).json({ msg: "PersonInfo Created" });
    } catch (error) {
      console.log(error);
      res.status(403).send("Forbbiden");
    }
  }
});

router.put("/:guid", (req, res) => {
  console.log("put api working");
  // const {
  //   guid,
  //   Name,
  //   PhNum,
  //   Org_Name,
  //   NRC,
  //   Address,
  //   City,
  //   Country,
  //   Visited_Reason,
  // } = req.body;
  const data = [
    // "guid",
    req.body.Name,
    req.body.PhNum,
    req.body.Org_Name,
    req.body.NRC,
    req.body.Address,
    req.body.City,
    req.body.Country,
    req.body.Visited_Reason,
    req.params.guid,
  ];
  db.query(
    "UPDATE PersonInfo SET Name=?, PhNum=?, Org_Name=? , NRC=?, Address=?, City=?, Country=?, Visited_Reason=? where guid = ?",
    data,
    (err, result) => {
      if (err) {
        res.send("Error");
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/:guid", (req, res) => {
  console.log("Delete api is working");
  const person_id = req.params.guid;
  db.query(
    "DELETE from PersonInfo where guid = " + person_id,
    (error, result) => {
      if (error) {
        res.send("Error");
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
