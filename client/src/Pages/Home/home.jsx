import React from 'react'
import Footer from '../../components/Footer/footer'
import NavBar from '../../components/navBar/navBar'
import './home.css'
import image from './PurpleGrapesSmall.jpg'
import AnimatedText from 'react-animated-text-content'

function Home () {
  return (
    <>
      <NavBar />
      <img className='imageHome' src={image} alt="" />
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
          Bienvenidas a Las Moritas
        </AnimatedText>
        <div className='containerBody'>
          
        </div>
      <Footer />
    </>
  )
}

export default Home
