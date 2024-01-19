const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const challengeRouter = require("./src/routes/challenge");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/challenges", challengeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
