const { Router } = require("express");
const db = require("./db");
const router = new Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, users) => {
    res.json(users);
  });
});
router.get("/priorities", (req, res) => {
  db.query("SELECT * FROM priorities", (err, priorities) => {
    res.json(priorities);
  });
});
router.get("/columns", async (req, res) => {
  const [columnsData, tasksData] = await Promise.all([
    db.promise().query("SELECT * from columns;"),
    db.promise().query("SELECT * from tasks;")
  ]);

  const [columns] = columnsData;
  const [tasks] = tasksData;

  const result = columns.map(column => {
    column.items = tasks.filter(task => task.column_id === column.id);
    return column;
  });

  await res.json(result);
});
// get получить с бд
// put добавить в бд
// patch редактировать бд
// delete удалить

// добавление карточки
router.put("/tasks", jsonParser, (req, res) => {
  const { columnId, title } = req.body;
  db.query(
    "insert into tasks (column_id, title) values (?, ?)",
    [columnId, title],
    function(err, results) {
      if (err) {
        res.send([err, columnId, title]);
        return;
      }

      db.query("SELECT * from tasks where id=?;", [results.insertId], function(
        err,
        rows
      ) {
        res.send(rows[0]);
      });
    }
  );
});
// добавление новой колонки
router.put("/columns", jsonParser, (req, res) => {
  const { name } = req.body;
  // query
  db.query("insert into columns (name) values (?)", [name], (err, results) => {
    if (err) {
      res.send(err);
      return;
    }
    db.query("select * from columns where id = ?", [results.insertId], function(
      err,
      rows
    ) {
      res.send(rows[0]);
    });
  });
});

// patch редактирование заголовка колонки
router.patch("/columns", jsonParser, (req, res) => {
  const { id, name } = req.body;
  //query
  db.query(
    "update columns set name = ? where id = ?",
    [name, id],
    (err, results) => {
      if (err) {
        res.send(err);
        return;
      }
      db.query("select * from columns where id = ?", [id], function(err, rows) {
        if (err) {
          res.send(err);
          return;
        }
        res.send(rows[0]);
      });
    }
  );
});

//patch редактирование задачи в модалке
// принимать все поля
router.patch("/tasks", jsonParser, (req, res) => {
  const { id, title, description, column_id, user_id, priority_id } = req.body;
  // query
  db.query(
    "update tasks set title = ?, description = ?, column_id = ?, user_id = ?, priority_id = ?  where id = ?",
    [title, description, column_id, user_id, priority_id, id],
    (err, results) => {
      if (err) {
        res.send(err);
        return;
      }
      db.query("select * from tasks where id = ?", [id], (err, rows) => {
        if (err) {
          res.send(err);
          return;
        }
        res.send(rows[0]);
      });
    }
  );
});

// delete удаление колонки
// return success true
router.delete("/columns", jsonParser, (req, res) => {
  const { id } = req.body;
  //query
  db.query("delete from columns where id = ?", [id], (err, results) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ success: true, results: results });
  });
});

// delete удаление задачи
// return success true
router.delete("/tasks", jsonParser, (req, res) => {
  const { id } = req.body;
  // query
  db.query("delete from tasks where id = ?", [id], err => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ success: true });
  });
});

module.exports = router;
