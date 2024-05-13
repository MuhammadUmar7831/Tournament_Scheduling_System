const mongoose = require('mongoose');

// my atlas uri
const uri = 'mongodb://127.0.0.1:27017/tournaments'

var rtn = false;
// establsihing connection with inotebook atlas mongodb
const connectToDatabase = async () => {
    await mongoose.connect(uri)
        .then(() => {console.log('connetction to databse successfull......');rtn = true})
        .catch(() => console.log("failed to connect to database :(")); // potential hit on internet connection loss
    return rtn;
}

module.exports = connectToDatabase;