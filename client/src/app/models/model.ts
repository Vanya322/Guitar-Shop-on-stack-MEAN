export interface Product {
  id: string,
  name: string,
  categoryList: Category[],
  price: number,
  description: string,
  image: string,
  count: number,
}

export interface User {
  id: string,
  name: string,
  surname: string,
  address: string,
  type: string,
}

export interface Category {
  id: string,
  name: string,
}
