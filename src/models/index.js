// MongoDB Models (Mongoose)
const UserGeneralInfo = require('../../model/UserGeneralInfo');
const LoginCredentials = require('../../model/LoginCredentials');
const UserAuthenticationInfo = require('../../model/UserAuthenticationInfo');
const Org = require('../../model/Org');
const Project = require('../../model/Project');
const Task = require('../../model/Task');
const TaskEvaluation = require('../../model/TaskEvaluation');
const MembershipSetup = require('../../model/MembershipSetup');
const Notification = require('../../model/Notification');
const ProductivityLevel = require('../../model/ProductivityLevel');
const History = require('../../model/History');

// MySQL Models (Sequelize) - Add these when you have Sequelize models
// const User = require('./sequelize/User');
// const Organization = require('./sequelize/Organization');

module.exports = {
    // MongoDB Models
    UserGeneralInfo,
    LoginCredentials,
    UserAuthenticationInfo,
    Org,
    Project,
    Task,
    TaskEvaluation,
    MembershipSetup,
    Notification,
    ProductivityLevel,
    History,
    
    // MySQL Models (uncomment when ready)
    // User,
    // Organization,
};
