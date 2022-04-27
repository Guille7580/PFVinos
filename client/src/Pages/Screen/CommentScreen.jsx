import React from 'react'
import Review from './Review'
import './CommentScreen.css'

const CommentScreen = ({ comments }) => {
  if (comments) {
    return (
      <div className='comment-list-screen'>
        {comments.map(c => {
          return (
            <Review
              comment={c.descripcion}
              user={c.usuarioId}
              fecha={c.updatedAt}
            />
          )
        })}
      </div>
    )
  } else {
    return (
      <div className='comment-list-screen'>
        <h1>No hay comentarios todavia</h1>
      </div>
    )
  }
}

export default CommentListScreen
