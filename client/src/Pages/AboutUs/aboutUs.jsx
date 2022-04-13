import React from 'react'
import './aboutUs.css'
import javi from './javierjpeg.jpg'
import jose from './josejpeg.jpg'
import andrea from './andreajpeg.jpg'
import jenny from './jenny.jpg'
import luciana from './luciana.jpg'
import guille from './guille.jpeg'

export default function AboutUs () {
  return (
    <div className='containerAbout'>
      <h1>Sobre Nosotros</h1>
      <h2>Hola!</h2>
      <div>
        <p>
          We are a group of 8 individuals who came together to complete this
          arduous task of completing our program at Henry.  Please, let me introduce this
          amazing group! Have a click on their profile to go directly to their
          LinkedIn and Github pages. Thanks for giving us a gander.
        </p>
      </div>
      <div className='members'>
        <div>
          <h3>
            Andrea Gutierrez
            <a href='https://www.linkedin.com/in/andrea-gutierrez-507919135/'>
              LinkedIn
            </a>
            <a href='https://github.com/andrea198824'>
              Github
            </a>
          </h3>
          <img src={andrea} alt='Foto de Andrea Gutierrez' height={'200px'} />
          <p>Back-end</p>
        </div>
        <div>
          <h3>
            Luciana Zanetti
            <a href='https://www.linkedin.com/in/luciana-zanetti-dev/'>
              LinkedIn
            </a>
            <a href='#'>
              Missing Github
            </a>
          </h3>
          <img src={luciana} alt='Foto de Luciana Zanetti' height={'250px'} />
          <p>Back-end</p>
        </div>

        <div>
          <h3>
            Javier Irigoyen
            <a href='https://www.linkedin.com/in/javier-irigoyen-terre-desarrollador-web-full-stack/'>
              LinkedIn
            </a>
            <a href='https://github.com/javiirigoyen'>
              Github
            </a>
          </h3>
          <img src={javi} alt='Foto de Javier Irigoyen' height={'250px'} />
          <p>Front-end</p>
        </div>
        <div>
          <h3>
            Jennifer Lombardo
            <a href='https://www.linkedin.com/in/jml-060915/'>LinkedIn</a>
            <a href='https://github.com/jennyxlombardo'>Github</a>
          </h3>
          <img src={jenny} alt='Foto de Jennifer Lombardo' height={'250px'} />
          <p>Front-end</p>
        </div>
        <div>
          <h3>
           
            Jose Miro Erdmann
            <a href='https://www.linkedin.com/in/joseamiro/'>LinkedIn</a>
            <a href='#'>Missing Github</a>
          </h3>
          <img src={jose} alt='Foto de Jose Erdmann' />
          <p>Back-end</p>
        </div>
        <div>
          <h3>
            Julio Guillermo Appendino
            <a href='https://www.linkedin.com/in/guille-appe-fullstack/'>
              LinkedIn
            </a>
            <a href='https://github.com/Guille7580'>
              Github
            </a>
          </h3>
          <img
            src={guille}
            alt='Foto de Julio Guillermo Appendino'
            height={'250px'}
          />
          <p>Front-end</p>
        </div>
      </div>
    </div>
  )
}
