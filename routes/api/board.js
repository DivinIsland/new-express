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

  try {
    const rows = await database.query(`
  INSERT INTO test.board (author, title, content, contentSeq, createAt) VALUES ("${name}","${title}","${content}","${contentSeq}","${createAt}")
  `);

    if (rows.affectedRows === 1) {
      res.json({ result: 1 });
    }
  } catch (err) {
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

  try {
    const rows = await database.query(`
  DELETE FROM test.board WHERE contentSeq IN (${newList})`);

    if (rows.affectedRows) {
      res.json({ result: 1 });
    }
  } catch (err) {
    res.json({ result: 2 });
  }
});

//NOTE: board update rendering router.
router.get("/update", isLoggedMiddleWare, async (req, res, next) => {
  const { contentSeq } = req.query;

  try {
    const rows = await database.query(`
    SELECT * FROM test.board WHERE contentSeq="${contentSeq}" `);

    if (rows.length) {
      const rowData = rows[0];
      const body = {
        title: rowData.title,
        content: rowData.content,
        contentSeq,
      };

      console.log(body, rows);

      res.render("update", { title: "Update", body });
    }
  } catch (err) {
    console.log("fail");
  }
});

//NOTE: board update api router.
router.post("/api/update", isLoggedMiddleWare, async (req, res, next) => {
  const { title, content, contentSeq } = req.body;

  try {
    const rows = await database.query(`
UPDATE test.board SET title="${title}", content="${content}" WHERE contentSeq="${contentSeq}"
`);

    if (rows.affectedRows) {
      res.json({ result: 1 });
    }
  } catch (err) {
    res.json({ result: 2 });
  }
});
module.exports = router;
