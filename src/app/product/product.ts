import { ProductCategory } from './product-category.enum';

export class Product {
  public category: string;
  constructor(
    public name: string,
    public description: string,
    public price: number,
    private categoryType: ProductCategory,
    public isAvailable: boolean) {
    this.category = ProductCategory[categoryType];
  }
}
