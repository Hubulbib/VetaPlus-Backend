export class UserError extends Error {
    constructor(public status: number, message: string, public errors = []) {
        super(message)
    }

    static BadRequest(message: string, errors = []) {
        return new UserError(400, message, errors)
    }

    static NotFound(message: string, errors = []) {
        return new UserError(404, message, errors)
    }

}