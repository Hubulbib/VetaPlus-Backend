export class UserDto {
    username: string
    id: string

    constructor(model) {
        this.username = model.username
        this.id = model._id
    }
}