var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.json({status: "API executada com sucesso!"});
});

app.listen(3000, function() {
  console.log("A API está rodando na porta 3000...");
});
module.exports = app;