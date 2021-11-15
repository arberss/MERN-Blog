import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/post';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as favoriteActions } from 'store/sagas/app/favorites';
import { actions as likesActions } from 'store/sagas/app/likes';
import Nav from '../../components/Nav';
import Sticky from 'react-sticky-el';
import moment from 'moment';
import { toast } from 'react-toastify';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import { ReactComponent as LikeIcon } from 'assets/img/like.svg';
import { ReactComponent as LikedIcon } from 'assets/img/liked.svg';
import { ReactComponent as UnLikeIcon } from 'assets/img/unlike.svg';
import { ReactComponent as UnLikedIcon } from 'assets/img/unliked.svg';
import { ReactComponent as CommentIcon } from 'assets/img/comment.svg';

const { REACT_APP_WEB_API_IMG_URL } = process.env;

const PublicPost = (props) => {
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
  } = props;

  useEffect(() => {
    const postId = match?.params?.postId;
    fetchPost(postId);
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

  return (
    <div className='singlePost'>
      <Nav />
      <div className='container'>
        <div className='singlePost__content'>
          <div className='singlePost__left'>
            <Sticky
              boundaryElement='.block'
              topOffset={40}
              stickyClassName={'recommandedTopics__sticky'}
            >
              <div className='singlePost__left-content'>
                <div className='singlePost__left-user'>
                  {post?.creator?.name}
                </div>
                <div className='singlePost__left-post'>{post?.title}</div>
                <div className='singlePost__left-line'></div>
                <div className='singlePost__left-bottom'>
                  <div className='singlePost__icon-body'>
                    {post?.likes?.some(
                      (like) => like?.user === post?.creator?._id
                    ) ? (
                      <LikedIcon
                        className='singlePost__icon'
                        onClick={() => likePost(post?._id)}
                      />
                    ) : (
                      <LikeIcon
                        className='singlePost__icon'
                        onClick={() => likePost(post?._id)}
                      />
                    )}
                    <span className='singlePost__icon-info'>
                      {post?.likes?.length}
                    </span>
                  </div>
                  <div className='singlePost__icon-body'>
                    {post?.unlikes?.some(
                      (like) => like?.user === post?.creator?._id
                    ) ? (
                      <UnLikedIcon
                        className='singlePost__icon'
                        onClick={() => unlikePost(post?._id)}
                      />
                    ) : (
                      <UnLikeIcon
                        className='singlePost__icon'
                        onClick={() => unlikePost(post?._id)}
                      />
                    )}
                    <span className='singlePost__icon-info'>
                      {post?.unlikes?.length}
                    </span>
                  </div>
                  <div className='singlePost__icon-body'>
                    <CommentIcon className='singlePost__icon singlePost__icon--comment' />
                    <span className='singlePost__icon-info'>
                      {post?.comments?.length}
                    </span>
                  </div>
                  {user?.favorites?.includes(post?._id) ? (
                    <FavFilled
                      className='singlePost__icon'
                      onClick={() => handleFavorite(post._id)}
                    />
                  ) : (
                    <FavUnfilled
                      className='singlePost__icon'
                      onClick={() => handleFavorite(post._id)}
                    />
                  )}
                </div>
              </div>
            </Sticky>
          </div>
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
                      <FavFilled
                        className='singlePost__icon'
                        onClick={() => handleFavorite(post._id)}
                      />
                    ) : (
                      <FavUnfilled
                        className='singlePost__icon'
                        onClick={() => handleFavorite(post._id)}
                      />
                    )}
                  </div>
                </div>
                <div className='singlePost__right-content'>{post?.content}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.app.post.index.post,
  loading: state.app.post.index.loading,
  isAuth: state.app.auth.login.isAuth,
  user: state?.app?.me?.index?.user,
});

const mapDispatchToProps = {
  fetchPost: postActions.fetchPost,
  setModal: loginActions.setModal,
  setFavorite: favoriteActions.setFavorite,
  likePost: likesActions.likePost,
  unlikePost: likesActions.unlikePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PublicPost));
