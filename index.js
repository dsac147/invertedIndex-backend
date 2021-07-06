const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var exec = require("child_process").exec,
    child;

const PORT = process.env.PORT || 8080;  
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let reply = 'none';

app.post("/api", (req, res) => {
  const searchQuery = req.body.post;
    
  child = exec(
    `java InvertedIndex ${searchQuery}`,
    function (error, stdout, stderr) {
      console.log(stdout);
      reply = stdout;
      if (error !== null) {
        console.log("exec error: " + error);
      }
      res.send(reply);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
