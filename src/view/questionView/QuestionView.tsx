import React from 'react';
import { Typography, Grid, Link, Button } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal } from '../../component';
import { Color } from '../../assets/css';

interface QuestionViewProps {
  faq: {
    id: string;
    question: string;
    answer: string;
    subcategory: {
      id: string;
      subcategory: string;
    };
    category: { id: string; category: string };
    lastEditor: {
      id: string;
      name: string;
      username: string;
      role: string;
    };
    updatedDate: Date;
  };
}

const QuestionView: React.FC<QuestionViewProps> = (props: QuestionViewProps) => {
  const labelWidth = 5;
  const inputWidth = 7;

  const [deletePopup, setDeletePopup] = React.useState(false);

  const openDiscardModal = () => {
    setDeletePopup(true);
  };

  const closeDiscardModal = () => {
    setDeletePopup(false);
  };

  const onDiscard = () => {
    // todo: Implement discard create user
    setDeletePopup(false);
  };

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography color="secondary">
            <Link href="#" onClick={openDiscardModal}>
              back
            </Link>
          </Typography>
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
                {props.faq.question}
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
                {props.faq.category.category}
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
                {props.faq.subcategory.subcategory}
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
                {props.faq.lastEditor.name}
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
                {`${props.faq.updatedDate.getDate()}/${props.faq.updatedDate.getMonth()}/${props.faq.updatedDate.getFullYear()}`}
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
                }}
              >
                {props.faq.answer}
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
              <Button color="primary" variant="contained" type="submit" style={{ width: '100px' }}>
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={openDiscardModal} style={{ color: Color.red }}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={closeDiscardModal}
        onClose={closeDiscardModal}
        dialogTitle={'Delete user?'}
        dialogContent={`Are you sure you want to delete ${props.faq.question}?`}
        rejectText="Cancel"
        actionText="Delete"
        open={deletePopup}
      />
    </BasicLayout>
  );
};

export default QuestionView;
