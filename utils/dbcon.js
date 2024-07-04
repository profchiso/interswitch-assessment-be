const mongoose = require("mongoose");

exports.connectToDb = async () => {
  try {
    if (process.env.CURRENT_ENV === "Test") {
      await mongoose.connect(process.env.DB_URL_TEST, {});
    }
    if (process.env.CURRENT_ENV === "Dev") {
      await mongoose.connect(process.env.DB_URL, {});
    }

    console.log("DB connection successful");
  } catch (err) {
    console.log(err);
    process.exit(1); // kill the process if db connection is not successful
  }
};
