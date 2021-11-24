import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import PostComp from 'components/Post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/posts';
import { actions as categoryActions } from 'store/sagas/app/categories';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import RecommandedTopics from './RecommandedTopics';

const Posts = (props) => {
  const { fetchPosts, posts, getCategories, categories, navigate } = props;

  useEffect(() => {
    fetchPosts();
    getCategories();
  }, []);

  return (
    <>
      <Nav />
      <main className='posts'>
        <div className='container'>
          <div
            className='posts__createBtn'
            onClick={() => navigate('/posts/create')}
          >
            Create Post
          </div>
          <div className='posts__content'>
            <PostComp data={posts} title='' newClass='posts__newClass' />
            <div className='posts__right'>
              <RecommandedTopics newClass='rmTopics' categories={categories} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.app.posts.index.posts,
  categories: state.app.categories.index.categories,
});

const mapDispatchToProps = {
  fetchPosts: postActions.fetchPosts,
  getCategories: categoryActions.getCategories,
  navigate: navigateActions.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
