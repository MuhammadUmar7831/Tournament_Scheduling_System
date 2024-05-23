const mongoose = require('mongoose');
require('dotenv').config();

// my atlas uri
// const uri = 'mongodb://127.0.0.1:27017/tournaments'
const uri = process.env.uri

var rtn = false;
// establsihing connection with inotebook atlas mongodb
const connectToDatabase = async () => {
    await mongoose.connect(uri)
        .then(() => {console.log('connetction to databse successfull......');rtn = true})
        .catch((error) => console.log("failed to connect to database :(")); // potential hit on internet connection loss
    return rtn;
}

module.exports = connectToDatabase;