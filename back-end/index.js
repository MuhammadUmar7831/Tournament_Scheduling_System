const express = require("express");
const cors = require('cors');
const connectToDatabase = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/schedules/get', require('./routes/get-routes'));
app.use('/schedules/post', require('./routes/post-routes'));
app.use('/schedules/round-robin', require('./routes/round-robin-routes'));

const port = 80;
app.listen(port, async () => {
    const databaseConnectRtn = await connectToDatabase(); //connecting to database

    if (databaseConnectRtn)
        console.log(`Example app listening on port ${port}`)
    else {
        process.exit(0)
    }
})