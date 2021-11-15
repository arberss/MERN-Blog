import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as navigation } from 'store/sagas/app/navigation';
import { actions as publicPostsActions } from 'store/sagas/app/posts/public';
import Nav from 'components/Nav';
import Header from './Header';
import PostComp from 'components/Post';

const LandingPage = (props) => {
  const { navigate, fetchPublicPosts, publicPosts } = props;

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  return (
    <>
      <Nav />
      <main className='landing'>
        <Header />
        <div className='container'>
          <PostComp data={publicPosts} title='Public Posts' />
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  publicPosts: state?.app?.posts.public.posts,
});

const mapDispatchToProps = {
  navigate: navigation.navigate,
  fetchPublicPosts: publicPostsActions.fetchPublicPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LandingPage));
