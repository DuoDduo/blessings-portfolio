import { skills } from '../../portfolio'
import './Skills.css'

const Skills = () => {
  if (!skills.length) return null

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>Skills</h2>
      <ul className='skills__list'>
        {skills.map((skill, index) => (
          <li key={index} className='skills__list-item'>
            <span className='btn btn--plain'>{skill}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
