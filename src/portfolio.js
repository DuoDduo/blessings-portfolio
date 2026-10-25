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
import e1netImage from './assets/projects/e1net.webp'

// ----- ABOUT -----
const about = {
  name: 'Blessing James',
  role: 'Full-stack developer and AI/ML engineer',
  tagline: 'I build intelligent products end to end, and I make the AI accountable.',
  bio: [
    "I'm Blessing, a full-stack developer and AI/ML engineer. I build products end to end: React front ends, FastAPI and Flask back ends, and the machine learning and LLM systems inside them.",
    'I care most about AI that people can trust. On Sentinnel Banking I built the RAG layer that checks every agent decision against written policy. On TaxPyre, every answer cites the passages it came from.',
    'I trained as an AI engineer in the Ogun State GenAI Fellowship with Publica Academy, where I built team capstones such as Sentinnel Banking and SabiLens.',
  ],
  // Served from public/; replace that file to update the CV
  resume: '/Blessing_James_CV.pdf',
  social: {
    github: 'https://github.com/DuoDduo',
    linkedin: 'https://www.linkedin.com/in/dblessingjames',
    behance: 'https://www.behance.net/blessing_james',
  },
}

// ----- PILLARS (replace the old skills list; every tag is used in a repo) -----
const pillars = [
  {
    title: 'Intelligence',
    proof: 'Retrieval over real documents with pgvector and ChromaDB, LLM drafting behind rule-based checks, multi-agent orchestration with LangGraph, and classic ML for classification and risk scoring.',
    tags: ['OpenAI API', 'pgvector', 'LangGraph', 'LangChain', 'ChromaDB', 'scikit-learn', 'pandas'],
  },
  {
    title: 'Product',
    proof: 'Full-stack apps from the database schema to the interface: Next.js and React front ends on Python APIs, with proper sign-in and roles.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Auth0'],
  },
  {
    title: 'Production',
    proof: 'Work that ships: e1NET deploys to Azure through GitHub Actions with malware scanning on every upload, and my habit tracker runs 29 passing tests.',
    tags: ['Azure', 'Docker', 'GitHub Actions', 'pytest', 'Vercel'],
  },
]

// ----- PROJECTS -----
// team: true marks group work; role says what I personally built.
const projects = [
  // --- AI/ML PROJECTS ---
  {
    name: 'e1NET',
    description: 'Compliance that small businesses can actually do. e1NET checks the policies a business already keeps against Cyber Essentials and ISO 27001: it finds the relevant passages, drafts each assessment with AI, and lets versioned rules, not the model, decide what counts as met. Every finding links to its evidence and lands in an audit trail.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI API', 'Next.js', 'Auth0', 'Azure', 'GitHub Actions'],
    note: 'Private repository. Walkthrough on request.',
    category: 'AI/ML',
    image: e1netImage,
  },
  {
    name: 'SabiLens',
    description: 'Checks whether a product is genuine from a photo of its label. A ResNet50 vision model and PaddleOCR read the packaging, then an LLM agent checks it against the NAFDAC registry and returns a verdict in under 5 seconds.',
    stack: ['Python', 'FastAPI', 'ResNet50', 'PaddleOCR', 'ChromaDB', 'React', 'Google Cloud'],
    sourceCode: 'https://github.com/Cunyie08/genai_sabilens_national_product_integrity',
    livePreview: 'https://sabi-lens.vercel.app/',
    category: 'AI/ML',
    team: true,
    image: sabilensImage,
  },
  {
    name: 'TaxPyre Nigeria',
    description: "A RAG assistant that answers questions about Nigeria's 2026 tax reforms in plain language. It searches 152 chunks from 4 bills (500+ pages) and cites the passages behind every answer.",
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React', 'Docker'],
    sourceCode: 'https://github.com/DuoDduo/nigeria-tax-reform',
    category: 'AI/ML',
    image: taxpyreImage,
  },
  {
    name: 'Breast Cancer Classifier',
    description: 'Cleaning, EDA and feature selection on 569 tumour samples, then a tuned logistic regression served through FastAPI with a React front end. Test F1 0.991, with 97.7% of malignant cases correctly identified.',
    stack: ['Python', 'scikit-learn', 'pandas', 'FastAPI', 'React', 'Tailwind CSS'],
    sourceCode: 'https://github.com/DuoDduo/ml_projects/tree/master/breast_cancer',
    category: 'AI/ML',
    image: breastCancerImage,
  },
  {
    name: 'Sentinnel Banking',
    description: 'Three LangGraph agents route complaints across 15+ categories, score fraud risk and recommend products. Policy engines make every decision, a random forest only raises risk sensitivity, and LLMs only write audit-ready explanations. I built the RAG layer that checks each decision against 6 policy documents.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'scikit-learn', 'PostgreSQL', 'React'],
    sourceCode: 'https://github.com/DuoDduo/genai_sentinnel_banking_integration',
    category: 'AI/ML',
    team: true,
    role: 'RAG engineer',
    image: sentinnelImage,
  },

  // --- WEB PROJECTS ---
  {
    name: 'Vision Letter 2026',
    description: 'A New Year vision-letter site with canvas-based animation.',
    stack: ['React', 'HTML5 Canvas', 'Framer Motion'],
    sourceCode: 'https://github.com/DuoDduo/new_year',
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
    sourceCode: 'https://github.com/DuoDduo/faith-explorers',
    livePreview: 'https://duodduo.github.io/faith-explorers/',
    category: 'Web',
    image: faithExplorersImage,
  },
  {
    name: 'Aptech Benin',
    description: "Website for Aptech's training centre in Benin City, Edo State.",
    stack: ['HTML', 'SCSS', 'JavaScript', 'Bootstrap'],
    sourceCode: 'https://github.com/DuoDduo/aptech-benin',
    livePreview: 'https://duodduo.github.io/aptech-benin/',
    category: 'Web',
    image: aptechBeninImage,
  },
  {
    name: 'School of Purpose',
    description: 'Community portal and digital library for a ministry school, with a custom media player.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    sourceCode: 'https://github.com/DuoDduo/Purpose-Academy',
    livePreview: 'https://schoolofpurpose.vercel.app/',
    category: 'Web',
    image: purposeAcademyImage,
  },
  {
    name: 'Anchor Port',
    description: 'Website for a restaurant and lounge.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    sourceCode: 'https://github.com/DuoDduo/anchorport',
    livePreview: 'https://duodduo.github.io/anchorport/',
    category: 'Web',
    image: anchorPortImage,
  },
  {
    name: "Abby's Kitchen",
    description: 'Restaurant site with a menu, ordering and payment flow.',
    stack: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    sourceCode: 'https://github.com/DuoDduo/abby-s-kitchen',
    livePreview: 'https://duodduo.github.io/abby-s-kitchen/#/main',
    category: 'Web',
    image: abbyImage,
  },
  {
    name: 'Chimjoy',
    description: 'Ride booking and car rental site with a booking dashboard.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    sourceCode: 'https://github.com/DuoDduo/Chimjoy-Project',
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

// ----- EXPERIENCE (from my CV) -----
const experience = [
  {
    when: '08/2025 – 02/2026',
    title: 'AI Engineer Trainee',
    org: 'Ogun State GenAI Fellowship (Publica Academy)',
    detail: 'Built multi-agent systems with LangGraph, production RAG pipelines with semantic chunking and vector embeddings, and type-safe FastAPI and Pydantic backends for LLM integration.',
  },
  {
    when: '11/2024 – now',
    title: 'Web Developer',
    org: 'School of Purpose',
    detail: 'Build and maintain the web apps, including an admin dashboard for data-driven management.',
  },
  {
    when: '08/2024 – 02/2025',
    title: 'Cyber Risk Analyst Intern',
    org: 'Chevron',
    detail: 'Analysed phishing reports to find vulnerabilities, validated disaster recovery and business continuity plans in enterprise exercises, and took part in data privacy audit walkthroughs.',
  },
  {
    when: '09/2024 – 11/2024',
    title: 'Technical Instructor',
    org: 'Aptech Computer Education',
    detail: 'Taught object-oriented programming, database management and software engineering fundamentals.',
  },
  {
    when: '09/2023 – 09/2024',
    title: 'Front-End Developer',
    org: 'JEXCEL TECH',
    detail: 'Built modular React components for enterprise apps, with a focus on cross-platform usability and maintainable code.',
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
  email: 'pelubs2956@mail.com',
}

export { about, pillars, projects, experience, education, contact }
