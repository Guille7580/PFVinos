import React from 'react'
import './aboutUs.css'
import { useNavigate } from 'react-router-dom'
import javi from './javierjpeg.jpg'
import jose from './josejpeg.jpg'
import andrea from './andreajpeg.jpg'
import jenny from './jenny.jpg'
import luciana from './luciana.jpg'
import guille from './guille.jpeg'

export default function AboutUs () {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className='containerAbout'>
      <button className='backBtn' onClick={handleClick}>
        Back
      </button>
      <h1>Sobre Nosotros</h1>
      <h2>Hola!</h2>
      <div>
        <p>
          Somos un grupo de seis personas que se unieron para realizar este
          proyecto tan maravilloso. Aquí encontrarás una breve descripción de
          cada uno de nosotros junto a los links de contacto. ¡Espero que
          disfrutes de nuestro proyecto!
        </p>
      </div>
      <div className='members'>
        <div>
          <h3>
            Andrea Gutierrez
            <a
              href='https://www.linkedin.com/in/andrea-gutierrez-507919135/'
              target='_blank'
            >
              LinkedIn
            </a>
            <a href='https://github.com/andrea198824' target='_blank'>
              Github
            </a>
          </h3>
          <img src={andrea} alt='Foto de Andrea Gutierrez' height={'250px'} />
          <p className='para'>
            Estudiante de Ingeniería de Software, Administradora de Empresas y
            Especialista en Gerencia de Recursos Humanos, con amplio
            conocimiento en manejo de personal, interesada en el crecimiento
            personal y empoderamiento integral. Tengo un gran interés por la
            programación y la tecnología.
          </p>
        </div>
       
        <div>
          <h3>
            Javier Irigoyen
            <a
              href='https://www.linkedin.com/in/javier-irigoyen-terre-desarrollador-web-full-stack/'
              target='_blank'
            >
              LinkedIn
            </a>
            <a href='https://github.com/javiirigoyen' target='_blank'>
              Github
            </a>
          </h3>
          <img src={javi} alt='Foto de Javier Irigoyen' height={'250px'} />
          <p className='para'>
            Hola 👋👋 Soy Javier desarrollador web Full-Stack. Apasionado por el
            mundo IT. Tengo mucho interés en la tecnología, de chico siempre me
            ha interesado y he participado en programación en cualquier tipo de
            ámbito, ya que creo que la tecnología aporta en cualquier de estos
            lugares si uno simplemente le da la oportunidad.Los conocimientos
            técnicos adquiridos fueron a partir del cursado de un bootcamp
            llamado Henry el cual me permitió dar un salto en mis conocimientos
          </p>
        </div>
        <div>
          <h3>
            Jennifer Lombardo
            <a href='https://www.linkedin.com/in/jml-060915/' target='_blank'>
              LinkedIn
            </a>
            <a href='https://github.com/jennyxlombardo' target='_blank'>
              Github
            </a>
          </h3>
          <img src={jenny} alt='Foto de Jennifer Lombardo' height={'250px'} />
          <p className='para'>
            Hey Everyone! I decided to make a career change and go into
            something I have always been interested in, programming. I’ve
            mastered SQL, React, Redux, JavaScript, Node.js, Express and had fun
            working with databases and APIs. I started studying CSS, HTML, and
            JavaScript on my own before deciding that I need a bit of guidance
            and found a really good Boot Camp to join. Now I have a widened
            skill set needed to be a great programmer.
          </p>
        </div>
        <div>
          <h3>
            Jose Miro Erdmann
            <a href='https://www.linkedin.com/in/joseamiro/' target='_blank'>
              LinkedIn
            </a>
            <a href='https://github.com/Joseacode' target='_blank'>
              Github
            </a>
          </h3>
          <img src={jose} alt='Foto de Jose Erdmann' height={'250px'} />
          <p className='para'>
            Desarrollador fullstack, con conocimiento en Javascript, React.
            Redux, Nodejs, HTML, CSS. Conocimientos que me dan la capacidad de
            desarrollar aplicaciones web escalables. Tambien poseo
            certificaciones en Python. Poseo capacidad de aprendizaje y
            resolucion de problemas. Busco conocer mas sobre cada tema y
            profundizando en el conocimiento y nuevas tecnologias. Dentro de mi
            habilidades blandas puedo nombrar: proactividad, Trabajo en equipo,
            Resiliencia, Empatía, Capacidad de recibir y dar feedback, Solución
            de problemas y conflictos. Entre otras. Me he dedicado anteriormente
            a la reparacón de computadoras, durante mas de 20 años de
            experiencia.
          </p>
        </div>
        <div>
          <h3>
            Julio Guille Appendino
            <a
              href='https://www.linkedin.com/in/guille-appe-fullstack/'
              target='_blank'
            >
              LinkedIn
            </a>
            <a href='https://github.com/Guille7580' target='_blank'>
              Github
            </a>
          </h3>
          <img
            src={guille}
            alt='Foto de Julio Guillermo Appendino'
            height={'250px'}
          />
          <p className='para'>
            Hola!, Soy Julio Guillermo Appendino, Soy Full Stack Developer , y
            estoy tratando de cambiar mi hoja de ruta , siempre me gusto la
            programación y estoy buscando insertarme en este mercado , soy muy
            responsable y proactivo , tengo conocimientos Node.js, Redux, React,
            Express, Axios, SQL, JavaScript, bases de datos , html , css y
            varios lenguajes mas , dejo mis datos en caso que les interese mi
            perfil .
          </p>
        </div>
        <div>
          <h3>
            Luciana Zanetti
            <a
              href='https://www.linkedin.com/in/luciana-zanetti-dev/'
              target='_blank'
            >
              LinkedIn
            </a>
            <a href='https://github.com/LulaZeta' target='_blank'>
              Github
            </a>
          </h3>
          <img src={luciana} alt='Foto de Luciana Zanetti' height={'250px'} />
          <p className='para'>
            Soy Luciana Full Stack Developer. El lugar donde combino todo lo que
            soy. La parte más dura habiendo estudiado ingeniería y la parte
            creativa de la fotografía. Programming: JavasScript Web Technology:
            HTML5, CSS3, NodeJS DataBase: PostgreSQL Framework/Library: ReactJS,
            Redux, Express Project Management: Trello, Asana, Slack Processes:
            Scrum Version Control: Git & GitHub Photography: Photoshop,
            Lightroom Design: Illustrator{' '}
          </p>
        </div>

      </div>
    </div>
  )
}
