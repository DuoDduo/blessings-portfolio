// src/components/About/About.jsx
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { FaBehance } from 'react-icons/fa'
import { about } from '../../portfolio'
import './About.css'

const About = () => {
  const { name, description, resume, social } = about

  return (
    <section className='about'>

      {/* Engineering System Eyebrow */}
      <div className='about__eyebrow'>
        <span className='about__bracket'>[</span>
        <span className='about__role-text'>Core Focus // Agentic RAG & Multi-Agent Systems</span>
        <span className='about__bracket'>]</span>
      </div>

      {/* Structural Hero Headline Matrix */}
      <div className='about__hero-header'>
        {name && (
          <h1 className='about__name'>
            {name}
            <span className='about__cursor' aria-hidden='true'>_</span>
          </h1>
        )}
        
        {/* Authoritative Primary Job Headline */}
        <h2 className='about__headline'>
          AI Systems Engineer <span className='about__headline-amp'>&</span> Full-Stack Developer
        </h2>
      </div>

      {/* Ambient Accent Indicator */}
      <div className='about__accent-line' aria-hidden='true'>
        <span className='about__accent-dot' />
        <span className='about__accent-track' />
      </div>

      {/* Contextual Sub-description */}
      {description && (
        <p className='about__desc'>{description}</p>
      )}

      {/* Primary Action Infrastructure */}
      <div className='about__actions'>
        {resume && (
          <a
            href={resume}
            target='_blank'
            rel='noopener noreferrer'
          >
            <button className='btn about__resume-btn'>
              <span>View Resume</span>
              <span className='about__btn-arrow'>→</span>
            </button>
          </a>
        )}

        {social && (
          <div className='about__socials'>
            {social.github && (
              <a
                href={social.github}
                aria-label='GitHub'
                className='link link--icon about__social-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon fontSize='small' />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='LinkedIn'
                className='link link--icon about__social-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon fontSize='small' />
              </a>
            )}
            {social.behance && (
              <a
                href={social.behance}
                aria-label='Behance'
                className='link link--icon about__social-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaBehance />
              </a>
            )}
          </div>
        )}
      </div>

    </section>
  )
}

export default About