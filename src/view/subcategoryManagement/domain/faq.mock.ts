import { subcategories } from './subcategory.mock';
import { users } from './user.mock';

const subcategory = subcategories[0];
const user = users[0];

export const faqs = [
  {
    id: 'FAQ-0',
    question: 'question1',
    answer: 'answer1',
    subcategory: subcategory,
    category: subcategory.category,
    lastEditor: user,
    updatedDate: new Date('2021-05-03'),
  },
  {
    id: 'FAQ-1',
    question: 'question2',
    answer: 'answer2',
    subcategory: subcategory,
    category: subcategory.category,
    lastEditor: user,
    updatedDate: new Date('2021-05-02'),
  },
];
