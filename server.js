require("dotenv").config();
const envVars = require("./src/config/env.config.js");
const app = require("./src/app.js");
const connectDB = require("./src/database/connectDB.js");

const PORT = envVars.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is connected on http://localhost:${PORT}`);
});
