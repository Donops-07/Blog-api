const mongoose = require("mongoose");
const envVars = require("../config/env.config.js");

const connectDB = async () => {
    try {
        await mongoose.connect(envVars.MONGODB_URL);
        console.log("MongoDB connected Succesfully")

    } catch (error) {
        console.error("Database error detected", error);
        process.exit(1);
    };
};

module.exports = connectDB;