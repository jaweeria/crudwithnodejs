const express = require("express"); // fixed the typo
const app = express();

app.use(express.json()); // also fixed here

app.get("/", (req, res) => {
  res.send("Hello from Node.js server");
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
