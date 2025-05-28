// Import images
import project1Image from './assets/projects/faithexplorers.png'
import project2Image from './assets/projects/project2.png'
import project3Image from './assets/projects/background1.jpg'
// import project2Image from './assets/projects/project2.png'// You can import more images if needed:
import project7Image from './assets/projects/purposeacademy.png'
// import project3Image from './assets/projects/project3.png'
import project4Image from './assets/projects/aptechbenin.png'
import project10Image from './assets/projects/anchorport.png'
import project11Image from './assets/projects/abby.png'
import project12Image from './assets/projects/chimjoy.png'


// ----- HEADER -----
const header = {
  homepage: 'https://github.com/DuoDduo',
  title: 'BJ.',
};

// ----- ABOUT -----
const about = {
  name: 'Blessing James',
  role: 'Software Developer & Designer',
  description: `I love blending coding, design, and creativity to build outstanding digital experiences.`,
 
  resume: 'https://drive.google.com/file/d/1ZGps9neH8iYVi3jTDizV83yZtSM9bSxt/view?usp=sharing',
  social: {
    linkedin: 'https://www.linkedin.com/in/dblessingjames',
    github: 'https://github.com/DuoDduo',
     behance: 'https://www.behance.net/blessing_james',
  },
};

const projects = [
  // --- WEB PROJECTS ---
  {
    name: 'Faith Explorers',
    description: 'A Christian blog website',
    stack: ['HTML', 'CSS', 'JAVASCRIPT'],
    sourceCode: 'https://github.com/DuoDduo/faith-explorers',
    livePreview: 'https://duodduo.github.io/faith-explorers/',
    category: 'Web',
    image: project1Image,
  },
  {
    name: 'Aptech Benin',
    description: 'Official website repository of Aptech Benin',
    stack: ['HTML', 'CSS', 'JS', 'Bootstrap'],
    sourceCode: 'https://github.com',
    livePreview: 'https://duodduo.github.io/aptech-benin/',
    category: 'Web',
    image: project4Image,
  },
  {
    name: 'Purpose Academy',
    description: 'School of Purpose ministry official website',
    stack: ['React', 'Tailwind', 'React'],
    sourceCode: 'https://github.com/DuoDduo/Purpose-Academy',
    livePreview: 'https://www.schoolofpurpose-sop.com/',
    category: 'Web',
    image: project7Image,
  },
  {
    name: 'Anchor Port',
    description: 'Designed for a restaurant, bar and lounge company',
    stack: ['HTML', 'CSS', 'JS', 'SCSS'],
    sourceCode: 'https://github.com/DuoDduo/anchorport',
    livePreview: 'https://duodduo.github.io/anchorport/',
    category: 'Web',
    image: project10Image,
  },
  {
    name: "Abby's Kitchen",
    description: "Abby's kitchen is a very dynamic Restaurant website",
    stack: ['HTML', 'CSS', 'Angular', 'JS'],
    sourceCode: 'https://github.com/DuoDduo/abby-s-kitchen',
    livePreview: 'https://duodduo.github.io/abby-s-kitchen/#/main',
    category: 'Web',
    image: project11Image,
  },
  {
    name: 'Chimjoy',
    description: 'Chimjoy is a website where you can book a ride or rent a car',
    stack: ['HTML', 'CSS', 'JS'],
    sourceCode: 'https://github.com/DuoDduo/Chimjoy-Projectn',
    livePreview: 'https://duodduo.github.io/Chimjoy-Project/dashboard.html',
    category: 'Web',
    image: project12Image,
  },

  // --- GRAPHICS PROJECTS ---
  {
    name: 'Project 2',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Photoshop', 'Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project3Image,
  },
  {
    name: 'Project 5',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Photoshop', 'Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project3Image,
  },
  {
    name: 'Project 8',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Photoshop', 'Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project3Image,
  },

  // --- UI/UX PROJECTS ---
  {
    name: 'Project 3',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Figma'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'UI/UX',
    image: project2Image,
  },
  {
    name: 'Project 6',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Figma', 'Adobe XD'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'UI/UX',
    image: project2Image,
  },
  {
    name: 'Project 9',
    description: 'Amet asperiores et impedit aliquam consectetur?',
    stack: ['Figma', 'Adobe XD'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'UI/UX',
    image: project2Image,
  },
];


// ----- SKILLS -----
const skills = [
  'JavaScript',
  'React',
  'Flutter',
  'Python',
  'Git and Github',
  'Figma',
  'Photoshop',
  'Illustrator',
];

// ----- CONTACT -----
const contact = {
  email: 'pelubs2956@mail.com',
};

// Export all data
export { header, about, projects, skills, contact };
