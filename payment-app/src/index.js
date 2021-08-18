const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/payment", (req, res) => {
  console.log(req.body);
  var status_string = ["confirmed", "declined"];
  var status = status_string[Math.floor(Math.random() * status_string.length)];

  res.send({ status: status });
});

let server = app.listen(5000, function () {
  let port = server.address().port;
  console.log("App Server running at - http://localhost:%s", port);
});
