const environment = require('../../config/environment');

class Logger {
    constructor() {
        this.logLevel = environment.LOG_LEVEL || 'info';
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }

    _shouldLog(level) {
        return this.levels[level] <= this.levels[this.logLevel];
    }

    _formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        
        if (data) {
            return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
        }
        
        return `${prefix} ${message}`;
    }

    error(message, error = null) {
        if (this._shouldLog('error')) {
            if (error) {
                console.error(this._formatMessage('error', message, {
                    message: error.message,
                    stack: error.stack,
                    name: error.name
                }));
            } else {
                console.error(this._formatMessage('error', message));
            }
        }
    }

    warn(message, data = null) {
        if (this._shouldLog('warn')) {
            console.warn(this._formatMessage('warn', message, data));
        }
    }

    info(message, data = null) {
        if (this._shouldLog('info')) {
            console.info(this._formatMessage('info', message, data));
        }
    }

    debug(message, data = null) {
        if (this._shouldLog('debug')) {
            console.log(this._formatMessage('debug', message, data));
        }
    }

    // Special methods for different contexts
    request(req, message = 'HTTP Request') {
        this.info(message, {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    }

    database(operation, details = null) {
        this.info(`Database ${operation}`, details);
    } 

    performance(operation, duration) {
        this.info(`Performance: ${operation}`, { duration: `${duration}ms` });
    }
}

module.exports = new Logger();
