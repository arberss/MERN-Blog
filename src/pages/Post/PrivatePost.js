import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/post';
import { actions as deletePostActions } from 'store/sagas/app/posts/delete';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as favoriteActions } from 'store/sagas/app/favorites';
import { actions as likesActions } from 'store/sagas/app/likes';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import { actions as commentActions } from 'store/sagas/app/comments';
import { actions as deleteCommentActions } from 'store/sagas/app/comments/delete';
import Nav from 'components/Nav';

import moment from 'moment';
import { toast } from 'react-toastify';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import CommentModal from './CommentModal/CommentModal';
import StickyComp from './StickyComponent';
import DropDownMenu from 'components/DropDownMenu';
import Loader from 'components/Loader';
import PostActions from 'components/PostActions';
import DialogComp from 'components/Dialog';

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
    deletePost,
    navigate,
    socket,
    commentLoading,
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleEdit = () => {
    navigate(`/posts/update/${post?._id}`);
  };

  const deleteFn = () => {
    setIsDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    deletePost({ id: post?._id, status: post?.postStatus });
    handleCloseDelete();
  };
  const handleCloseDelete = () => {
    setIsDialogOpen(false);
  };

  const lists = [
    {
      name: 'Delete',
      fn: () => deleteFn(),
    },
    {
      name: 'Edit',
      fn: () => handleEdit(),
    },
  ];

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

        const checkLike = post?.likes?.find((like) => like?.user === user?._id);
        if (!checkLike) {
          socket.emit('sendNotification', {
            socketId: socket.id,
            userId: user?._id,
            userName: user?.name,
            to: post?.creator?._id,
            post: { id: post?._id, postStatus: post?.postStatus },
          });
        }
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
              <Loader />
            ) : (
              <>
                <div className='singlePost__right-toptitle'>
                  <div className='singlePost__right-title'>{post?.title}</div>
                  {user?._id === post?.creator?._id && (
                    <DropDownMenu
                      lists={lists}
                      tooltip='Menu'
                      className='singlePost__right-postmenu'
                    />
                  )}
                </div>
                <div className='singlePost__right-author-content'>
                  <div className='singlePost__right-author-info'>
                    {post?.creator?.imageUrl !== null ? (
                      <img
                        src={post?.creator?.imageUrl}
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
                        {moment(post?.createdAt).format('MMM D')}
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
                <div className='singlePost__mobileActions'>
                  <PostActions
                    actions={{
                      handleLike,
                      handleCommentIcon,
                      handleFavorite,
                      post,
                      user,
                    }}
                    customClass='singlePost__mobileActions--actions'
                  />
                </div>
                <div className='singlePost__right-postImg'>
                  <img src={post?.imageUrl} alt='' />
                </div>
                <div
                  className='singlePost__right-content'
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></div>
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
        loading={commentLoading}
      />
      <DialogComp
        msg='Are you sure you want to delete this post?'
        isOpen={isDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
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
  commentLoading: state?.app?.comments?.index?.loading,
  socket: state?.app?.socket?.index?.socket,
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
  deletePost: deletePostActions.deletePost,
  navigate: navigateActions.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivatePost));
