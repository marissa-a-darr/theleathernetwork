const { connect, connection} = require ('mongose');
const connectionString = 
process.env.MONGOD_URI || '';
connect (connectionString, { 
  userNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports= connection;
