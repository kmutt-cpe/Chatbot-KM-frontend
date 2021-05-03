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
} from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal, BackButton } from '../../component';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { QuestionType } from './utils/QuestionType';
import { ValidateQuestionForm } from './utils/ValidateQuestionForm';
import { categories } from './domain/category.mock';
import { subcategories } from './domain/subcategory.mock';
import { useHistory, useParams } from 'react-router-dom';
import { faqs } from './domain/faq.mock';

const EditQuestion: React.FC = () => {
  const labelWidth = 3;
  const inputWidth = 9;

  const history = useHistory();
  const { faqId } = useParams<{ faqId: string }>();

  // todo: Implement get faq from backend-api instead
  const faq = faqs.find((faq) => faq.id === faqId);
  if (!faq) history.push('/question-management');

  const [discardDisplay, setDiscardDisplay] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(faq?.category.id);

  const [, setSubcategoryId] = React.useState(faq?.subcategory.id);

  const onDiscard = () => {
    setDiscardDisplay(false);
    history.goBack();
  };

  const formikUser = useFormik<QuestionType>({
    initialValues: {
      // todo: Remove empty string
      question: faq?.question || '',
      answer: faq?.answer || '',
      subcategoryId: faq?.subcategory.id || '',
      categoryId: faq?.category.id || '',
    },
    validate: ValidateQuestionForm,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      history.goBack();
    },
  });

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography color="secondary">
            <BackButton onClick={() => setDiscardDisplay(true)} />
          </Typography>
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            EDIT QUESTION
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
                      .filter((subcategory) => subcategory.category.id === categoryId)
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
                  SAVE
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
    </BasicLayout>
  );
};

export default EditQuestion;
