import { gql, useMutation } from '@apollo/client';
import { Subcategory } from '../interfaces/subcategory.interface';

export const MutateCreateSubcategory = () => {
  const createSubcategoryGql = gql`
    mutation createSubcategory($subcategory: CreateSubcategoryDto!) {
      createSubcategory(subcategory: $subcategory) {
        id
        subcategory
        category {
          id
          category
        }
      }
    }
  `;

  return useMutation<{ createSubcategory: Subcategory }>(createSubcategoryGql);
};

export const MutateUpdateSubcategory = () => {
  const updateSubcategoryGql = gql`
    mutation updateSubcategory($subcategory: UpdateSubcategoryDto!) {
      updateSubcategory(subcategory: $subcategory) {
        id
        subcategory
      }
    }
  `;

  return useMutation<{ createSubcategory: Subcategory }>(updateSubcategoryGql);
};

export const MutateDeleteSubcategory = () => {
  const deleteSubcategoryGql = gql`
    mutation deleteSubcategory($id: ID!) {
      deleteSubcategory(id: $id) {
        id
        subcategory
      }
    }
  `;

  return useMutation<{ deleteSubcategory: Subcategory }>(deleteSubcategoryGql);
};
