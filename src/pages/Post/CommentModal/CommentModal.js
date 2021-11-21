import React from 'react';
import Button from 'components/button';
import Comment from './Comment';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  comment: yup.string().strict().label('Comment').required(),
});

const { REACT_APP_WEB_API_IMG_URL } = process.env;

const CommentModal = (props) => {
  const {
    setModal,
    showModal,
    comments,
    user,
    submitComment,
    isAuth,
    deleteComment,
    postId,
    selectComment,
    initialValues,
  } = props;

  const nameInitials = user?.name?.split(' ');

  const handleCancel = (resetForm) => {
    resetForm();
    selectComment({});
  };

  const handleClose = (resetForm) => {
    setModal(false);
    resetForm();
    selectComment({});
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values, actions) =>
        submitComment({ values, formActions: actions })
      }
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm,
      }) => (
        <>
          <div
            className={`commentBackdrop ${
              showModal ? 'commentBackdrop--active' : ''
            }`}
            onClick={() => handleClose(resetForm)}
          ></div>
          <div className={`commentModal ${showModal ? 'active' : ''}`}>
            <div className='commentModal__header'>
              <div className='commentModal__header-title'>{`Comments (${comments?.length})`}</div>
              <div
                className='commentModal__header-close'
                onClick={() => handleClose(resetForm)}
              >
                X
              </div>
            </div>
            <div className='commentModal__box'>
              {user?._id && (
                <div className='commentModal__box-me'>
                  {user?.imageUrl ? (
                    <img
                      src={`${REACT_APP_WEB_API_IMG_URL}${user?.imageUrl}`}
                      alt=''
                      className='commentModal__box-me-img'
                    />
                  ) : (
                    <div className='commentModal__noimg'>
                      {nameInitials?.length < 2
                        ? `${nameInitials?.[0]?.charAt(0)}`
                        : `${nameInitials?.[0]?.charAt(
                            0
                          )} ${nameInitials?.[1]?.charAt(0)}`}
                    </div>
                  )}
                  <div className='commentModal__box-me-name'>{user?.name}</div>
                </div>
              )}
              <form className='commentModal__box-form' onSubmit={handleSubmit}>
                <textarea
                  className='commentModal__box-area'
                  rows={5}
                  cols={5}
                  name='comment'
                  placeholder='What are your thoughts?'
                  value={values.comment}
                  onChange={handleChange}
                />
                {errors && touched && (
                  <span className='errorClass'>{errors.comment}</span>
                )}
                <div className='commentModal__box-buttons'>
                  <Button
                    title='Cancel'
                    type='text'
                    newClass='commentModal__box-button commentModal__box-button--cancel'
                    onClick={() => handleCancel(resetForm)}
                  />
                  <Button
                    title='Submit'
                    type='submit'
                    newClass={`commentModal__box-button ${
                      !isAuth ? 'commentModal__box-button--disabled' : ''
                    }`}
                    disabled={isAuth ? false : true}
                  />
                </div>
              </form>
            </div>
            <div className='commentModal__line'></div>
            {comments?.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment?._id}
                  user={user}
                  deleteComment={deleteComment}
                  postId={postId}
                  selectComment={selectComment}
                />
              );
            })}
          </div>
        </>
      )}
    </Formik>
  );
};

export default CommentModal;
