const environment = require('./config/environment');
const databaseManager = require('./config/database');
const logger = require('./src/utils/logger');

const express = require('express'); 
const path = require('path');
const app = express();
const session = require("express-session");
const MongoStore = require('connect-mongo');
const csrf = require('@dr.pogodin/csurf');
const cookieProtection = csrf({cookie:true});
const addCsrfToken = require('./middlewares/csrf-token');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const { checkActiveUser } = require('./middlewares/checkActiveUsers');

// Health check endpoint for Docker
app.get('/health', (req, res) => {
    const dbHealth = databaseManager.getHealthStatus();
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealth
    });
});

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

// Session configuration with environment variables
app.use(session({
    secret: environment.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: environment.MONGODB_URI,
        ttl: environment.SESSION_TTL,
        autoRemove: 'native',
        dbName: 'taskqwek',
        collectionName: 'sessions'
    }),
    cookie:{
        maxAge: 24 * 60 * 60 * 1000,
        secure: environment.SESSION_COOKIE_SECURE,
        httpOnly: environment.SESSION_COOKIE_HTTPONLY,
        sameSite: environment.SESSION_COOKIE_SAMESITE
    }
}));

app.use(flash());
app.use(cookieParser());
app.use(cookieProtection);

// Request logging middleware
app.use((req, res, next) => {
    logger.request(req);
    next();
});

app.use((req,res,next)=>{
    const user = req.session?.user;
    const isAuthenticated = req.session?.isAuthenticated;
    if(!isAuthenticated || !user) {
        return next();
    }
    const isAdmin = user?.isAdmin;   
    res.locals.isAuthenticated = isAuthenticated;
    res.locals.isAdmin = isAdmin; 
    next();
})

app.use(addCsrfToken);

// Route definitions
const commonRoutes = require('./routes/common-routes');
const loginRoutes = require('./routes/login-routes');
const signupRoutes = require('./routes/signup-routes');
const memberRoutes = require('./routes/member-routes');
const orgRoutes = require("./routes/org-routes");
const dashboardRoutes = require("./routes/dashboard-routes");
const taskRoutes = require('./routes/task-routes');
const projectRoutes = require("./routes/project-routes");
const profileRoutes = require("./routes/profile-routes");
const reminderRoutes = require("./routes/reminder-routes")
const notifRoutes = require("./routes/notification-routes");
const inviteRoutes = require("./routes/invite-routes");
const Messages = require('./common/Messages');

app.use(commonRoutes);
app.use(loginRoutes);
app.use(signupRoutes);
app.use("/member",memberRoutes);
app.use("/org",checkActiveUser,orgRoutes);
app.use("/dashboard",checkActiveUser,dashboardRoutes);
app.use("/task",checkActiveUser,taskRoutes);
app.use("/project",projectRoutes);
app.use("/profile",checkActiveUser,profileRoutes);
app.use("/reminder",checkActiveUser,reminderRoutes);
app.use("/notification",checkActiveUser,notifRoutes);
app.use("/invite",checkActiveUser,inviteRoutes);

// Error handling middleware
app.use((error,req,res,next)=>{
    logger.error('404 Error', error);
    console.log(error)
    res.status(404).render('404',{
        message:Messages.SERVER_ERROR
    });
});

app.use((error,req,res,next)=>{
    logger.error('500 Error', error);
    res.status(500).render('500');
})

// Database initialization and server startup
async function startServer() {
    try {
        // Initialize database connections
        await databaseManager.initialize();
     
        // Start the server
        const server = app.listen(environment.PORT, () => {
            logger.info(`🚀 TaskQwek server started successfully!`);
            logger.info(`📍 Server running at http://${environment.HOST}:${environment.PORT}`);
            logger.info(`🌍 Environment: ${environment.NODE_ENV}`);
            logger.info(`📊 Health check available at /health`);
        });

        // Graceful shutdown
        process.on('SIGTERM', async () => {
            logger.info('SIGTERM received, shutting down gracefully...');
            await databaseManager.disconnect();
            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', async () => {
            logger.info('SIGINT received, shutting down gracefully...');
            await databaseManager.disconnect();
            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        logger.error('Failed to start server', error);
        app.use((error,req,res,next)=>{
            logger.error('500 Error', error);
            res.status(500).render('500');
        })
        process.exit(1);
    }
}

// Start the application
startServer();

