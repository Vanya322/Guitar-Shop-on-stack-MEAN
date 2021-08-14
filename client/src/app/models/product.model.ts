import { Category } from "./category.model";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public categoryList: Category[],
        public price: number,
        public description: string,
        public image: string,
        public count: number,
    ) {}

    static toModel(dto: ProductDto): Product {
        return new Product(
            dto._id,
            dto.name,
            dto.categoryList,
            dto.price,
            dto.description,
            dto.image,
            dto.count,
        )
    }
}

export class ProductDto {
    constructor(
        public _id: string,
        public name: string,
        public categoryList: Category[],
        public price: number,
        public description: string,
        public image: string,
        public count: number,
    ) {}

    static toModel(dto: Product): ProductDto {
        return new ProductDto(
            dto.id,
            dto.name,
            dto.categoryList,
            dto.price,
            dto.description,
            dto.image,
            dto.count,
        )
    }
}