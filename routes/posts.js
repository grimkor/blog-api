const fs = require("fs");
const matter = require("gray-matter");
const readingTime = require("reading-time");
const _ = require("lodash");

const getExcerpt = (file) => {
  return (file.excerpt = file.content
    .replace("\n", " ")
    .split(/#(.+)/)[0] // remove anything before the first "#"
    .split(" ")
    .slice(0, 25)
    .join(" "));
};

module.exports = function (app) {
  app.get("/posts", (req, res) => {
    fs.readdir("posts/published", (err, files) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }

      const filesMetadata = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
          const data = matter(
            fs.readFileSync(`posts/published/${file}`, "utf8"),
            {
              excerpt: getExcerpt,
            }
          );
          return {
            ...data,
            data: {
              ...data.data,
              readingTime: Math.ceil(readingTime(data.content).minutes),
              filename: file.split('.')[0]
            },
            content: "",
          };
        })
        .sort((a, b) =>
          b.data.date > a.data.date ? 1 : b.data.date > a.data.date ? -1 : 0
        );

      res.send(filesMetadata);
    });
  });

  app.get("/post/:id", (req, res) => {
    fs.readdir("posts/published", (err, files) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
      const match = files.find((file) => !file.indexOf(req.params.id));
      if (match) {
        fs.readFile(`posts/published/${match}`, "utf8", (err1, data) => {
          if (!err) {
            res.send(data);
          }
        });
      } else {
        res.status(404).send("no matches found");
      }
    });
  });
};
