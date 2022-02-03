import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import PostComp from 'components/Post';
import { actions as favoriteActions } from 'store/sagas/app/favorites';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const Favorites = (props) => {
  const { getFavorites, favorites, loading } = props;

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className='favorites'>
      <Nav />
      <div className='container'>
        <div className='favoritess__content'>
          <PostComp
            data={favorites}
            title='Favorites'
            newClass='favorites__newClass'
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.app.favorites.index.favorites,
  loading: state.app.favorites.index.loading,
});

const mapDispatchToProps = {
  getFavorites: favoriteActions.getFavorites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Favorites));
