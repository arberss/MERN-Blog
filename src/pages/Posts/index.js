import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import PostComp from 'components/Post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as postActions } from 'store/sagas/app/posts';
import { actions as categoryActions } from 'store/sagas/app/categories';
import { actions as createPostActions } from 'store/sagas/app/posts/create';
import { actions as navigateActions } from 'store/sagas/app/navigation';
import RecommandedTopics from './RecommandedTopics';
import Button from 'components/button';
import Sticky from 'react-sticky-el';
import InputComponent from 'components/input';

const Posts = (props) => {
  const {
    fetchPosts,
    posts,
    getCategories,
    categories,
    navigate,
    page,
    size,
    totalSize,
    editPage,
    selectCategory,
    categorySelected,
    clearInitValues,
    loading,
    setSearch,
    search,
  } = props;

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    fetchPosts(categorySelected);
  }, [page, categorySelected, search]);

  const handleCategory = (category) => {
    editPage(1);
    selectCategory(category);
  };

  const handlePagination = (pg) => {
    editPage(pg.selected + 1);
  };

  return (
    <>
      <Nav />
      <main className='posts'>
        <div className='container'>
          <div className='posts__content'>
            <div className='posts__content-left'>
              <InputComponent
                search={true}
                placeholder='Search'
                handleChange={(e) => setSearch(e.target.value)}
              />
              <PostComp
                data={posts}
                title=''
                pagination={{ page, size, totalSize, handlePagination }}
                newClass='posts__newClass'
                loading={loading}
              />
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
                  onClick={() => {
                    navigate('/posts/create');
                    clearInitValues();
                  }}
                  type='button'
                />
                <RecommandedTopics
                  newClass='rmTopics'
                  categories={categories}
                  handleCategory={handleCategory}
                  categorySelected={categorySelected}
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
  loading: state.app.posts.index.loading,
  page: state.app.posts.index.page,
  size: state.app.posts.index.size,
  search: state.app.posts.index.search,
  totalSize: state.app.posts.index.totalSize,
  categorySelected: state.app.posts.index.categorySelected,
  categories: state.app.categories.index.categories,
});

const mapDispatchToProps = {
  fetchPosts: postActions.fetchPosts,
  editPage: postActions.editPage,
  getCategories: categoryActions.getCategories,
  setSearch: postActions.setSearch,
  selectCategory: postActions.selectCategory,
  navigate: navigateActions.navigate,
  clearInitValues: createPostActions.clearInitValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
