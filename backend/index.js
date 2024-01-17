const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const challengesRouter = require("./src/routes/challenge");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/challenges", challengesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
