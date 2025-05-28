import React from 'react'
import './MeetMe.css'
import profilePic from '../../assets/profile.jpg' // Replace with actual image path

const Meetme = () => {
  return (
    <section id='meet' className='section'>
      <h2 className='section__title'>Meet Me</h2>

      <div className='meet-me center glass'>
        <img src={profilePic} alt='Blessing James' className='meet-me__img' />

            <div className='meet-me__text'>
                <p>
                    I'm a <strong>Software Engineer</strong> with a passion for building scalable, robust, and user-focused applications. I enjoy crafting simple yet elegant solutions — experiences that not only look great, but are thoughtfully engineered for performance, functionality, and usability.
                </p>
                <p>
                    Driven by curiosity and a growth mindset, I continuously seek to expand my skill set, embrace new challenges, and explore emerging technologies to deliver more impactful solutions.
                </p>
                <p>
                    I thrive in collaborative, high-performing teams where clear communication, shared vision, and strong ownership are valued. I believe the best products are born from collective creativity and purposeful collaboration.
                </p>
                <p>
                    I'm always open to connecting with like-minded individuals, exploring new opportunities, and working on exciting projects. 
                </p>
            </div>

      </div>
    </section>
  )
}

export default Meetme
