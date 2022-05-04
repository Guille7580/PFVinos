import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  filterByCategory,
  getShowActivity,
  order_ByName,
  order_ByPrice
} from '../../actions/categorias'
import { getDetail, resetDetail ,getAllProducts } from '../../actions/productos'
import Swal from 'sweetalert2'



import Cards from '../../components/cards/cards'
import Paginado from '../../components/Paginado/Paginado'
import SearchBar from '../../components/SearchBar/searchBar'
import NavBar from '../../components/navBar/navBar'
import './home.css'
import image from './PurpleGrapesSmall.jpg'
import AnimatedText from 'react-animated-text-content'

function Home ({handleAddToCart, setCartItems, cartItems}) {
  const dispatch = useDispatch()
  const allProduct = useSelector(state => state.productosReducer.allProducts)
  const allActivities = useSelector(state => state.countryActivity)
  const [orden, setOrden] = useState('')
  const [ordenx, setOrdenx] = useState('')

  const [currentPage, setCurrentPage] = useState(1) //Pagina actual
  const [productPerPage] = useState(6) //vinos por pagina

  const indexOfLastProduct = currentPage * productPerPage //8
  const indexOfFirstProduct = indexOfLastProduct - productPerPage //0

  const currentProducts = allProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const pagination = pageNumbers => {
    setCurrentPage(pageNumbers)
  }

  function handleClick (e) {
    e.preventDefault()
    dispatch(getAllProducts())
  }

  const handleFilterCat = e => {
    e.preventDefault()
    dispatch(filterByCategory(e.target.value))
    setCurrentPage(1)
  }

  const handleorderByName = e => {
    e.preventDefault()
    dispatch(order_ByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  const handleorderPrice = e => {
    e.preventDefault()
    dispatch(order_ByPrice(e.target.value))
    setCurrentPage(1)
    setOrdenx(`Ordenadox ${e.target.value}`)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [allProduct])

  useEffect(() => {
      dispatch(resetDetail())
      dispatch(getShowActivity())
  }, [])

   const categories = useSelector(state => state.catReducer.allCategory)

  return (
    <div>

      <img className='imageHome' src={image} alt='' />
      <AnimatedText
        type='words' // animate words or chars
        animation={{
          x: '200px',
          y: '-20px',
          scale: 1.1,
          ease: 'ease-in-out'
        }}
        animationType='float'
        interval={0.06}
        duration={2.5}
        tag='p'
        className='animatedParagraph'
        includeWhiteSpaces
        threshold={0.1}
        rootMargin='20%'
      >
        Viñedo Las Moritas
      </AnimatedText>
      <div className='pinkBar'></div>
      <div className='filters'>
        
        <label className='labelHome'>  </label>
        <select onChange={handleorderPrice}>
          <option value='nada'>Precio</option>
          <option value='asce'>Menor a Mayor</option>
          <option value='desce'>Mayor a Menor</option>
        </select>
        <label className='labelHome'>  </label>
        <select onChange={handleorderByName}>
          <option value='nada'>Nombre</option>
          <option value='asc'>A - Z</option>
          <option value='desc'>Z - A</option>
        </select>
        <label className='labelHome'>  </label>
        <select onChange={handleFilterCat}>
                  <option value='All'>Categoría</option>

                  {categories.map(el => <option value={el.nombre}>{el.nombre}</option>)}

          {/*<option value='Blanco'>Blanco</option>*/}
          {/*<option value='Tinto'>Tinto</option>*/}
          {/*<option value='Rosado'>Rosado</option>*/}
        </select>
        <SearchBar className= 'searchHome' />
        <button className='searchBtn' onClick={e=>{handleClick(e)}}>Recargar Vinos</button>
        
      </div>
      <div className='containerBody'>
        
        <Paginado
          className='numberPag'
          productPerPage={productPerPage}
          allProduct={allProduct.length}
          pagination={pagination}
          page={currentPage}
        />
        {currentProducts.length > 0 ? (
          <Cards currentProducts={currentProducts} handleAddToCart = {handleAddToCart} cartItems = {cartItems} setCartItems = {setCartItems}/>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Home
