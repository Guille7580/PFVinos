import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import getHeaderToken from '../Helpers/getHeaderToken'
import {
  COMMENT_DELETE,
  COMMENT_DELETE_FAIL,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_POST,
  COMMENT_POST_FAIL,
  COMMENT_PUT,
  COMMENT_PUT_FAIL,
  COMMENT_PRODUCT_REQUEST,
  COMMENT_PRODUCT_SUCCESS,
  COMMENT_PRODUCT_FAIL
} from './types'

export function listComments () {
  return async function (dispatch) {
    try {
      dispatch({ type: COMMENT_LIST_REQUEST })
      const { data } = await axios.get(`${BASEURL}/comments`)
      dispatch({ type: COMMENT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: COMMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
}

export const postComment = comment => async dispatch => {
  try {
    const { data } = await axios.post(
      `${BASEURL}/comments`,
      comment,
      getHeaderToken()
    )
    dispatch({
      type: COMMENT_POST,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COMMENT_POST_FAIL,
      payload: message
    })
  }
}

export const putComment = comment => async dispatch => {
  try {
    const { data } = await axios.put(`${BASEURL}/${comment._id}`, comment)
    dispatch({ type: COMMENT_PUT, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COMMENT_PUT_FAIL,
      payload: message
    })
  }
}

export const deleteComment = comment => async dispatch => {
  try {
    if (comment._id) {
      await axios.delete(`${BASEURL}/${comment._id}`, getHeaderToken())
    }

    dispatch({ type: COMMENT_DELETE, payload: comment })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: message
    })
  }
}

export function getCommentByProductId (id) {
  return async function (dispatch) {
    try {
      dispatch({ type: COMMENT_PRODUCT_REQUEST })
      const { data } = await axios.get(`${BASEURL}/comments/` + id)
      dispatch({ type: COMMENT_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: COMMENT_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
}
