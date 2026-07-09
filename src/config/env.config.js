const Joi = require("joi");

const validateEnv = Joi.object({
    PORT: Joi.number().min(1024).max(65535).default(5000),
    MONGODB_URL: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().min(10).required(),
    CLOUDINARY_CLOUD_NAME: Joi.string(),
    CLOUDINARY_API_KEY: Joi.string(),
    CLOUDINARY_API_SECRET: Joi.string(),
    NODE_ENV: Joi.string().valid("development", "test", "production").default("development")
});

const { error, value: envVars } = validateEnv.validate(process.env, {
    allowUnknown: true,
    abortEarly: false
});

if (error) {
    console.error(" ERROR: Environment Variable Validation Failed:");
    const missingVars = error.details.map((err) => err.message);
    console.error(missingVars);
    process.exit(1);
}


module.exports = envVars;