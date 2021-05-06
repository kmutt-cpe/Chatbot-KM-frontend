import { Subcategory } from './subcategory.interface';

export interface Category {
  id: string;
  category: string;
  subcategories?: Subcategory[] | undefined;
}
