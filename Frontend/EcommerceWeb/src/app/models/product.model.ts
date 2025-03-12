export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    createAt?: string;  // Optional kyunki backend automatically set karega
    categoryId: number;
  }


  