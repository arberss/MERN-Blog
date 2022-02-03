import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as navigation } from 'store/sagas/app/navigation';
import { actions as publicPostsActions } from 'store/sagas/app/posts/public';
import Nav from 'components/Nav';
import Header from './Header';
import PostComp from 'components/Post';

const LandingPage = (props) => {
  const {
    navigate,
    fetchPublicPosts,
    publicPosts,
    editPage,
    page,
    size,
    totalSize,
    loading,
  } = props;

  useEffect(() => {
    fetchPublicPosts();
  }, [page]);

  const handlePagination = (pg) => {
    editPage(pg.selected + 1);
  };

  return (
    <>
      <Nav />
      <main className='landing'>
        <Header />
        <div className='container'>
          <PostComp
            data={publicPosts}
            title='Public Posts'
            pagination={{ page, size, totalSize, handlePagination }}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  publicPosts: state?.app?.posts.public.posts,
  page: state.app.posts.public.page,
  size: state.app.posts.public.size,
  totalSize: state.app.posts.public.totalSize,
  loading: state.app.posts.public.loading,
});

const mapDispatchToProps = {
  navigate: navigation.navigate,
  fetchPublicPosts: publicPostsActions.fetchPublicPosts,
  editPage: publicPostsActions.editPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LandingPage));
