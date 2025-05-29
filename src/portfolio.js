// Import images
import project1Image from './assets/projects/faithexplorers.png'
import project2Image from './assets/projects/project2.png'
import project3Image from './assets/projects/teensandyouth.jpg'
import project6Image from './assets/projects/flyer2.jpg'// You can import more images if needed:
import project7Image from './assets/projects/purposeacademy.png'
import project5Image from './assets/projects/Followers.jpg'
import project4Image from './assets/projects/aptechbenin.png'
import project8Image from './assets/projects/maycpc.jpg'
import project9Image from './assets/projects/flyer.jpg'
import project10Image from './assets/projects/singlesmarried.jpg'
import project11Image from './assets/projects/abby.png'
import project12Image from './assets/projects/chimjoy.png'
import project13Image from './assets/projects/cartoon1.jpg'
import project14Image from './assets/projects/cartoon2.jpg'
import project15Image from './assets/projects/cartoon3.jpg'
import project16Image from './assets/projects/anchorport.png'
import project17Image from './assets/projects/devconnect.png'
import project18Image from './assets/projects/babyhub.png'


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
    image: project16Image,
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
    name: 'Followers',
    description: 'Celebrating LinkedIn followers',
    stack: ['Photoshop'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project5Image,
  },
  {
    name: "Flyer",
    description: 'Social Media flyer',
    stack: ['Photoshop'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project6Image,
  },
  {
    name: 'Flyer',
    description: 'Singles and Married flyer',
    stack: ['Photoshop', 'Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project10Image,
  },
   {
    name: 'Flyer',
    description: 'Teens & Youth',
    stack: ['Photoshop'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project3Image,
  },
  {
    name: "Flyer",
    description: 'Children/Teenagers',
    stack: ['Photoshop'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project8Image,
  },
  {
    name: 'Flyer',
    description: 'Delivery',
    stack: ['Photoshop', 'Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project9Image,
  },
   {
    name: 'Cartoon',
    description: 'Cartoon 1',
    stack: ['Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project13Image,
  },
  {
    name: "Cartoon",
    description: 'Cartoon 2',
    stack: ['Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project14Image,
  },
  {
    name: 'Cartoon',
    description: 'Cartoon 3',
    stack: ['Illustrator'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    category: 'Graphics',
    image: project15Image,
  },

  // --- UI/UX PROJECTS ---
  {
    name: 'Helpline',
    description: 'An NGO website UI',
    stack: ['Figma'],
    sourceCode: '#',
    livePreview: '#',
    category: 'UI/UX',
    image: project2Image,
  },
  {
    name: 'DevConnect',
    description: 'Career Quest Project: UI for mobile app that connect developers around the world',
    stack: ['Figma'],
    sourceCode: '#',
    livePreview: 'https://embed.figma.com/proto/7cXMdiuDRUA7kCCn1CQ6A0/BabyHub?page-id=0%3A1&node-id=27-2457&p=f&viewport=188%2C263%2C0.5&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&embed-host=share ',
    category: 'UI/UX',
    image: project17Image,
  },
  {
    name: 'BabyHub',
    description: 'A mobile app UI solely for infant products',
    stack: ['Figma'],
    sourceCode: '#',
    livePreview: '#',
    category: 'UI/UX',
    image: project18Image,
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
