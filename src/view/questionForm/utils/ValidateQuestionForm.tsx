import { QuestionType, ErrorQuestionType } from './QuestionType';
import { FormikConfig } from 'formik';

export const ValidateQuestionForm: FormikConfig<QuestionType>['validate'] = (values) => {
  const errors: ErrorQuestionType = {};
  if (!values.question) errors.question = 'Required';
  if (!values.categoryId) errors.categoryId = 'Required';
  if (!values.subcategoryId || values.subcategoryId === '') errors.subcategoryId = 'Required';
  if (!values.answer) errors.answer = 'Required';

  return errors;
};
