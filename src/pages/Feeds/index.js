import React, { useEffect } from 'react';
import BottomTab from 'components/BottomTab';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actions as publicPostsActions } from 'store/sagas/app/posts/public';
import { actions as createPostActions } from 'store/sagas/app/posts/create';
import FeedsList from './Feeds';
import AddFeed from './AddFeed';

const Feeds = (props) => {
  const { fetchPublicPosts, posts, showModal, setShowModal } = props;

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  return (
    <>
      <main className='feeds'>
        <div className='container'>
          <div className='feeds__content'>
            <div className='feeds__top'>
              <div className='feeds__top-title'>Latest Feed</div>
              <div className='feeds__add' onClick={setShowModal}>
                Add
              </div>
            </div>
            <div className='feeds__card'>
              <FeedsList data={posts} />
            </div>
            <BottomTab />
          </div>
          {showModal && <AddFeed />}
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state?.app?.posts?.public?.posts,
  showModal: state?.app?.posts?.createPost?.showModal,
});

const mapDispatchToProps = {
  fetchPublicPosts: publicPostsActions.fetchPublicPosts,
  setShowModal: createPostActions.setShowModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Feeds));
