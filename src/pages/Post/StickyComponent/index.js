import React from 'react';
import Sticky from 'react-sticky-el';
import PostActions from 'components/PostActions';

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
          <PostActions
            actions={{
              handleLike,
              handleCommentIcon,
              handleFavorite,
              post,
              user,
            }}
          />
        </div>
      </Sticky>
    </div>
  );
};

export default StickyComp;
