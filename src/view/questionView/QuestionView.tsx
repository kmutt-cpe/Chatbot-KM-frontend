import React from 'react';
import { Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import {
  StaffNavbar,
  BasicLayout,
  ConfirmModal,
  BackButton,
  ErrorModal,
  AlertModal,
} from '../../component';
import { Color } from '../../assets/css';
import { useHistory, useParams } from 'react-router-dom';
import { QueryFAQById } from '../../domain/query/faq.query';
import { MutateDeleteFAQ } from '../../domain/mutation/faq.mutation';
import { ModeratorAccess } from '../../common/role';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../lib/redux/reducers';

const QuestionView: React.FC = () => {
  const labelWidth = 3;
  const inputWidth = 9;
  const [errorModal, setErrorModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);

  const history = useHistory();
  const { faqId } = useParams<{ faqId: string }>();

  const { data, loading, error: faqError } = QueryFAQById(faqId);
  const [deletePopup, setDeletePopup] = React.useState(false);
  const [deleteFAQ, { error }] = MutateDeleteFAQ();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

  const onDelete = () => {
    deleteFAQ({
      variables: {
        id: faqId,
      },
    })
      .then(() => {
        setDeletePopup(false);
        window.location.reload();
      })
      .catch(() => {
        setErrorModal(true);
      });
    history.goBack();
  };

  if (loading) return <CircularProgress />;
  if (error || !data || !data.getFAQById) return null;

  const faq = data.getFAQById;
  const updatedDate = new Date(faq.updatedDate);

  if (faqError) return null;

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton path={`/question-list/${faq?.category.id}`} />
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            QUESTION
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: Color.secondary,
            marginBottom: '40px',
          }}
        />
        <Grid item container direction="column" spacing={3}>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                คำถาม
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {faq?.question}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                หมวดหมู่
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {faq?.category.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                หมวดหมู่ย่อย
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {faq?.subcategory.subcategory}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                ผู้เขียนล่าสุด
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {faq?.lastEditor.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                วันที่แก้ไขล่าสุด
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {`${updatedDate.getDate()}/${updatedDate.getMonth()}/${updatedDate.getFullYear()}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                คำตอบ
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                  whiteSpace: 'pre-line',
                }}
              >
                {faq.answer}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ marginTop: '20px' }}
          >
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ width: '100px' }}
                onClick={() => {
                  for (const userRole of ModeratorAccess)
                    if (role === userRole) {
                      history.push(`/edit-question/${faqId}`);
                    }
                  setAlertModal(true);
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  for (const userRole of ModeratorAccess)
                    if (role === userRole) {
                      setDeletePopup(true);
                    }
                  setAlertModal(true);
                }}
                style={{ color: Color.red }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        onAction={onDelete}
        onReject={() => setDeletePopup(false)}
        onClose={() => setDeletePopup(false)}
        dialogTitle={'Delete user?'}
        dialogContent={`Are you sure you want to delete ${faq?.question}?`}
        rejectText="Cancel"
        actionText="Delete"
        open={deletePopup}
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
      <AlertModal
        open={alertModal}
        handleClose={() => {
          setAlertModal(false);
        }}
        alertTitle="Unauthorized"
        alertMessage="You don't have access to this"
      />
    </BasicLayout>
  );
};

export default QuestionView;
