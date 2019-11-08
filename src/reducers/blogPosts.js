import { _FAILURE, _REQUEST, _SUCCESS, FETCH_COMMENTS, FETCH_POST_DELETE, FETCH_POSTS } from '../constants'
import { Record } from 'immutable'
import { arrToMap } from "../utis/arrToMap"

const PostsRecord = Record({
  id: null,
  text: null,
  author: null,
  title: null,
  comments: [],
  commentsLoading: false,
  commentsLoaded: false
})

const defaultState = Record({
  entities: arrToMap([], PostsRecord),
  hasError: false,
  loading: true,
})

export default (state = new defaultState(), action) => {
  const { type, payload, posts } = action
  switch (type) {
    case FETCH_POSTS + _REQUEST:
      return state.set('loading', true)
    case FETCH_POSTS + _SUCCESS:
      return state
        .set('entities', arrToMap(posts, PostsRecord))
        .set('loading', false)
    case FETCH_POSTS + _FAILURE:
      return state.set('hasError', true)
    case FETCH_POST_DELETE:
      return state.deleteIn(['entities',payload.id])

    case FETCH_COMMENTS + _REQUEST:
      return state.setIn(
        ['entities', payload.postId, 'commentsLoading'], true)

    case FETCH_COMMENTS + _SUCCESS:
      return state
        .setIn(['entities', payload.postId, 'commentsLoading'], false)
        .setIn(['entities', payload.postId, 'commentsLoaded'], true)


    default:
      return state
  }
}