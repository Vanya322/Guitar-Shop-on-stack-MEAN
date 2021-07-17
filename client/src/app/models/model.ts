export interface Tovar {
  id: string,
  data: {
    Name: string,
    Category: string[],
    Price: number,
    Description: string,
    img: string
  }
}

export interface User {
  id: string,
  data: {
    Name: string,
    Surname: string,
    Adress: number,
    Phone: string,
  }
}