import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as myPostActions } from 'store/sagas/app/posts/myPosts';
import { actions as deletePost } from 'store/sagas/app/posts/delete';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import PostComp from 'components/Post';
import Loader from 'components/Loader';

const MyPosts = (props) => {
  const { fetchMyPosts, posts, navigate, deletePost, loading } = props;

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const editFn = (id) => {
    navigate(`/posts/update/${id}`);
  };

  const deleteFn = (id, status) => {
    deletePost({ id, status });
  };

  return (
    <PostComp
      data={posts}
      title='My Posts'
      withActions
      editFn={editFn}
      deleteFn={deleteFn}
      loading={loading}
    />
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
