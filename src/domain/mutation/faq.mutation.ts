import { gql, useMutation } from '@apollo/client';
import { FAQ } from '../interfaces/faq.interface';

export const MutateCreateFAQ = () => {
  const createFAQGql = gql`
    mutation createFAQ($faq: CreateFAQDto!) {
      createFAQ(faq: $faq) {
        id
        question
        answer
        subcategory {
          id
          subcategory
        }
        category {
          id
          category
        }
        lastEditor {
          id
          username
          name
          role
        }
        updatedDate
      }
    }
  `;

  return useMutation<{ createFAQ: FAQ }>(createFAQGql);
};

export const MutateUpdateFAQ = () => {
  const updateFAQGql = gql`
    mutation updateFAQ($faq: UpdateFAQDto!) {
      updateFAQ(faq: $faq) {
        id
        question
        answer
        subcategory {
          id
          subcategory
        }
        category {
          id
          category
        }
        lastEditor {
          id
          username
          name
          role
        }
        updatedDate
      }
    }
  `;

  return useMutation<{ createFAQ: FAQ }>(updateFAQGql);
};

export const MutateDeleteFAQ = () => {
  const deleteFAQGql = gql`
    mutation deleteFAQById($id: ID!) {
      deleteFAQ(id: $id) {
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
    }
  `;

  return useMutation<{ deleteFAQ: FAQ }>(deleteFAQGql);
};
