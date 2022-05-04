import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import style from './Rating.module.css'

import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { rateProduct } from '../../actions/products'
import { postComment } from '../../actions/comments'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const labels = {
  1: 'Useless',

  2: 'Poor',

  3: 'Ok',

  4: 'Good',

  5: 'Excellent'
}

const useStyles = makeStyles({
  root: {
    width: 132,
    display: 'flex',
    alignItems: 'center',

    margin: '45px',
    padding: '20px ',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 0px 10px #00000029'
  }
})

export default function Rate (props) {
  const { rate, productId, userId } = props
  const dispatch = useDispatch()
  console.log('rate: ', rate)
  console.log('productId ', productId)
  console.log('userId: ', userId)
  const [value, setValue] = useState(null)
  const [review, setReview] = useState()
  const [hover, setHover] = useState(-1)
  const classes = useStyles()
  let navigate = useNavigate()

  const handleRateProduct = (productId, value, review, userId) => {
    let comment = {
      descripcion: review,
      productoId: parseInt(productId)
      //usuarioId: userId
    }

    let product = {
      id: productId,
      rate: value
    }

    dispatch(rateProduct(product))
    dispatch(postComment(comment))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Gracias por valorar el producto!',
      showConfirmButton: true,
      timer: 3000
    }).then(function () {
      window.location = '/home/' //+ productId
    })
  }

  function handleCommentChange (e) {
    e.preventDefault()
    setReview(e.target.value)
  }

  return (
    <div className={style.rating}>
      <Rating
        name='hover-feedback'
        value={value || rate}
        //precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue)
          console.log('newValue es ', newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
      />

      {/*          
        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}

      <br />
      <br />

      <InputGroup>
        <Form.Label className={style.label}>Deja tu comentario</Form.Label>
        <FormControl
          onChange={e => handleCommentChange(e)}
          as='textarea'
          aria-label='With textarea'
        />
      </InputGroup>

      <Button
        onClick={() => {
          handleRateProduct(productId, value || rate, review, userId)
        }}
        className={style.button}
      >
        Puntuar
      </Button>
    </div>
  )
}
