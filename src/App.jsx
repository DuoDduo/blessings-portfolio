import {
  About, Contact, GitHubSection, Hero, MoreWork, SiteFooter, SiteHeader, Work,
} from './sections/Sections';

const App = () => (
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

export default App;
