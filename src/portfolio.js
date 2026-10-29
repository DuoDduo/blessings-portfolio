// All site content. Only state what a repo, README or notebook can back up.

import faithExplorersImage from './assets/projects/faithexplorers.webp'
import helplineImage from './assets/projects/project2.webp'
import teensYouthImage from './assets/projects/teensandyouth.webp'
import flyer2Image from './assets/projects/flyer2.webp'
import purposeAcademyImage from './assets/projects/purposeacademy.webp'
import followersImage from './assets/projects/Followers.webp'
import aptechBeninImage from './assets/projects/aptechbenin.webp'
import maycpcImage from './assets/projects/maycpc.webp'
import flyerImage from './assets/projects/flyer.webp'
import singlesMarriedImage from './assets/projects/singlesmarried.webp'
import abbyImage from './assets/projects/abby.webp'
import chimjoyImage from './assets/projects/chimjoy.webp'
import cartoon1Image from './assets/projects/cartoon1.webp'
import cartoon2Image from './assets/projects/cartoon2.webp'
import cartoon3Image from './assets/projects/cartoon3.webp'
import anchorPortImage from './assets/projects/anchorport.webp'
import devConnectImage from './assets/projects/devconnect.webp'
import babyHubImage from './assets/projects/babyhub.webp'
import visionLetterImage from './assets/projects/visionletter.webp'
import frutajugoImage from './assets/projects/frutajugo.webp'
import sabilensImage from './assets/projects/sabilens.svg'
import taxpyreImage from './assets/projects/taxpyre.svg'
import breastCancerImage from './assets/projects/breastcancer.svg'
import sentinnelImage from './assets/projects/sentinnel.svg'
import e1netImage from './assets/projects/e1net.svg'
import wineLoanImage from './assets/projects/wineloan.svg'
import habitTrackerImage from './assets/projects/habittracker.svg'

// All wording below comes from the CV (public/Blessing_James_CV.pdf).
// e1NET and TaxPyre are not on the CV and keep their own short lines.

// ----- ABOUT -----
const about = {
  name: 'Blessing James',
  title: ['AI/ML Engineer', 'Full-Stack Developer'],
  summary: 'Building intelligent, production-ready systems that solve real-world problems.',
  bio: [
    'Results-driven AI Engineer and Full-Stack Developer. I specialise in Agentic RAG architectures, multi-agent orchestration and end-to-end LLM integration, bringing together the full stack from data pipelines to scalable web deployments.',
    'Equally at home across the full machine learning lifecycle, from exploratory data analysis and feature engineering to model training, evaluation and production deployment.',
  ],
  // Served from public/; replace that file to update the CV
  resume: '/Blessing_James_CV.pdf',
  social: {
    github: 'https://github.com/DuoDduo',
    linkedin: 'https://www.linkedin.com/in/blessing-james-6b541829b/',
    behance: 'https://www.behance.net/blessing_james',
  },
}

// ----- SKILLS (the four groups on the CV) -----
const pillars = [
  {
    title: 'AI Engineering',
    tags: ['Large Language Models (LLMs)', 'Agentic RAG', 'Multi-agent Systems', 'Transformer Models', 'Tool Integration', 'Prompt Engineering'],
  },
  {
    title: 'Machine Learning & Data Science',
    tags: ['Linear Algebra', 'Inferential Statistics', 'Scikit-learn', 'Pandas', 'Exploratory Data Analysis', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    title: 'Full-Stack Development',
    tags: ['Python (FastAPI)', 'Pydantic', 'OOP', 'JavaScript / TypeScript (React)', 'HTML5', 'CSS3', 'Tailwind CSS', 'RESTful APIs'],
  },
  {
    title: 'Data & Infrastructure',
    tags: ['Pinecone', 'ChromaDB', 'FAISS', 'MySQL', 'PostgreSQL', 'Supabase', 'Azure', 'Docker', 'CI/CD', 'Git / GitHub', 'Agile'],
  },
]

// ----- PROJECTS -----
// team: true marks group work; role says what I personally built.
const projects = [
  // --- AI/ML PROJECTS ---
  {
    name: 'e1NET',
    description: 'A compliance platform that checks a business\'s policy documents against Cyber Essentials and ISO 27001, and shows what to fix first.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI API', 'Next.js', 'Auth0', 'Azure', 'GitHub Actions'],
    livePreview: 'https://www.e1net.org/',
    category: 'AI/ML',
    image: e1netImage,
  },
  {
    name: 'SabiLens',
    description: 'AI-powered NAFDAC food product counterfeit detection. I designed and built the Regulatory RAG module and a ReAct verification agent, and cut scan latency from about 5 minutes to under 300 ms.',
    stack: ['Python', 'FastAPI', 'ResNet50', 'PaddleOCR', 'ChromaDB', 'React', 'Google Cloud'],
    livePreview: 'https://sabi-lens.vercel.app/',
    category: 'AI/ML',
    team: true,
    role: 'Regulatory RAG',
    image: sabilensImage,
  },
  {
    name: 'TaxPyre Nigeria',
    description: "A RAG assistant that answers questions about Nigeria's 2026 tax reforms, with sources.",
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React', 'Docker'],
    category: 'AI/ML',
    image: taxpyreImage,
  },
  {
    name: 'Breast Cancer Prediction',
    description: 'An end-to-end ML pipeline using scikit-learn and FastAPI to predict diagnostic outcomes with high precision.',
    stack: ['Python', 'scikit-learn', 'pandas', 'FastAPI', 'React', 'Tailwind CSS'],
    category: 'AI/ML',
    image: breastCancerImage,
  },
  {
    name: 'Sentinel Banking',
    description: 'AI-driven middleware intelligence system. I built the RAG policy grounding layer that anchors every agent decision to verified banking policy documents, and contributed to the backend AI services and React dashboard.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'scikit-learn', 'PostgreSQL', 'React'],
    category: 'AI/ML',
    team: true,
    role: 'Fullstack AI Engineer',
    image: sentinnelImage,
  },
  {
    name: 'White Wine Quality & Loan Prediction',
    description: 'Regression and classification models, built on extensive EDA and feature engineering, to automate quality scoring and loan eligibility assessment.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'FastAPI', 'React'],
    category: 'AI/ML',
    image: wineLoanImage,
  },
  {
    name: 'HabitOS',
    description: 'A full-stack habit tracker with an object-oriented Flask API, functional-style analytics for streaks and history, and a React dashboard. Tested with pytest.',
    stack: ['Python', 'Flask', 'SQLAlchemy', 'Pydantic', 'pytest', 'React', 'Tailwind CSS'],
    livePreview: 'https://habit-tracker-olive-six.vercel.app/',
    category: 'Full-Stack',
    image: habitTrackerImage,
  },

  // --- WEB PROJECTS ---
  {
    name: 'Vision Letter 2026',
    description: 'A New Year vision-letter site with canvas-based animation.',
    stack: ['React', 'HTML5 Canvas', 'Framer Motion'],
    livePreview: 'https://new-year-one-murex.vercel.app/',
    category: 'Web',
    image: visionLetterImage,
  },
  {
    name: 'Frutajugo',
    description: 'A responsive React website for the Frutajugo brand.',
    stack: ['React', 'JavaScript', 'CSS'],
    livePreview: 'https://www.frutajugo.com/',
    category: 'Web',
    image: frutajugoImage,
  },
  {
    name: 'Faith Explorers',
    description: 'A Christian blog built with semantic, search-friendly HTML.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    livePreview: 'https://duodduo.github.io/faith-explorers/',
    category: 'Web',
    image: faithExplorersImage,
  },
  {
    name: 'Aptech Benin',
    description: "Website for Aptech's training centre in Benin City, Edo State.",
    stack: ['HTML', 'SCSS', 'JavaScript', 'Bootstrap'],
    livePreview: 'https://duodduo.github.io/aptech-benin/',
    category: 'Web',
    image: aptechBeninImage,
  },
  {
    name: 'School of Purpose',
    description: 'Community portal and digital library for a ministry school, with a custom media player.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    livePreview: 'https://schoolofpurpose.vercel.app/',
    category: 'Web',
    image: purposeAcademyImage,
  },
  {
    name: 'Anchor Port',
    description: 'Website for a restaurant and lounge.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    livePreview: 'https://duodduo.github.io/anchorport/',
    category: 'Web',
    image: anchorPortImage,
  },
  {
    name: "Abby's Kitchen",
    description: 'Restaurant site with a menu, ordering and payment flow.',
    stack: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    livePreview: 'https://duodduo.github.io/abby-s-kitchen/#/main',
    category: 'Web',
    image: abbyImage,
  },
  {
    name: 'Chimjoy',
    description: 'Ride booking and car rental site with a booking dashboard.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    livePreview: 'https://duodduo.github.io/Chimjoy-Project/dashboard.html',
    category: 'Web',
    image: chimjoyImage,
  },

  // --- UI/UX PROJECTS ---
  {
    name: 'Helpline',
    description: 'Website interface for an NGO.',
    stack: ['Figma'],
    category: 'UI/UX',
    image: helplineImage,
  },
  {
    name: 'DevConnect',
    description: 'Mobile app interface for connecting developers around the world.',
    stack: ['Figma'],
    livePreview: 'https://embed.figma.com/proto/7cXMdiuDRUA7kCCn1CQ6A0/BabyHub?page-id=0%3A1&node-id=27-2457&p=f&viewport=188%2C263%2C0.5&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&embed-host=share',
    category: 'UI/UX',
    image: devConnectImage,
  },
  {
    name: 'BabyHub',
    description: 'Mobile shopping app interface for infant products.',
    stack: ['Figma'],
    category: 'UI/UX',
    image: babyHubImage,
  },

  // --- GRAPHICS PROJECTS ---
  { name: 'Followers milestone', description: 'Post celebrating LinkedIn followers.', stack: ['Photoshop'], category: 'Graphics', image: followersImage },
  { name: 'Social media flyer', description: 'Event flyer for social media.', stack: ['Photoshop'], category: 'Graphics', image: flyer2Image },
  { name: 'Singles and married', description: 'Event flyer.', stack: ['Photoshop', 'Illustrator'], category: 'Graphics', image: singlesMarriedImage },
  { name: 'Teens and youth', description: 'Event flyer.', stack: ['Photoshop'], category: 'Graphics', image: teensYouthImage },
  { name: 'Children and teenagers', description: 'Event flyer.', stack: ['Photoshop'], category: 'Graphics', image: maycpcImage },
  { name: 'Delivery', description: 'Delivery service flyer.', stack: ['Photoshop', 'Illustrator'], category: 'Graphics', image: flyerImage },
  { name: 'Cartoon 1', description: 'Character illustration.', stack: ['Illustrator'], category: 'Graphics', image: cartoon1Image },
  { name: 'Cartoon 2', description: 'Character illustration.', stack: ['Illustrator'], category: 'Graphics', image: cartoon2Image },
  { name: 'Cartoon 3', description: 'Character illustration.', stack: ['Illustrator'], category: 'Graphics', image: cartoon3Image },
]

// ----- EXPERIENCE (word for word from the CV, in CV order) -----
const experience = [
  {
    when: '08/2025 – 02/2026',
    title: 'AI Engineer Trainee',
    org: 'Ogun State GenAI Fellowship (Publica Academy)',
    points: [
      'Architected multi-agent systems with LangGraph for autonomous task decomposition and collaboration in enterprises.',
      'Machine Learning: Engineered and evaluated models from mathematical principles to building and deployment.',
      'Production RAG Pipelines: Created RAG systems using semantic chunking and vector embeddings. Reduced hallucination rates in document intelligence.',
      'Type-Safe Backends: Developed robust, high-concurrency APIs using FastAPI and Pydantic, ensuring production-grade data validation and seamless LLM integration.',
    ],
  },
  {
    when: '08/2024 – 02/2025',
    title: 'Cyber Risk Analyst Intern',
    org: 'Chevron',
    points: [
      'Risk Mitigation: Analyzed phishing reports identifying vulnerabilities. Delivered insights to strengthen security.',
      'Disaster Recovery & BCP: Validated effectiveness of protocols and plans via enterprise recovery exercises.',
      'Compliance & Privacy: Engaged in Data Privacy Audit walkthroughs, ensuring strict compliance with global regulations and reinforcing cybersecurity best practices for sensitive corporate data.',
    ],
  },
  {
    when: '11/2024 – Present',
    title: 'Web Developer',
    org: 'School of Purpose',
    points: [
      'Developed high-performance web apps; built admin dashboard for data-driven management.',
      'Optimized frontend performance for low-latency interaction with complex, AI-driven backend logic.',
    ],
  },
  {
    when: '09/2024 – 11/2024',
    title: 'Technical Instructor',
    org: 'Aptech Computer Education',
    points: [
      'Mentored students in Object-Oriented Programming (OOP), Database Management, and Software Engineering fundamentals.',
    ],
  },
  {
    when: '09/2023 – 09/2024',
    title: 'Front-End Developer',
    org: 'JEXCEL TECH',
    points: [
      'Built modular React components for enterprise apps.',
      'Ensured cross-platform usability and code maintainability.',
    ],
  },
]

// ----- EDUCATION (from my CV) -----
const education = [
  { title: 'B.Sc. in Data Science', org: 'IU International University of Applied Sciences, Germany' },
  { when: '2022 – 2024', title: 'Advanced Diploma in Software Engineering (ADSE)', org: 'Aptech Computer Education' },
  { when: '2021 – 2022', title: 'Diploma in Graphic Design', org: 'Aptech Computer Education' },
]

// ----- CONTACT -----
const contact = {
  email: 'pelubs2956@gmail.com',
}

export { about, pillars, projects, experience, education, contact }
