// src/components/About/About.jsx
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaBehance } from 'react-icons/fa'
import { about } from "../../portfolio";
import './About.css';

const About = () => {
  const { name, role, description, resume, social } = about;

  return (
    <div className='about center'>
      {name && (
        <h1>
          Hi, I am <span className='about__name'>{name}.</span>
        </h1>
      )}

      {role && <h2 className='about__role'>A {role}.</h2>}
      <p className='about__desc'>{description && description}</p>

      <div className='about__contact center'>
        {resume && (
          <a href={resume} target='_blank' rel='noopener noreferrer'>
            <span className='btn btn--outline'> View Resume</span>
          </a>
        )}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='GitHub'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='LinkedIn'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon />
              </a>
            )}
           {social.behance && (
              <a
                href={social.behance}
                aria-label='Behance'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaBehance />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default About;
