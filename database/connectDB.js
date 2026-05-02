const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected Succesfully")

    } catch (error) {
        console.error("Database error detected", error);
        process.exit(1);
    };
};

module.exports = connectDB;