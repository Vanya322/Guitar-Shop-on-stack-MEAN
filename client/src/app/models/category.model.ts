export class Category {
    constructor(
        public id: string,
        public name: string,
    ) {}

    static toModel(dto: CategoryDto): Category {
        return new Category(
            dto._id,
            dto.name,
        )
    }
}

export class CategoryDto {
    constructor(
        public _id: string,
        public name: string,
    ) {}

    static toModel(dto: Category): CategoryDto {
        return new CategoryDto(
            dto.id,
            dto.name,
        )
    }
}