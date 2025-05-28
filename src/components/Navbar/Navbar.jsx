import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { projects, skills, contact } from '../../portfolio'
import './Navbar.css'

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false)

  const toggleNavList = () => setShowNavList(!showNavList)
  const closeNavList = () => setShowNavList(false)

  return (
    <>
      <nav className="center nav">
        <ul className={`nav__list ${showNavList ? 'open' : ''}`}>
          {skills.length > 0 && (
            <li className="nav__list-item">
              <a href="#meet" onClick={closeNavList} className="link link--nav">
                About
              </a>
            </li>
          )}
          {projects.length > 0 && (
            <li className="nav__list-item">
              <a href="#projects" onClick={closeNavList} className="link link--nav">
                Projects
              </a>
            </li>
          )}
          {skills.length > 0 && (
            <li className="nav__list-item">
              <a href="#skills" onClick={closeNavList} className="link link--nav">
                Skills
              </a>
            </li>
          )}
          {contact.email && (
            <li className="nav__list-item">
              <a href="#contact" onClick={closeNavList} className="link link--nav">
                Contact
              </a>
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={toggleNavList}
          className="btn btn--icon nav__hamburger"
          aria-label="toggle navigation"
          aria-expanded={showNavList}
        >
          {showNavList ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Overlay that covers screen when menu is open */}
      <div
        className={`nav__overlay ${showNavList ? 'visible' : ''}`}
        onClick={closeNavList}
        aria-hidden={!showNavList}
      />
    </>
  )
}

export default Navbar
