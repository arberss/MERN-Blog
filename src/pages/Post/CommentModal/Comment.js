import React from 'react';

const { REACT_APP_WEB_API_IMG_URL } = process.env;

const Comment = (props) => {
  const { comment } = props;

  const nameInitials = comment?.user?.name?.split(' ');

  return (
    <div className='commentModal__comment'>
      <div className='commentModal__comment-header'>
        <div className='commentModal__comment-header-left'>
          {comment?.user?.imageUrl ? (
            <img
              src={`${REACT_APP_WEB_API_IMG_URL}${comment?.user?.imageUrl}`}
              alt=''
              className='commentModal__comment-header-img'
            />
          ) : (
            <div className='commentModal__noimg'>
              {nameInitials?.length < 2
                ? `${nameInitials?.[0]?.charAt(0)}`
                : `${nameInitials?.[0]?.charAt(0)} ${nameInitials?.[1]?.charAt(
                    0
                  )}`}
            </div>
          )}
          <div className='commentModal__comment-header-info'>
            <div className='commentModal__comment-header-name'>John Doe</div>
          </div>
        </div>
        <div className='commentModal__comment-header-left'>Edit</div>
      </div>
      <div className='commentModal__comment-content'>{comment?.text}</div>
    </div>
  );
};

export default Comment;
