import {
  About, Contact, Experience, GitHubSection, MoreWork, SiteFooter, SiteHeader, Work,
} from './sections/Sections';
import Hero from './sections/Hero';
import SceneBackdrop from './sections/SceneBackdrop';
import { useCursorGlow, useScrollReveals } from './motion/motion';

const App = () => {
  useScrollReveals();
  useCursorGlow();

  return (
    <>
      <a href='#main' className='skip-link'>Skip to content</a>
      <SceneBackdrop />
      <SiteHeader />
      <main id='main'>
        <span id='top' />
        {/* Full-bleed hero sits outside the width-limited page column */}
        <Hero />
        <div className='page'>
          <About />
          <Work />
          <Experience />
          <MoreWork />
          <GitHubSection />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
