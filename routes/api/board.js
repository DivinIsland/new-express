var express = require("express");
var { isLoggedMiddleWare } = require("../middleware");
var { v4 } = require("uuid");
const { database } = require("../../database/mysql");
const moment = require("moment");
var router = express.Router();
const uuid4 = v4;

//NOTE: board page rendering
router.get("/", isLoggedMiddleWare, async (req, res, next) => {
  const rows = await database.query(`SELECT * FROM test.board`);

  const boardList = [...rows].map((item) => {
    return {
      ...item,
      stringCreateAt: moment.unix(item.createAt).format("YYYY-MM-DD"),
    };
  });

  boardList.forEach((item) => {
    console.log(item, "item");
  });

  res.render("board", { title: "Board", boardList });
});

//NOTE: board write page rendering
router.get("/write", isLoggedMiddleWare, (req, res, next) => {
  res.render("write", { title: "Write" });
});

//NOTE: board write api router.
router.post("/api/write", isLoggedMiddleWare, async (req, res, next) => {
  const { title, content } = req.body;
  const { name } = req.session.profile;
  const contentSeq = uuid4().replace(/\-/g, "");
  const createAt = moment().unix();

  const rows = await database.query(`
  INSERT INTO test.board (author, title, content, contentSeq, createAt) VALUES ("${name}","${title}","${content}","${contentSeq}","${createAt}")
  `);

  if (rows.affectedRows === 1) {
    res.json({ result: 1 });
  } else {
    res.json({ result: 2 });
  }
});

//NOTE: board delete api router.
router.post("/api/delete", isLoggedMiddleWare, async (req, res, next) => {
  const { list } = req.body;
  const newList = list
    .map((item) => {
      return `"${item}"`;
    })
    .join(",");

  const rows = await database.query(`
  DELETE FROM test.board WHERE contentSeq IN (${newList})`);

  if (rows.affectedRows) {
    res.json({ result: 1 });
  } else {
    res.json({ result: 2 });
  }
});

module.exports = router;
