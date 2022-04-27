import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { putComment } from '../../../actions/comments'

const Reply = ({ comment, reply }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [score, setScore] = useState(reply.score)

  const handlePlusReply = async () => {
    const newScore = score + 1
    comment.replies.map(x => {
      if (x._id === reply._id) x.score = newScore
      return 1
    })
    dispatch(putComment({ ...comment }))
    setScore(newScore)
  }

  const handleMinusReply = async () => {
    const newScore = score - 1
    comment.replies.map(x => {
      if (x._id === reply._id) x.score = newScore
      return 1
    })
    dispatch(putComment({ ...comment }))
    setScore(newScore)
  }

  const handleDeleteReply = async () => {
    // console.log(comment);
    dispatch(
      putComment({
        ...comment,
        replies: comment.replies.filter(x => x._id !== reply._id)
      })
    )
  }

  return (
    <div>
      <div className='reply comment'>
        <div className='comment__header'>
          <img src={reply.user.image} alt='' />
          <p className='comment__username'>{reply.user.username}</p>
          {user.user.username === reply.user.username && <span>you</span>}
          <p>{moment(reply.createdAt).fromNow()}</p>
        </div>
        <div className='comment__content'>
          <p>
            <span>@{reply.replyingTo}</span> {reply.content}
          </p>
        </div>
        <div className='comment__footer'>
          <div className='score'>
            <button
              className='score__plus'
              onClick={() => {
                handlePlusReply()
              }}
            >
              <img src='./images/icon-plus.svg' alt='plus' />
            </button>
            <p className='score__amount'>{reply.score}</p>
            <button
              className='score__minus'
              onClick={() => {
                handleMinusReply()
              }}
            >
              <img
                src='./images/icon-minus.svg'
                alt='minus'
                className='score__minus'
              />
            </button>
          </div>
          {user.user.username === reply.user.username ? (
            <div className='user-buttons'>
              <div className='delete-button'>
                <button
                  onClick={() => {
                    handleDeleteReply()
                  }}
                >
                  <img src='./images/icon-delete.svg' alt='' />
                  Delete
                </button>
              </div>

              <div className='edit-button'>
                <button>
                  <img src='./images/icon-edit.svg' alt='' />
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className='reply-button'>
              <button>
                <img src='./images/icon-reply.svg' alt='' />
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reply
