import { contact } from '../../portfolio'
import './Contact.css'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section className='section contact center' id='contact'>
      <h2 className='section__title'>Let’s Connect</h2>
      <p className='contact__text'>
        I'm always open to collaborating on exciting projects or just chatting about tech, design, or anything in between. Feel free to reach out!
      </p>
      <a
        href={`mailto:${contact.email}`}
        aria-label='Email Blessing James'
      >
        <span type='button' className='btn btn--outline'>
          Email me
        </span>
      </a>
    </section>
  )
}

export default Contact
