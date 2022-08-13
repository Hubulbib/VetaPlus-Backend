export class VisitError extends Error {
    constructor(public status: number, message: string, public errors = []) {
        super(message)
    }

    static BadRequest(message: string, errors = []) {
        return new VisitError(400, message, errors)
    }

    static NotFound(message: string, errors = []) {
        return new VisitError(404, message, errors)
    }


}