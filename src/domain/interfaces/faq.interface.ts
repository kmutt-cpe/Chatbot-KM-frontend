import { Category } from './category.interface';
import { Subcategory } from './subcategory.interface';
import { User } from './user.interface';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  subcategory: Subcategory;
  category: Category;
  lastEditor: User;
  updatedDate: string;
}
