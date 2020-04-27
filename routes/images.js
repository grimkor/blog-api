const fs = require("fs");

module.exports = function (app) {
  app.get("/image/:id", (req, res) => {
    fs.readFile(`posts/images/${req.params.id}`, (err, data) => {
      if (err) {
        res.status(400).send();
        return;
      }
      res.send(data);
    });
  });
};
