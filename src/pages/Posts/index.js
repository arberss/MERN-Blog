import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import PostComp from 'components/Post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/posts';
import { actions as categoryActions } from 'store/sagas/app/categories';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import RecommandedTopics from './RecommandedTopics';
import Button from 'components/button';
import Sticky from 'react-sticky-el';

const Posts = (props) => {
  const { fetchPosts, posts, getCategories, categories, navigate } = props;

  useEffect(() => {
    fetchPosts();
    getCategories();
  }, []);

  const handleCategory = (category) => {
    fetchPosts(category);
  };

  return (
    <>
      <Nav />
      <main className='posts'>
        <div className='container'>
          <div className='posts__content'>
            <div className='posts__content-left'>
              <PostComp data={posts} title='' newClass='posts__newClass' />
            </div>
            <div className='posts__right'>
              <Sticky
                boundaryElement='.block'
                topOffset={20}
                stickyClassName={'recommandedTopics__sticky'}
              >
                <Button
                  title='Write'
                  newClass='posts__createBtn'
                  onClick={() => navigate('/posts/create')}
                  type='button'
                />
                <RecommandedTopics
                  newClass='rmTopics'
                  categories={categories}
                  handleCategory={handleCategory}
                />
              </Sticky>
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
