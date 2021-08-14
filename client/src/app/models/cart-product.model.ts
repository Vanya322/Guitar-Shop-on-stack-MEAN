import { Category } from "./category.model";

export class CartProduct {
    constructor(
        public id: string,
        public name: string,
        public categoryList: Category[],
        public price: number,
        public description: string,
        public image: string,
        public count: number,
        public countInCart: number,
    ) {}

    static toModel(dto: CartProductDto): CartProduct {
        return new CartProduct(
            dto._id,
            dto.name,
            dto.categoryList,
            dto.price,
            dto.description,
            dto.image,
            dto.count,
            dto.countInCart,
        )
    }
}

export class CartProductDto {
    constructor(
        public _id: string,
        public name: string,
        public categoryList: Category[],
        public price: number,
        public description: string,
        public image: string,
        public count: number,
        public countInCart: number,
    ) {}

    static toModel(dto: CartProduct): CartProductDto {
        return new CartProductDto(
            dto.id,
            dto.name,
            dto.categoryList,
            dto.price,
            dto.description,
            dto.image,
            dto.count,
            dto.countInCart,
        )
    }
}