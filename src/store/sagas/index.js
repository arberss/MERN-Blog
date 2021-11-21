import { all } from 'redux-saga/effects';
import { watcher as home } from '../sagas/app/home';
import { watcher as navigation } from '../sagas/app/navigation';
import { watcher as login } from '../sagas/app/auth/login';
import { watcher as logout } from '../sagas/app/auth/logout';
import { watcher as register } from '../sagas/app/auth/register';
import { watcher as posts } from './app/posts';
import { watcher as post } from './app/post';
import { watcher as createPost } from './app/posts/create';
import { watcher as publicPosts } from './app/posts/public';
import { watcher as me } from '../sagas/app/me';
import { watcher as favorites } from '../sagas/app/favorites';
import { watcher as likes } from '../sagas/app/likes';
import { watcher as comments } from '../sagas/app/comments';
import { watcher as deleteComment } from '../sagas/app/comments/delete';
import { watcher as settings } from '../sagas/app/settings';

export default function* root() {
  yield all([
    home(),
    login(),
    logout(),
    navigation(),
    register(),
    posts(),
    post(),
    publicPosts(),
    createPost(),
    me(),
    favorites(),
    likes(),
    comments(),
    deleteComment(),
    settings(),
  ]);
}
