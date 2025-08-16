const Joi = require('joi');

class ValidationService {
    // User validation schemas
    static userRegistration = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            'any.required': 'Password is required'
        }),
        firstName: Joi.string().min(2).max(50).required().messages({
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name cannot exceed 50 characters',
            'any.required': 'First name is required'
        }),
        lastName: Joi.string().min(2).max(50).required().messages({
            'string.min': 'Last name must be at least 2 characters long',
            'string.max': 'Last name cannot exceed 50 characters',
            'any.required': 'Last name is required'
        }),
        phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional().messages({
            'string.pattern.base': 'Please provide a valid phone number'
        })
    });

    static userLogin = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required'
        })
    });

    // Task validation schemas
    static taskCreation = Joi.object({
        title: Joi.string().min(3).max(200).required().messages({
            'string.min': 'Task title must be at least 3 characters long',
            'string.max': 'Task title cannot exceed 200 characters',
            'any.required': 'Task title is required'
        }),
        description: Joi.string().max(1000).optional().messages({
            'string.max': 'Task description cannot exceed 1000 characters'
        }),
        priority: Joi.string().valid('low', 'medium', 'high').default('medium').messages({
            'any.only': 'Priority must be low, medium, or high'
        }),
        dueDate: Joi.date().min('now').optional().messages({
            'date.min': 'Due date cannot be in the past'
        }),
        assignedTo: Joi.string().alphanum().optional(),
        projectId: Joi.string().alphanum().optional()
    });

    // Project validation schemas
    static projectCreation = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Project name must be at least 3 characters long',
            'string.max': 'Project name cannot exceed 100 characters',
            'any.required': 'Project name is required'
        }),
        description: Joi.string().max(500).optional().messages({
            'string.max': 'Project description cannot exceed 500 characters'
        }),
        startDate: Joi.date().min('now').optional().messages({
            'date.min': 'Start date cannot be in the past'
        }),
        endDate: Joi.date().min(Joi.ref('startDate')).optional().messages({
            'date.min': 'End date must be after start date'
        })
    });

    // Organization validation schemas
    static organizationCreation = Joi.object({
        name: Joi.string().min(2).max(100).required().messages({
            'string.min': 'Organization name must be at least 2 characters long',
            'string.max': 'Organization name cannot exceed 100 characters',
            'any.required': 'Organization name is required'
        }),
        description: Joi.string().max(500).optional().messages({
            'string.max': 'Organization description cannot exceed 500 characters'
        }),
        industry: Joi.string().max(50).optional().messages({
            'string.max': 'Industry cannot exceed 50 characters'
        })
    });

    /**
     * Validate data against a schema
     * @param {Object} data - Data to validate
     * @param {Joi.Schema} schema - Joi validation schema
     * @returns {Object} Validation result
     */
    static validate(data, schema) {
        const { error, value } = schema.validate(data, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            
            return {
                isValid: false,
                errors,
                value: null
            };
        }
        
        return {
            isValid: true,
            errors: [],
            value
        };
    }

    /**
     * Sanitize HTML content to prevent XSS
     * @param {string} content - Content to sanitize
     * @returns {string} Sanitized content
     */
    static sanitizeHtml(content) {
        if (typeof content !== 'string') return content;
        
        return content
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} Password strength result
     */
    static validatePasswordStrength(password) {
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(checks).filter(Boolean).length;
        let strength = 'weak';
        
        if (score >= 4) strength = 'strong';
        else if (score >= 3) strength = 'medium';

        return {
            isValid: score >= 3,
            strength,
            score,
            checks
        };
    }
}

module.exports = ValidationService;
