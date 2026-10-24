// src/components/Skills/Skills.jsx
import React from 'react'
import { skills } from '../../portfolio'
import './Skills.css'

const Skills = () => {
  if (!skills || !skills.length) return null

  // Group skills by category properties
  const aiMl = skills.filter(s => s.category === 'AI/ML')
  const fullstack = skills.filter(s => s.category === 'Fullstack')
  const frontend = skills.filter(s => s.category === 'Frontend')
  const tools = skills.filter(s => s.category === 'Tools')

  const renderSkillCard = (skill, index) => (
    <li key={index} className='skills__list-item'>
      <div className='skills__pill'>
        <span className='skills__indicator' />
        <span className='skills__name'>{skill.name}</span>
      </div>
    </li>
  )

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>Tech Stack Matrix</h2>

      {/* Group 1: Intelligent Layer */}
      {aiMl.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> AI/ML Systems & Intelligent Layer
          </h3>
          <ul className='skills__list'>
            {aiMl.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}

      {/* Group 2: Fullstack Infrastructure */}
      {fullstack.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> Full-Stack & Backend Systems
          </h3>
          <ul className='skills__list'>
            {fullstack.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}

      {/* Group 3: Frontend Layer */}
      {frontend.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> Responsive Interfaces & Frontend
          </h3>
          <ul className='skills__list'>
            {frontend.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}

      {/* Group 4: DevOps & Tools */}
      {tools.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> DevOps, Deployments & Core Tools
          </h3>
          <ul className='skills__list'>
            {tools.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Skills