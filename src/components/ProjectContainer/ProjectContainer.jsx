// src/components/ProjectContainer/ProjectContainer.jsx
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import './ProjectContainer.css'

const ProjectContainer = ({ project }) => {
  const hasLinks =
    (project.category === 'Web' && (project.sourceCode || project.livePreview)) ||
    (project.category === 'UI/UX' && project.livePreview)

  return (
    <article className='project-card'>

      {/* ── Image with cinematic overlay ── */}
      <div className='project-card__media'>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className='project-card__img'
          />
        ) : (
          <div className='project-card__img-placeholder'>
            <span className='project-card__placeholder-text'>&lt;/&gt;</span>
          </div>
        )}

        {/* Gradient overlay — always present, links surface on hover */}
        <div className='project-card__overlay'>
          {hasLinks && (
            <div className='project-card__links'>
              {project.category !== 'UI/UX' && project.sourceCode && (
                <a
                  href={project.sourceCode}
                  aria-label='Source code'
                  className='project-card__link'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GitHubIcon fontSize='small' />
                  <span>Source</span>
                </a>
              )}
              {project.livePreview && (
                <a
                  href={project.livePreview}
                  aria-label='Live preview'
                  className='project-card__link project-card__link--primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <LaunchIcon fontSize='small' />
                  <span>Live</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Category badge */}
        <span className='project-card__badge'>{project.category}</span>
      </div>

      {/* ── Card body ── */}
      <div className='project-card__body'>
        <h3 className='project-card__name'>{project.name}</h3>
        <p className='project-card__desc'>{project.description}</p>

        {project.stack && (
          <ul className='project-card__stack'>
            {project.stack.map((item) => (
              <li key={item} className='project-card__tag'>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

    </article>
  )
}

export default ProjectContainer