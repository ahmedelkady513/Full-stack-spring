import { Product } from "./product";

export interface GetResponseProducts {
    _embedded: {
        products: Product[];
      },
      page: {
        number: number,
        size: number;
        totalElements: number,
      }
}
