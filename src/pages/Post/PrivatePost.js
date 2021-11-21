import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/post';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as favoriteActions } from 'store/sagas/app/favorites';
import { actions as likesActions } from 'store/sagas/app/likes';
import { actions as commentActions } from 'store/sagas/app/comments';
import { actions as deleteCommentActions } from 'store/sagas/app/comments/delete';
import Nav from 'components/Nav';

import moment from 'moment';
import { toast } from 'react-toastify';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import CommentModal from './CommentModal/CommentModal';
import StickyComp from './StickyComponent';

const { REACT_APP_WEB_API_IMG_URL } = process.env;

const PrivatePost = (props) => {
  const {
    match,
    fetchPost,
    post,
    setFavorite,
    user,
    isAuth,
    setModal,
    loading,
    likePost,
    unlikePost,
    showCommentModal,
    setShowCommentModal,
    submitComment,
    getComments,
    comments,
    comment,
    clearComments,
    selectComment,
    deleteComment,
    initialValues,
  } = props;

  useEffect(() => {
    const postId = match?.params?.postId;
    fetchPost(postId);
    return () => {
      setShowCommentModal(false);
      clearComments();
    };
  }, []);

  const handleFavorite = (postId) => {
    if (!isAuth) {
      setModal(true);
      toast.warning('Sign In to make it favorite.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setFavorite(postId);
    }
  };

  const handleLike = (postId, action) => {
    if (!isAuth) {
      setModal(true);
      toast.warning(`Sign In to ${action} the post.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (action === 'like') {
        likePost(postId);
      } else {
        unlikePost(postId);
      }
    }
  };

  const handleCommentIcon = (postId) => {
    getComments(postId);
    setShowCommentModal(true);
  };

  const submitCommentFn = ({ values, formActions }) => {
    if (!isAuth) {
      setModal(true);
      toast.warning('Sign In to write comment.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      submitComment({
        values,
        formActions,
        postId: match?.params?.postId,
        commentId: comment?._id,
      });
    }
  };

  return (
    <div className='singlePost'>
      <Nav />
      <div className='container'>
        <div className='singlePost__content'>
          <StickyComp
            post={post}
            user={user}
            handleLike={handleLike}
            handleCommentIcon={handleCommentIcon}
            handleFavorite={handleFavorite}
          />
          <div className='singlePost__right'>
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <>
                <div className='singlePost__right-title'>{post?.title}</div>
                <div className='singlePost__right-author-content'>
                  <div className='singlePost__right-author-info'>
                    {post?.creator?.imageUrl !== null ? (
                      <img
                        src={`${REACT_APP_WEB_API_IMG_URL}${post?.creator?.imageUrl}`}
                        alt=''
                        className='singlePost__right-author-img'
                      />
                    ) : (
                      <div className='singlePost__right-author-initials'>
                        {post?.creator?.name?.charAt(0)}
                      </div>
                    )}
                    <div className='singlePost__right-author-personal'>
                      <div className='singlePost__right-author-personal-name'>
                        {post?.creator?.name}
                      </div>
                      <div className='singlePost__right-created'>
                        {moment(post?.createdAt).format('MMM d')}
                      </div>
                    </div>
                  </div>
                  <div className='singlePost__right-like'>
                    {user?.favorites?.includes(post?._id) ? (
                      <FavFilled onClick={() => handleFavorite(post._id)} />
                    ) : (
                      <FavUnfilled onClick={() => handleFavorite(post._id)} />
                    )}
                  </div>
                </div>
                <div className='singlePost__right-content'>{post?.content}</div>
              </>
            )}
          </div>
        </div>
      </div>
      <CommentModal
        setModal={setShowCommentModal}
        showModal={showCommentModal}
        comments={comments}
        user={user}
        submitComment={submitCommentFn}
        isAuth={isAuth}
        deleteComment={deleteComment}
        postId={match.params.postId}
        selectComment={selectComment}
        selectedComment={comment}
        initialValues={initialValues}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.app.post.index.post,
  loading: state.app.post.index.loading,
  isAuth: state.app.auth.login.isAuth,
  user: state?.app?.me?.index?.user,
  comments: state?.app?.comments?.index?.comments,
  initialValues: state?.app?.comments?.index?.initialValues,
  comment: state?.app?.comments?.index?.comment,
  showCommentModal: state?.app?.comments?.index?.showModal,
});

const mapDispatchToProps = {
  fetchPost: postActions.fetchPost,
  setModal: loginActions.setModal,
  setFavorite: favoriteActions.setFavorite,
  likePost: likesActions.likePost,
  unlikePost: likesActions.unlikePost,
  setShowCommentModal: commentActions.showModal,
  submitComment: commentActions.comment,
  getComments: commentActions.getComments,
  clearComments: commentActions.clearComments,
  selectComment: commentActions.selectComment,
  deleteComment: deleteCommentActions.deleteComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivatePost));
