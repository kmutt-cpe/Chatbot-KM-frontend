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

export const QueryFAQById = (id: string) => {
  const getFAQByIdGql = gql`
    query getFAQById($id: ID!) {
      getFAQById(id: $id) {
        id
        question
        answer
        lastEditor {
          id
          username
          name
          role
        }
        subcategory {
          id
          subcategory
        }
        category {
          id
          category
        }
        updatedDate
      }

      getAllSubcategory {
        id
        subcategory
        category {
          category
          id
        }
      }

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

  return useQuery<{
    getFAQById: FAQ;
    getAllSubcategory: Subcategory[];
    getAllCategory: Category[];
  }>(getFAQByIdGql, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
};
