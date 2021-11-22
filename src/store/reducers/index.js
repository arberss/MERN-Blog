import { connectRouter } from 'connected-react-router';
import home from '../sagas/app/home';
import { combineReducers } from 'redux';
import history from 'utils/history';
import login from '../sagas/app/auth/login';
import logout from '../sagas/app/auth/logout';
import register from '../sagas/app/auth/register';
import forgot from '../sagas/app/auth/forgot';
import posts from '../sagas/app/posts';
import post from '../sagas/app/post';
import createPost from '../sagas/app/posts/create';
import publicPosts from '../sagas/app/posts/public';
import me from '../sagas/app/me';
import favorites from '../sagas/app/favorites';
import likes from '../sagas/app/likes';
import comments from '../sagas/app/comments';
import settings from '../sagas/app/settings';

export default function createReducer(injectedReducers) {
  return combineReducers({
    app: combineReducers({
      home: combineReducers({
        index: home,
      }),
      auth: combineReducers({
        login,
        register,
        logout,
        forgot,
      }),
      posts: combineReducers({
        index: posts,
        public: publicPosts,
        createPost,
      }),
      post: combineReducers({
        index: post,
      }),
      me: combineReducers({
        index: me,
      }),
      favorites: combineReducers({
        index: favorites,
      }),
      likes: combineReducers({
        index: likes,
      }),
      comments: combineReducers({
        index: comments,
      }),
      settings: combineReducers({
        index: settings,
      }),
    }),
    ...injectedReducers,
    router: connectRouter(history),
  });
}
