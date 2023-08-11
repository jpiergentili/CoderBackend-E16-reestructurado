export default class UserDTO {
    constructor(user) {
        this.id = user.id
        this.full_name = `${user.first_name} ${user.last_name}`
    }
}

/* TODO!!

FALTA IMPLEMENTAR!! */