const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

class DatabaseManager {
    constructor() {
        this.mongoConnection = null;
        this.mysqlConnection = null;
        this.isConnected = false;
    }

    // MongoDB Connection
    async connectMongoDB() {
        try {
            const mongoUrl = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/taskqwek?retryWrites=true&w=majority`;
            
            this.mongoConnection = await mongoose.connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            this.mongoConnection.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                this.isConnected = false;
            });

            this.mongoConnection.connection.once('open', () => {
                console.log('✅ MongoDB connected successfully!');
                this.isConnected = true;
            });

            this.mongoConnection.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                this.isConnected = false;
            });

            return this.mongoConnection;
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    // MySQL Connection
    async connectMySQL() {
        try {
            this.mysqlConnection = new Sequelize(
                process.env.DB_NAME || 'taskqwek_db',
                process.env.DB_USER || process.env.USER,
                process.env.DB_PASSWORD || process.env.PASSWORD,
                {
                    host: process.env.DB_HOST || process.env.HOST || 'localhost',
                    dialect: 'mysql',
                    port: process.env.DB_PORT || 3306,
                    logging: process.env.NODE_ENV === 'development' ? console.log : false,
                    pool: {
                        max: 10,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    retry: {
                        max: 3,
                        timeout: 10000
                    }
                }
            );

            // Test the connection
            await this.mysqlConnection.authenticate();
            console.log('✅ MySQL connected successfully!');

            // Sync models (create tables if they don't exist)
            await this.mysqlConnection.sync({ alter: true });
            console.log('✅ MySQL models synchronized!');

            return this.mysqlConnection;
        } catch (error) {
            console.error('Failed to connect to MySQL:', error);
            throw error;
        }
    }

    // Initialize all database connections
    async initialize() {
        try {
            console.log('🚀 Initializing database connections...');
            
            // Connect to both databases
            await Promise.all([
                this.connectMongoDB(),
                this.connectMySQL()
            ]);

            console.log('✅ All database connections established!');
            return true;
        } catch (error) {
            console.error('❌ Database initialization failed:', error);
            throw error;
        }
    }

    // Graceful shutdown
    async disconnect() {
        try {
            if (this.mongoConnection) {
                await this.mongoConnection.connection.close();
                console.log('MongoDB connection closed');
            }
            
            if (this.mysqlConnection) {
                await this.mysqlConnection.close();
                console.log('MySQL connection closed');
            }
            
            this.isConnected = false;
            console.log('✅ All database connections closed');
        } catch (error) {
            console.error('Error during database disconnection:', error);
        }
    }

    // Health check
    getHealthStatus() {
        return {
            mongo: this.mongoConnection?.connection?.readyState === 1,
            mysql: this.mysqlConnection?.authenticate ? true : false,
            overall: this.isConnected
        };
    }
}

// Create singleton instance
const databaseManager = new DatabaseManager();

module.exports = databaseManager;
