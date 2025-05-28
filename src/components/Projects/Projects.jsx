import React, { useState } from 'react';
import { projects } from '../../portfolio';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import './Projects.css';

const categories = ['Web', 'Graphics', 'UI/UX'];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Web');

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Projects:', filteredProjects.map(p => p.name));

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      <div className='projects__tabs'>
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='projects__grid'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectContainer key={project.name} project={project} />
          ))
        ) : (
          <p>No projects found for {selectedCategory}</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
