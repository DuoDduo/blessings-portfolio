import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import './ProjectContainer.css';


const ProjectContainer = ({ project }) => (
  <div className='project glass'>
    {project.image && (
      <img src={project.image} alt={`${project.name} preview`} className='project__image' />
    )}
    <h3>{project.name}</h3>

    <p className='project__description'>{project.description}</p>
    {project.stack && (
      <ul className='project__stack'>
        {project.stack.map((item) => (
          <li key={item} className='project__stack-item'>
            {item}
          </li>
        ))}
      </ul>
    )}

    {/* For Web projects: show both links */}
    {project.category === 'Web' && project.sourceCode && (
      <a
        href={project.sourceCode}
        aria-label='source code'
        className='link link--icon'
        target='_blank'
        rel='noopener noreferrer'
      >
        <GitHubIcon />
      </a>
    )}

    {project.category === 'Web' && project.livePreview && (
      <a
        href={project.livePreview}
        aria-label='live preview'
        className='link link--icon'
        target='_blank'
        rel='noopener noreferrer'
      >
        <LaunchIcon />
      </a>
    )}

    {/* For UI/UX projects: only show live preview */}
    {project.category === 'UI/UX' && project.livePreview && (
      <a
        href={project.livePreview}
        aria-label='live preview'
        className='link link--icon'
        target='_blank'
        rel='noopener noreferrer'
      >
        <LaunchIcon />
      </a>
    )}

    {/* For Graphics projects: no links (just image) */}
  </div>
);

export default ProjectContainer
