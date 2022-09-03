import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as myPostActions } from 'store/sagas/app/posts/myPosts';
import { actions as deletePost } from 'store/sagas/app/posts/delete';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import PostComp from 'components/Post';
import DialogComp from 'components/Dialog';

const MyPosts = (props) => {
  const { fetchMyPosts, posts, navigate, deletePost, loading } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    id: null,
    status: null,
  });

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const editFn = (e, id) => {
    e.stopPropagation();

    navigate(`/posts/update/${id}`);
  };

  const deleteFn = (e, id, status) => {
    e.stopPropagation();
    setIsDialogOpen(true);
    setDeleteInfo({ id, status });
  };

  const handleConfirmDelete = () => {
    deletePost({ id: deleteInfo.id, status: deleteInfo.status });
    handleCloseDelete();
  };
  const handleCloseDelete = () => {
    setIsDialogOpen(false);
    setDeleteInfo({ id: null, status: null });
  };

  return (
    <>
      <PostComp
        data={posts}
        title='My Posts'
        withActions
        editFn={editFn}
        deleteFn={deleteFn}
        loading={loading}
      />
      <DialogComp
        msg='Are you sure you want to delete this post?'
        isOpen={isDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state?.app?.posts?.myPosts.posts,
  loading: state?.app?.posts?.myPosts.loading,
});
const mapDispatchToProps = {
  fetchMyPosts: myPostActions.fetchMyPosts,
  deletePost: deletePost.deletePost,
  navigate: navigateActions.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPosts));
