const moongose = require("mongoose");
require("dotenv").config({ path: ".env.development.local" });

const conectarDB = async () => {
  try {
    await moongose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
