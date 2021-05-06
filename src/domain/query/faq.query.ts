import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Subcategory } from '../interfaces/subcategory.interface';
import { Category } from '../interfaces/category.interface';
import { FAQ } from '../interfaces/faq.interface';

export const QueryFAQByCategoryId = (id: string) => {
  const getFAQByCategoryIdGql = gql`
    query getFAQByCategoryId($id: ID!) {
      getFAQByCategoryId(id: $id) {
        id
        question
        answer
        updatedDate
        category {
          id
          category
        }
        subcategory {
          id
          subcategory
        }
        lastEditor {
          id
          username
          name
          role
        }
      }
      getCategoryById(id: $id) {
        id
        category
      }
    }
  `;

  return useQuery<{ getFAQByCategoryId: FAQ[]; getCategoryById: Category }>(getFAQByCategoryIdGql, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
};
