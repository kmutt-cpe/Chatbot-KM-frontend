import { gql, useMutation } from '@apollo/client';
import { Category } from '../interfaces/category.interface';

export const MutateCreateCategory = () => {
  const createCategoryGql = gql`
    mutation createCategory($category: CreateCategoryDto!) {
      createCategory(category: $category) {
        id
        category
      }
    }
  `;

  return useMutation<{ createCategory: Category }>(createCategoryGql);
};

export const MutateUpdateCategory = () => {
  const updateCategoryGql = gql`
    mutation updateCategory($category: UpdateCategoryDto!) {
      updateCategory(category: $category) {
        id
        category
      }
    }
  `;

  return useMutation<{ createCategory: Category }>(updateCategoryGql);
};

export const MutateDeleteCategory = () => {
  const deleteCategoryGql = gql`
    mutation deleteCategory($id: ID!) {
      deleteCategory(id: $id) {
        id
        category
      }
    }
  `;

  return useMutation<{ deleteCategory: Category }>(deleteCategoryGql);
};
