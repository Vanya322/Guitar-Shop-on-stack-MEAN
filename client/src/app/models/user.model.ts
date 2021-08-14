export class User {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public address: string,
        public type: string,
    ) {}

    static toModel(dto: UserDto): User {
        return new User(
            dto._id,
            dto.name,
            dto.surname,
            dto.address,
            dto.type,
        )
    }
}


export class UserDto {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public address: string,
        public type: string,
    ) {}

    static toModel(dto: User): UserDto {
        return new UserDto(
            dto.id,
            dto.name,
            dto.surname,
            dto.address,
            dto.type,
        )
    }
}