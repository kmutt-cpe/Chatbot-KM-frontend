import { Category } from './category.interface';

export interface Subcategory {
  id: string;

  subcategory: string;

  category?: Category | undefined;
}
