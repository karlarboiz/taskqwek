require('dotenv').config();

const environment = {
    // Server Configuration
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT) || 5000,
    HOST: process.env.HOST || 'localhost',
    
    // MongoDB Configuration
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI || `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/taskqwek?retryWrites=true&w=majority`,
    
    // MySQL Configuration
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT) || 3306,
    
    // Session Configuration
    SESSION_SECRET: process.env.SESSION_SECRET || 'guessyoudidnotseethatcoming',
    SESSION_TTL: parseInt(process.env.SESSION_TTL) || 7 * 24 * 60 * 60 * 1000, // 7 days
    
    // Security Configuration
    CSRF_COOKIE_SECURE: process.env.NODE_ENV === 'production',
    SESSION_COOKIE_SECURE: process.env.NODE_ENV === 'production',
    SESSION_COOKIE_HTTPONLY: true,
    SESSION_COOKIE_SAMESITE: 'lax',
    
    // Build Configuration
    WEBPACK_MODE: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    
    // Logging Configuration
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    
    // Feature Flags
    ENABLE_WEBSOCKETS: process.env.ENABLE_WEBSOCKETS === 'true',
    ENABLE_EMAIL: process.env.ENABLE_EMAIL === 'true',
    ENABLE_PDF_GENERATION: process.env.ENABLE_PDF_GENERATION === 'true'
};

// Validation
const requiredEnvVars = ['MONGODB_PASSWORD', 'DB_USER', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !environment[varName]);

if (missingVars.length > 0) {
    console.warn(`⚠️  Missing required environment variables: ${missingVars.join(', ')}`);
    if (environment.NODE_ENV === 'production') {
        console.error('❌ Cannot start in production mode with missing environment variables');
        process.exit(1);
    }
}

// Helper functions
environment.isDevelopment = () => environment.NODE_ENV === 'development';
environment.isProduction = () => environment.NODE_ENV === 'production';
environment.isTest = () => environment.NODE_ENV === 'test';

module.exports = environment;
