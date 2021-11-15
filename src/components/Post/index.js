import React from 'react';
import moment from 'moment';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { actions as loginActions } from 'store/sagas/app/auth/login';
import { actions as favoriteActions } from 'store/sagas/app/favorites';
import { actions as navigationActions } from 'store/sagas/app/navigation';

const PostComp = (props) => {
  const {
    navigate,
    data,
    isAuth,
    setModal,
    title = 'Posts',
    newClass,
    setFavorite,
    user,
  } = props;

  const { REACT_APP_WEB_API_IMG_URL } = process.env;

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

  const handleNavigation = (postStatus, postId) => {
    navigate(`/post/${postStatus}/${postId}`);
  };

  return (
    <div className={`postComp ${newClass ? newClass : ''}`}>
      <div className='postComp__title'>{title}</div>
      <div className='postComp__content'>
        {data?.map((post) => {
          return (
            <div className='postComp__post' key={post._id}>
              <div className='postComp__post-left'>
                <div
                  className='postComp__post-navigate'
                  onClick={() => handleNavigation(post?.postStatus, post?._id)}
                >
                  <div className='postComp__post-user'>
                    {post?.creator.name}
                  </div>
                  <div className='postComp__post-title'>{post.title}</div>
                  <div className='postComp__post-content'>{post.content}</div>
                </div>
                <div className='postComp__post-bottom'>
                  <div className='postComp__post-date'>
                    {moment(post.createdAt).format('MMM d')}
                  </div>
                  {user?.favorites?.includes(post?._id) ? (
                    <FavFilled
                      className='postComp__post-favorite'
                      onClick={() => handleFavorite(post._id)}
                    />
                  ) : (
                    <FavUnfilled
                      className='postComp__post-favorite'
                      onClick={() => handleFavorite(post._id)}
                    />
                  )}
                </div>
              </div>
              <div className='postComp__post-right'>
                {post.imageUrl && (
                  <img
                    src={`${REACT_APP_WEB_API_IMG_URL}${post.imageUrl}`}
                    className='postComp__post-right-img'
                    alt=''
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.app.auth.login.isAuth,
  user: state?.app?.me?.index?.user,
});

const mapDispatchToProps = {
  setModal: loginActions.setModal,
  setFavorite: favoriteActions.setFavorite,
  navigate: navigationActions.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostComp));
