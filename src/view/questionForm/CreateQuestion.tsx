import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal, BackButton, ErrorModal } from '../../component';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { QuestionType } from './utils/QuestionType';
import { ValidateQuestionForm } from './utils/ValidateQuestionForm';
import { Redirect, useHistory } from 'react-router-dom';
import { MutateCreateFAQ } from '../../domain/mutation/faq.mutation';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../lib/redux/reducers';
import { Category } from '../../domain/interfaces/category.interface';
import { QueryAllSubcategory } from '../../domain/query/subcategory.query';

const CreateQuestion: React.FC = () => {
  const history = useHistory();
  const labelWidth = 3;
  const inputWidth = 9;

  const [discardDisplay, setDiscardDisplay] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState('');
  const [, setSubcategoryId] = React.useState('');
  const [errorModal, setErrorModal] = React.useState(false);

  const [createFAQ, { error }] = MutateCreateFAQ();
  const { loading, error: queryError, data } = QueryAllSubcategory();
  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const userId = authData ? authData.id : '';

  const onDiscard = () => {
    setDiscardDisplay(false);
    history.push('/question-management');
  };

  const formikUser = useFormik<QuestionType>({
    initialValues: {
      question: '',
      answer: '',
      subcategoryId: '',
      categoryId: '',
    },
    validate: ValidateQuestionForm,
    onSubmit: (values) => {
      createFAQ({
        variables: {
          faq: {
            question: values.question,
            answer: values.answer,
            subcategoryId: values.subcategoryId,
            lastEditorId: userId,
          },
        },
      })
        .then(() => {
          history.push(`/question-list/${categoryId}`);
        })
        .catch(() => {
          setErrorModal(true);
        });
    },
  });

  if (!authData) return <Redirect to="/logout" />;
  if (loading) return <CircularProgress />;
  if (queryError || !data) return null;

  const subcategories = data.getAllSubcategory;

  if (subcategories.length == 0) {
    alert('Create category or subcategory first');
    return <Redirect to="category-management" />;
  }

  const categories: Category[] = [];
  for (const subcategory of subcategories) {
    if (subcategory.category && !categories.includes(subcategory.category))
      categories.push(subcategory.category);
  }

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton onClick={() => setDiscardDisplay(true)} />
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            CREATE QUESTION
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: Color.secondary,
            marginBottom: '20px',
          }}
        />
        <form onSubmit={formikUser.handleSubmit}>
          <Grid item container direction="column" spacing={3}>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  คำถาม
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="question"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formikUser.handleChange}
                  value={formikUser.values.question}
                  error={formikUser.errors.question ? true : false}
                  helperText={formikUser.errors.question || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  หมวดหมู่
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <FormControl style={{ minWidth: '200px' }}>
                  <InputLabel id="label">Select category</InputLabel>
                  <Select
                    labelId="label"
                    id="select-category"
                    value={formikUser.values.categoryId}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                      const categoryId = event.target.value as string;
                      formikUser.setFieldValue('categoryId', categoryId);
                      formikUser.setFieldValue('subcategoryId', '');
                      setCategoryId(categoryId);
                    }}
                    error={formikUser.errors.categoryId ? true : false}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  หมวดหมู่ย่อย
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <FormControl style={{ minWidth: '200px' }}>
                  <InputLabel id="label">Select subcategory</InputLabel>
                  <Select
                    labelId="label"
                    id="select-subcategory"
                    disabled={categoryId === '' ? true : false}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                      const subcategoryId = event.target.value as string;
                      formikUser.setFieldValue('subcategoryId', subcategoryId);
                      setSubcategoryId(subcategoryId);
                    }}
                    value={formikUser.values.subcategoryId}
                    error={formikUser.errors.subcategoryId ? true : false}
                  >
                    {subcategories
                      .filter(
                        (subcategory) =>
                          subcategory.category && subcategory.category?.id === categoryId
                      )
                      .map((subcategory) => (
                        <MenuItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.subcategory}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    height: '100%',
                  }}
                >
                  คำตอบ
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  multiline
                  rows={6}
                  id="answer"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formikUser.handleChange}
                  value={formikUser.values.answer}
                  error={formikUser.errors.answer ? true : false}
                  helperText={formikUser.errors.answer || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={2} justify="flex-end">
              <Grid item>
                <Button color="primary" onClick={() => setDiscardDisplay(true)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={() => setDiscardDisplay(false)}
        onClose={() => setDiscardDisplay(false)}
        dialogTitle={'Discard changes?'}
        dialogContent={'Are you sure you want to discard?'}
        rejectText="Cancel"
        actionText="Discard"
        open={discardDisplay}
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </BasicLayout>
  );
};

export default CreateQuestion;
