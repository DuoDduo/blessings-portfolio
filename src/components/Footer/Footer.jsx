import './Footer.css'

const Footer = () => (
  <footer className='footer'>
    <div className='footer__content'>
      <p className='footer__text'>
        © {new Date().getFullYear()} All rights reserved • Designed & Built by{' '}
        <a
          href='https://github.com/DuoDduo'
          className='link footer__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Blessing James
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
