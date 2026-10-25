import {
  About, Contact, Experience, GitHubSection, Hero, MoreWork, SiteFooter, SiteHeader, Work,
} from './sections/Sections';
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
      <main id='main' className='page'>
        <span id='top' />
        <Hero />
        <About />
        <Work />
        <Experience />
        <MoreWork />
        <GitHubSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
