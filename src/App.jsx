import {
  About, Contact, GitHubSection, Hero, MoreWork, SiteFooter, SiteHeader, Work,
} from './sections/Sections';
import { useCursorGlow, useScrollReveals } from './motion/motion';

const App = () => {
  useScrollReveals();
  useCursorGlow();

  return (
    <>
      <a href='#main' className='skip-link'>Skip to content</a>
      <SiteHeader />
      <main id='main' className='page'>
        <span id='top' />
        <Hero />
        <Work />
        <About />
        <MoreWork />
        <GitHubSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
