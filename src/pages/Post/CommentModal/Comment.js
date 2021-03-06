import DropDownMenu from 'components/DropDownMenu';
import React from 'react';

const Comment = (props) => {
  const { comment, user, deleteComment, postId, selectComment } = props;

  const lists = [
    {
      name: 'Delete',
      fn: () => deleteComment({ postId, commentId: comment?._id }),
    },
    {
      name: 'Edit',
      fn: () => selectComment(comment),
    },
  ];

  const nameInitials = comment?.user?.name?.split(' ');

  return (
    <div className='commentModal__comment'>
      <div className='commentModal__comment-header'>
        <div className='commentModal__comment-header-left'>
          {comment?.user?.imageUrl ? (
            <img
              src={comment?.user?.imageUrl}
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
            <div className='commentModal__comment-header-name'>
              {comment?.user?.name}
            </div>
          </div>
        </div>
        {comment?.edited && (
          <div className='commentModal__comment-edited'>(edited)</div>
        )}
        <div className='commentModal__comment-header-left'>
          {user?._id === comment?.user?._id && (
            <DropDownMenu lists={lists} tooltip='Menu' />
          )}
        </div>
      </div>
      <div className='commentModal__comment-content'>{comment?.text}</div>
    </div>
  );
};

export default Comment;
