import React from 'react';
import { ReactComponent as FavFilled } from 'assets/img/favorite-filled.svg';
import { ReactComponent as FavUnfilled } from 'assets/img/favorite-unfilled.svg';
import { ReactComponent as LikeIcon } from 'assets/img/like.svg';
import { ReactComponent as LikedIcon } from 'assets/img/liked.svg';
import { ReactComponent as UnLikeIcon } from 'assets/img/unlike.svg';
import { ReactComponent as UnLikedIcon } from 'assets/img/unliked.svg';
import { ReactComponent as CommentIcon } from 'assets/img/comment.svg';

const PostActions = (props) => {
  const { actions, customClass = '' } = props;
  const { handleLike, handleCommentIcon, handleFavorite, post, user } = actions;

  return (
    <div className={`postActions__left-bottom ${customClass}`}>
      <div className='postActions__icon-body'>
        {post?.likes?.some((like) => like?.user === user?._id) ? (
          <LikedIcon
            className='postActions__icon'
            onClick={() => handleLike(post?._id, 'like')}
          />
        ) : (
          <LikeIcon
            className='postActions__icon'
            onClick={() => handleLike(post?._id, 'like')}
          />
        )}
        <span className='postActions__icon-info'>{post?.likes?.length}</span>
      </div>
      <div className='postActions__icon-body'>
        {post?.unlikes?.some((like) => like?.user === user?._id) ? (
          <UnLikedIcon
            className='postActions__icon'
            onClick={() => handleLike(post?._id, 'unlike')}
          />
        ) : (
          <UnLikeIcon
            className='postActions__icon'
            onClick={() => handleLike(post?._id, 'unlike')}
          />
        )}
        <span className='postActions__icon-info'>{post?.unlikes?.length}</span>
      </div>
      <div className='postActions__icon-body'>
        <CommentIcon
          className='postActions__icon postActions__icon--comment'
          onClick={() => handleCommentIcon(post?._id)}
        />
        <span className='postActions__icon-info'>{post?.comments}</span>
      </div>
      {user?.favorites?.includes(post?._id) ? (
        <div className='postActions__icon-body'>
          <FavFilled
            className='postActions__icon'
            onClick={() => handleFavorite(post._id)}
          />
        </div>
      ) : (
        <div className='postActions__icon-body'>
          <FavUnfilled
            className='postActions__icon'
            onClick={() => handleFavorite(post._id)}
          />
        </div>
      )}
    </div>
  );
};

export default PostActions;
