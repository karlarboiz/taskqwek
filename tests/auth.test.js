const { expect } = require('chai');
const ValidationService = require('../src/utils/validation');

describe('Authentication Validation', () => {
    describe('User Registration', () => {
        it('should validate correct user registration data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'ValidPass123',
                firstName: 'John',
                lastName: 'Doe'
            };

            const result = ValidationService.validate(validData, ValidationService.userRegistration);
            
            expect(result.isValid).to.be.true;
            expect(result.errors).to.have.length(0);
            expect(result.value).to.deep.equal(validData);
        });

        it('should reject invalid email format', () => {
            const invalidData = {
                email: 'invalid-email',
                password: 'ValidPass123',
                firstName: 'John',
                lastName: 'Doe'
            };

            const result = ValidationService.validate(invalidData, ValidationService.userRegistration);
            
            expect(result.isValid).to.be.false;
            expect(result.errors).to.have.length(1);
            expect(result.errors[0].field).to.equal('email');
        });

        it('should reject weak password', () => {
            const invalidData = {
                email: 'test@example.com',
                password: 'weak',
                firstName: 'John',
                lastName: 'Doe'
            };

            const result = ValidationService.validate(invalidData, ValidationService.userRegistration);
            
            expect(result.isValid).to.be.false;
            expect(result.errors).to.have.length(1);
            expect(result.errors[0].field).to.equal('password');
        });
    });

    describe('User Login', () => {
        it('should validate correct login data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'password123'
            };

            const result = ValidationService.validate(validData, ValidationService.userLogin);
            
            expect(result.isValid).to.be.true;
            expect(result.errors).to.have.length(0);
        });

        it('should reject missing email', () => {
            const invalidData = {
                password: 'password123'
            };

            const result = ValidationService.validate(invalidData, ValidationService.userLogin);
            
            expect(result.isValid).to.be.false;
            expect(result.errors).to.have.length(1);
            expect(result.errors[0].field).to.equal('email');
        });
    });
});

describe('Password Strength Validation', () => {
    it('should identify strong password', () => {
        const result = ValidationService.validatePasswordStrength('StrongPass123!');
        
        expect(result.isValid).to.be.true;
        expect(result.strength).to.equal('strong');
        expect(result.score).to.be.greaterThan(3);
    });

    it('should identify weak password', () => {
        const result = ValidationService.validatePasswordStrength('weak');
        
        expect(result.isValid).to.be.false;
        expect(result.strength).to.equal('weak');
        expect(result.score).to.be.lessThan(3);
    });
});
