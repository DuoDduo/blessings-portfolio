// src/components/MeetMe/MeetMe.jsx
import React from 'react'
import './MeetMe.css'
import profilePic from '../../assets/profile.jpg'

const specializations = [
  'Agentic RAG Systems',
  'Multi-Agent Orchestration',
  'LLM Integration',
  'Full-Stack Architecture',
  'REST & GraphQL APIs',
  'Cloud Infrastructure',
]

const MeetMe = () => {
  return (
    <section id='meet' className='section meet-section'>
      <h2 className='section__title'>Meet Me</h2>

      <div className='meet-me'>

        {/* ── Left: image with targeting frame ── */}
        <div className='meet-me__frame-wrap'>
          {/* Corner accents */}
          <span className='meet-me__corner meet-me__corner--tl' aria-hidden='true' />
          <span className='meet-me__corner meet-me__corner--tr' aria-hidden='true' />
          <span className='meet-me__corner meet-me__corner--bl' aria-hidden='true' />
          <span className='meet-me__corner meet-me__corner--br' aria-hidden='true' />

          <img
            src={profilePic}
            alt='Blessing James — Full-Stack Developer & AI Engineer'
            className='meet-me__img'
          />

          {/* Status badge */}
          <div className='meet-me__status' aria-label='Status: Available'>
            <span className='meet-me__status-dot' aria-hidden='true' />
            <span>Available</span>
          </div>
        </div>

        {/* ── Right: structured profile ── */}
        <div className='meet-me__profile'>

          <div className='meet-me__eyebrow'>
            <span className='meet-me__eyebrow-slash'>// </span>
            about.me
          </div>

          <h3 className='meet-me__headline'>
            Building at the intersection of<br />
            <span className='meet-me__headline-accent'>intelligent systems</span> &amp; modern web.
          </h3>

          <div className='meet-me__bio'>
            <p>
              I'm a <strong>Full-Stack Developer</strong> and <strong>AI Engineer</strong> who
              designs end-to-end products — from React frontends and Node.js APIs to cloud
              infrastructure and databases. I take ownership of the full stack, not just slices of it.
            </p>
            <p>
              On the AI side, I build <strong>agentic pipelines</strong> — RAG architectures,
              multi-agent orchestration, and LLM integrations that power real-world intelligent
              products. I don't bolt AI onto software; I design systems where intelligence is the core.
            </p>
            <p>
              I thrive where precision meets ambition — high-performing teams, hard problems, and
              products that leave a mark.
            </p>
          </div>

          {/* Specialization tags */}
          <div className='meet-me__spec'>
            <span className='meet-me__spec-label'>// Specialization</span>
            <div className='meet-me__tags'>
              {specializations.map((s) => (
                <span key={s} className='meet-me__tag'>{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MeetMe