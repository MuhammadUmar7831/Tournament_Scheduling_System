const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("Successfull");
});

app.get('/getSchedules', async (req, res) => {
    try {
        // finds the user with the id passed as token in request header decrypted in fetchUser
        const schedules = await Schedule.find({});

        // Check if there are schedules
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ message: 'No schedules found.' });
        }

        // Send the schedules as a response
        res.status(200).json(schedules);
    } catch (error) {
        res.status(200).json({'message':'Internal server error', error});
    }
})

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
