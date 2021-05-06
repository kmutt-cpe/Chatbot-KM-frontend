import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Subcategory } from '../interfaces/subcategory.interface';
import { Category } from '../interfaces/category.interface';

export const GetSubcategoryByCategoryId = (id: string) => {
  const getSubcategoryByCategoryIdGql = gql`
    query getSubcategoryByCategoryId($id: ID!) {
      getSubcategoryByCategoryId(id: $id) {
        id
        subcategory
      }
      getCategoryById(id: $id) {
        id
        category
      }
    }
  `;

  return useQuery<{ getSubcategoryByCategoryId: Subcategory[]; getCategoryById: Category }>(
    getSubcategoryByCategoryIdGql,
    {
      variables: { id },
      fetchPolicy: 'network-only',
    }
  );
};

export const QueryAllSubcategory = () => {
  const getAllSubcategoryGql = gql`
    query getAllSubcategory {
      getAllSubcategory {
        id
        subcategory
        category {
          id
          category
        }
      }
    }
  `;
  return useQuery<{ getAllSubcategory: Subcategory[] }>(getAllSubcategoryGql, {
    fetchPolicy: 'network-only',
  });
};
