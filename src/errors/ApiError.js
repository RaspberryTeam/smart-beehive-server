class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};

class ValidationError extends ApiError {
    constructor(message) {
        super(message, 400);
    };
};

class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    };
};

class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    };
};

class CreationError extends ApiError {
    constructor(message) {
        super(message, 409);
    };
};

module.exports = {
    ApiError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    CreationError
};
