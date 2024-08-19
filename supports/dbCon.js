const mongoose = require('mongoose');
async function dbCon(){
    const dbName = 'communication_app';
    mongoose.connect(`mongodb://localhost/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((data) =>
     console.log('Connected to MongoDB',data))
    .catch(err =>
       console.error('Error connecting to MongoDB:', err));
    return mongoose.connection;
}
module.exports.dbCon = dbCon;