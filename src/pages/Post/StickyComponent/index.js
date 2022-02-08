import React from 'react';
import Sticky from 'react-sticky-el';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import { ReactComponent as LikeIcon } from 'assets/img/like.svg';
import { ReactComponent as LikedIcon } from 'assets/img/liked.svg';
import { ReactComponent as UnLikeIcon } from 'assets/img/unlike.svg';
import { ReactComponent as UnLikedIcon } from 'assets/img/unliked.svg';
import { ReactComponent as CommentIcon } from 'assets/img/comment.svg';

const StickyComp = (props) => {
  const { handleLike, handleCommentIcon, handleFavorite, post, user } = props;

  return (
    <div className='singlePost__left'>
      <Sticky
        boundaryElement='.block'
        topOffset={40}
        stickyClassName={'recommandedTopics__sticky'}
      >
        <div className='singlePost__left-content'>
          <div className='singlePost__left-user'>{post?.creator?.name}</div>
          <div className='singlePost__left-post'>{post?.title}</div>
          <div className='singlePost__left-line'></div>
          <div className='singlePost__left-bottom'>
            <div className='singlePost__icon-body'>
              {post?.likes?.some((like) => like?.user === user?._id) ? (
                <LikedIcon
                  className='singlePost__icon'
                  onClick={() => handleLike(post?._id, 'like')}
                />
              ) : (
                <LikeIcon
                  className='singlePost__icon'
                  onClick={() => handleLike(post?._id, 'like')}
                />
              )}
              <span className='singlePost__icon-info'>
                {post?.likes?.length}
              </span>
            </div>
            <div className='singlePost__icon-body'>
              {post?.unlikes?.some((like) => like?.user === user?._id) ? (
                <UnLikedIcon
                  className='singlePost__icon'
                  onClick={() => handleLike(post?._id, 'unlike')}
                />
              ) : (
                <UnLikeIcon
                  className='singlePost__icon'
                  onClick={() => handleLike(post?._id, 'unlike')}
                />
              )}
              <span className='singlePost__icon-info'>
                {post?.unlikes?.length}
              </span>
            </div>
            <div className='singlePost__icon-body'>
              <CommentIcon
                className='singlePost__icon singlePost__icon--comment'
                onClick={() => handleCommentIcon(post?._id)}
              />
              <span className='singlePost__icon-info'>{post?.comments}</span>
            </div>
            {user?.favorites?.includes(post?._id) ? (
              <div className='singlePost__icon-body'>
                <FavFilled
                  className='singlePost__icon'
                  onClick={() => handleFavorite(post._id)}
                />
              </div>
            ) : (
              <div className='singlePost__icon-body'>
                <FavUnfilled
                  className='singlePost__icon'
                  onClick={() => handleFavorite(post._id)}
                />
              </div>
            )}
          </div>
        </div>
      </Sticky>
    </div>
  );
};

export default StickyComp;
