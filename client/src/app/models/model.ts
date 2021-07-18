export interface Tovar {
  id: string,
  name: string,
  category: Category[],
  price: number,
  description: string,
  img: string,
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
