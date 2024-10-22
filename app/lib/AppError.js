export class AppError extends Error {
    constructor(message, status, error) {
        super(message);
        this.simpleMessage = message;
        this.status = status;
        this.error = error;
        // Capture the stack trace for better debugging
        Error.captureStackTrace(this, this.constructor);
    }
}