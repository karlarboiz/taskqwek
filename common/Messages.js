class Messages {
    static PROJECT_CREATION_SUCCESS = "Project is successfully created!";
    static FAILED = "An unexpected error occurred. Please try again later.";
    static SUCCESS = "Your operation was successful! ";
    
    static INVALID_INPUT = "The input provided is invalid. Please check and try again.";
    static LOGOUT = "You have been successfully logged out.";
    
    static getMessage(type) {
        return this[type] || "Message not found.";
    }
}

module.exports = Messages
