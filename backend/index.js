const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getSchedules", async (req, res) => {
  res.status(200).send("Successfull");
});

app.use("/schedules/get", require("./routes/get-routes"));
app.use("/schedules/post", require("./routes/post-routes"));

app.use("/schedules/round-robin", require("./routes/round-robin-routes"));
app.use("/schedules/group-stage", require("./routes/group-stage-routes"));
app.use("/schedules/knock-out", require("./routes/knock-out-routes"));

const port = 80;
app.listen(port, async () => {
  const databaseConnectRtn = await connectToDatabase(); //connecting to database

  if (databaseConnectRtn) console.log(`Example app listening on port ${port}`);
  else {
    process.exit(0);
  }
});
