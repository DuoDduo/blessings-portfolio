// src/components/Skills/Skills.jsx
import React from 'react'
import { skills } from '../../portfolio'
import './Skills.css'

const Skills = () => {
  if (!skills || !skills.length) return null

  // If your portfolio.js data is a flat array, we can group them logically here
  // or render them in an elite matrix. Let's group them to look highly intentional.
  const coreAI = skills.filter(s => /rag|agent|python|ai|model|prompt|fastapi/i.test(s))
  const webStack = skills.filter(s => !/rag|agent|python|ai|model|prompt|fastapi/i.test(s))

  const renderSkillCard = (skill, index) => (
    <li key={index} className='skills__list-item'>
      <div className='skills__pill'>
        <span className='skills__indicator' />
        <span className='skills__name'>{skill}</span>
      </div>
    </li>
  )

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>Tech Stack Matrix</h2>

      {/* Group 1: Intelligent Layer */}
      {coreAI.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> Intelligence & Core Architectures
          </h3>
          <ul className='skills__list'>
            {coreAI.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}

      {/* Group 2: Systems & Deployment Layer */}
      {webStack.length > 0 && (
        <div className='skills__group'>
          <h3 className='skills__group-title'>
            <span className='skills__group-bracket'>//</span> Full-Stack & Interface Implementation
          </h3>
          <ul className='skills__list'>
            {webStack.map((skill, index) => renderSkillCard(skill, index))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Skills