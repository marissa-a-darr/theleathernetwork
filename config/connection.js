const { connect, connection } = require("mongoose");
const connectionString =
  process.env.MONGOD_URI || "mongodb://localhost:27017/leathernetwork";
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
