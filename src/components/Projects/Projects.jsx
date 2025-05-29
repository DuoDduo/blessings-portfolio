import React, { useState } from 'react'
import { projects as allProjects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const categories = ['Web', 'Graphics', 'UI/UX'] // Only defined categories, no 'All'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Web') // Default is 'Web'

  const filteredProjects = allProjects.filter(
    (project) => project.category === selectedCategory
  )

  return (
    <section id="projects" className="section projects">
      <h2 className="section__title">Projects</h2>

      {/* Category Tabs */}
      <div className="projects__tabs">
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

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects__grid" key={selectedCategory}>
          {filteredProjects.map((project, index) => (
            <ProjectContainer
              key={`${project.name}-${index}`}
              project={project}
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
          No projects in this category.
        </p>
      )}
    </section>
  )
}

export default Projects
