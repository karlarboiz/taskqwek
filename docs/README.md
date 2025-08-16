# TaskQwek - Task Management Application

## 📋 Overview

TaskQwek is a lightweight task management tool built with Node.js, Express.js, and MongoDB/MySQL. The application provides comprehensive project and task management capabilities with user authentication and organization management.

## 🏗️ Project Structure

```
taskqwek/
├── config/                 # Configuration files
│   ├── database.js        # Database connection management
│   ├── environment.js     # Environment configuration
│   └── webpack.prod.js    # Production webpack config
├── src/                   # Source code
│   ├── services/          # Business logic services
│   │   └── authService.js # Authentication service
│   ├── utils/             # Utility functions
│   │   ├── logger.js      # Logging utility
│   │   └── validation.js  # Input validation
│   └── models/            # Model definitions
│       └── index.js       # Model exports
├── controllers/           # Request handlers
├── routes/               # API route definitions
├── middlewares/          # Express middlewares
├── model/                # MongoDB models (Mongoose)
├── views/                # EJS templates
├── public/               # Static assets
├── scss/                 # SCSS source files
├── scripts/              # Build and deployment scripts
├── tests/                # Test files
├── docs/                 # Documentation
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB
- MySQL
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskqwek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_PASSWORD=your_mongodb_password
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=taskqwek_db
   DB_HOST=localhost
   SESSION_SECRET=your_session_secret
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - Ensure MySQL is running and create the database:
     ```sql
     CREATE DATABASE IF NOT EXISTS taskqwek_db;
     ```

5. **Start the application**
   ```bash
   # Development mode
   npm start
   
   # Production mode
   npm run start:prod
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Manual Docker Build
```bash
docker build -t taskqwek:latest .
docker run -d -p 5000:5000 --env-file .env taskqwek:latest
```

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /logout` - User logout

### Task Management

- `GET /task` - List tasks
- `POST /task` - Create task
- `PUT /task/:id` - Update task
- `DELETE /task/:id` - Delete task

### Project Management

- `GET /project` - List projects
- `POST /project` - Create project
- `PUT /project/:id` - Update project
- `DELETE /project/:id` - Delete project

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_PASSWORD` | MongoDB password | Required |
| `DB_USER` | MySQL username | Required |
| `DB_PASSWORD` | MySQL password | Required |
| `DB_NAME` | MySQL database name | `taskqwek_db` |
| `SESSION_SECRET` | Session encryption key | Required |

### Database Configuration

The application supports both MongoDB and MySQL:

- **MongoDB**: Used for user sessions and some data models
- **MySQL**: Used for relational data and complex queries

## 🏗️ Architecture

### MVC Pattern
- **Models**: Data structure and database interactions
- **Views**: EJS templates for rendering HTML
- **Controllers**: Request handling and business logic

### Service Layer
Business logic is separated into service classes for better maintainability and testability.

### Middleware Stack
- Session management
- CSRF protection
- Authentication checks
- Request logging

## 📦 Build Process

### Development
```bash
npm run webpack:watch    # Watch for JS changes
npm run compile:sass:watch # Watch for SCSS changes
```

### Production
```bash
npm run webpack:build    # Build optimized JS bundle
npm run compile:sass     # Compile SCSS to CSS
```

## 🔒 Security Features

- CSRF protection
- Session management
- Password hashing with bcrypt
- Input validation and sanitization
- Secure cookie settings

## 📊 Monitoring

### Health Checks
- `/health` endpoint for Docker health checks
- Database connection monitoring
- Application uptime tracking

### Logging
Structured logging with different levels (error, warn, info, debug)

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure secure session secrets
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure database connection pooling
- [ ] Set up backup strategies

### Scaling Considerations
- Database connection pooling
- Session store optimization
- Static asset caching
- Load balancing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.
