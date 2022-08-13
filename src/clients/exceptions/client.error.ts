export class ClientError extends Error {
    constructor(public status: number, message: string, public errors = []) {
        super(message)
    }

    static BadRequest(message: string, errors = []) {
        return new ClientError(400, message, errors)
    }

    static NotFound(message: string, errors = []) {
        return new ClientError(404, message, errors)
    }

    static NotAcceptable(message: string, errors = []) {
        return new ClientError(406, message, errors)
    }

}