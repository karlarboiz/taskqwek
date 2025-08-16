const bcrypt = require('bcrypt');
const { UserGeneralInfo, LoginCredentials, UserAuthenticationInfo } = require('../models');

class AuthService {
    /**
     * Authenticate user with email and password
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Object} User data if authentication successful
     */
    async authenticateUser(email, password) {
        try {
            // Find user by email
            const user = await UserGeneralInfo.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            // Return user data (excluding password)
            const { password: _, ...userData } = user.toObject();
            return userData;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Object} Created user data
     */
    async registerUser(userData) {
        try {
            const { email, password, firstName, lastName, ...otherData } = userData;

            // Check if user already exists
            const existingUser = await UserGeneralInfo.findOne({ email });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create user
            const newUser = new UserGeneralInfo({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                ...otherData,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const savedUser = await newUser.save();
            const { password: _, ...userData } = savedUser.toObject();
            
            return userData;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user password
     * @param {string} userId - User ID
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {boolean} Success status
     */
    async updatePassword(userId, currentPassword, newPassword) {
        try {
            const user = await UserGeneralInfo.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify current password
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                throw new Error('Current password is incorrect');
            }

            // Hash new password
            const saltRounds = 12;
            const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update password
            user.password = hashedNewPassword;
            user.updatedAt = new Date();
            await user.save();

            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Reset user password (forgot password flow)
     * @param {string} email - User's email
     * @param {string} newPassword - New password
     * @returns {boolean} Success status
     */
    async resetPassword(email, newPassword) {
        try {
            const user = await UserGeneralInfo.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Hash new password
            const saltRounds = 12;
            const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update password
            user.password = hashedNewPassword;
            user.updatedAt = new Date();
            await user.save();

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
