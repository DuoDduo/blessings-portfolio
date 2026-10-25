import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import MeetMe from './components/Meet/MeetMe';
import Projects from './components/Projects/Projects';
import GitHubStats from './components/Github/GitHubStats';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';

import './App.css';

const App = () => {
  return (
    <div id="top" className="app">
      {/* Immersive Top Header & Navigation */}
      <Header />

      {/* Main Single Page Document Flow */}
      <main className="main-content">
        <About />
        <MeetMe />
        <Projects />
        <GitHubStats />
        <Skills />
        <Contact />
      </main>

      {/* Floating Scroll Top Helper */}
      <ScrollToTop />

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default App;
