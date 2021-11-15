import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import PostComp from 'components/Post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/posts';
import RecommandedTopics from './RecommandedTopics';

const Posts = (props) => {
  const { fetchPosts, posts } = props;

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Nav />
      <main className='posts'>
        <div className='container'>
          <div className='posts__content'>
            <PostComp data={posts} title='' newClass='posts__newClass' />
            <div className='posts__right'>
              <RecommandedTopics newClass='rmTopics' />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.app.posts.index.posts,
});

const mapDispatchToProps = {
  fetchPosts: postActions.fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
