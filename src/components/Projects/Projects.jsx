// src/components/Projects/Projects.jsx
import React, { useState } from 'react'
import { projects as allProjects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const categories = ['Web', 'UI/UX', 'Graphics']

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Web')

  const filteredProjects = allProjects.filter(
    (project) => project.category === selectedCategory
  )

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      {/* Category tabs */}
      <div className='projects__tabs' role='tablist' aria-label='Project categories'>
        {categories.map((category) => (
          <button
            key={category}
            role='tab'
            aria-selected={selectedCategory === category}
            className={`projects__tab ${selectedCategory === category ? 'projects__tab--active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span className='projects__tab-slash'>//</span>
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className='projects__grid' key={selectedCategory}>
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.name}-${index}`}
              className='projects__card-wrap'
              style={{ '--delay': `${index * 80}ms` }}
            >
              <ProjectContainer project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className='projects__empty'>
          <span className='projects__empty-prefix'>// </span>
          No projects in this category yet.
        </p>
      )}
    </section>
  )
}

export default Projects