import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Category } from '../interfaces/category.interface';

export const QueryAllCategory = () => {
  const getAllCategoryGql = gql`
    query getAllCategory {
      getAllCategory {
        id
        category
        subcategories {
          id
          subcategory
        }
      }
    }
  `;

  return useQuery<{ getAllCategory: Category[] }>(getAllCategoryGql, {
    fetchPolicy: 'network-only',
  });
};
