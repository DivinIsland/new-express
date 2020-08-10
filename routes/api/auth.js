var express = require("express");
var { database } = require("../../database/mysql");
var { v4 } = require("uuid");
var router = express.Router();
const uuid4 = v4;

//NOTE:   signup api router
router.post("/api/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const userCode = uuid4().replace(/\-/g, "");

  try {
    const rows = await database.query(`
    INSERT INTO test.auth (name, email, password, userCode) VALUES ("${name}","${email}","${password}","${userCode}")
    `);

    if (rows.affectedRows === 1) {
      res.json({ result: 1 });
    }
  } catch {
    res.json({ result: 2 });
  }
});
//NOTE:   signin api router
router.post("/api/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const rows = await database.query(`
    SELECT * FROM test.auth WHERE email="${email}" AND password="${password}"
    `);
  if (rows.length) {
    req.session.isLogged = true;
    req.session.profile = {
      email: rows[0].email,
      name: rows[0].name,
      userCode: rows[0].userCode,
    };
    res.json({ result: 1, name: rows[0].name });
  } else {
    res.json({ result: 2 });
  }
});

//NOTE: signout api router
router.post("/api/signout", async (req, res, next) => {
  const { name, userCode } = req.session.profile;

  try {
    const rows = await database.query(
      `DELETE FROM test.auth WHERE userCode="${userCode}"`
    );
    if (rows.affectedRows === 1) {
      res.json({ result: 1, name });
    }
  } catch {
    res.json({ result: 2 });
  }
});

module.exports = router;
