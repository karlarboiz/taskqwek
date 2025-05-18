require('dotenv').config();
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
const {initializeConnection} = require('./data/database');
const flash = require("connect-flash");
const port = 5000;
const mysqlDb = require("./data/database1");
const mysql = require('mysql2/promise');
const sequelize = require("./data/database1");
const { checkActiveUser } = require('./middlewares/checkActiveUsers');
// const WebSocketServer = require('websocket').server;
// const WebSocketClient = require('websocket').client;
// const WebSocketFrame  = require('websocket').frame;
// const WebSocketRouter = require('websocket').router;
// const W3CWebSocket = require('websocket').w3cwebsocket;



app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: 'guessyoudidnotseethatcoming',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/taskqwek?retryWrites=true&w=majority`,
        ttl: 7 * 24 * 60 * 60 * 1000,
        autoRemove: 'native',
        dbName: 'taskqwek',
        collectionName: 'sessions'
    }),
    cookie:{
        maxAge: 24 * 60 *60 *1000,
        sameSite:'lax'
    }
}))
app.use(flash());
app.use(cookieParser());
app.use(cookieProtection);

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
const commonRoutes = require('./routes/common-routes');
const loginRoutes = require('./routes/login-routes');
const signupRoutes = require('./routes/signup-routes');
const memberRoutes = require('./routes/member-routes');
// const leaderRoutes = require("./routes/leader-routes");
const orgRoutes = require("./routes/org-routes");
const dashboardRoutes = require("./routes/dashboard-routes");
const taskRoutes = require('./routes/task-routes');
const projectRoutes = require("./routes/project-routes");
const profileRoutes = require("./routes/profile-routes");
const reminderRoutes = require("./routes/reminder-routes")
const notifRoutes = require("./routes/notification-routes");
const inviteRoutes = require("./routes/invite-routes");


app.use(commonRoutes);
app.use(loginRoutes);
app.use(signupRoutes);
app.use("/member",memberRoutes);
app.use("/org",checkActiveUser,orgRoutes);
app.use("/dashboard",checkActiveUser,dashboardRoutes);
app.use("/task",checkActiveUser,taskRoutes);
app.use("/project",checkActiveUser,projectRoutes);
app.use("/profile",checkActiveUser,profileRoutes);
app.use("/reminder",checkActiveUser,reminderRoutes);
app.use("/notification",checkActiveUser,notifRoutes);
app.use("/invite",checkActiveUser,inviteRoutes);
app.use((error,req,res,next)=>{
  
    res.status(404).render('404');
});

app.use((error,req,res,next)=>{
    res.status(500).render('500');
})

//


mysql.createConnection({
    user     : process.env.USER,
    password : process.env.PASSWORD
}).then((connection) => {
    connection.query('CREATE DATABASE IF NOT EXISTS taskqwek_db;').then(() => {
        // Safe to use sequelize now
    })
})


initializeConnection();


(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      // This will create the table if it doesn't exist (DOESN'T DROP)
      await sequelize.sync();
  
      // Optional: force table recreation every time
      // await sequelize.sync({ force: true });
  
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.listen(process.env.PORT || port,async()=>{
    await mysqlDb.authenticate();
    
    console.log(`The backend system for TaskQwek is now running at localhost:${process.env.PORT || port}`);
})

