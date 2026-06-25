export const meta = {
  name: "Muhammad Zaigham Asif",
  title: "Software Engineer",
  subtitle:
    "I help businesses and startups build modern websites, web applications, and AI-powered solutions. Whether it's a responsive React website, a custom MERN application, or an intelligent AI assistant, I focus on delivering solutions that are fast, scalable, and easy to use. My technical expertise includes React, Node.js, Express, MongoDB, Python, and AI technologies such as Natural Language Processing. I am passionate about transforming ideas into digital products that create real value for users and organizations.",
  email: "zaighamasif06@gmail.com",
  phone: "+92 317 4104187",
  location: "Lahore, Pakistan",
  linkedin: "https://linkedin.com/in/zaigham-asif-5a5499240",
  github: "https://github.com/MuhammadZaighamAsif",
};

export const skills = [
  {
    category: "Programming Languages",
    items: ["C", "C++", "C#", "Java", "JavaScript", "Python", "x86 Assembly"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Flask"],
  },
  {
    category: "AI / Data",
    items: ["NumPy", "Pandas", "Scikit-learn", "NLP", "BERT"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "React.js", "Vite"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "SQL Server"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Windows Forms"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Zikr AI — Islamic NLP Chatbot",
    description:
      "An AI-powered chatbot using Retrieval-Augmented Generation (RAG) to answer Islamic queries with explainable AI responses, dynamic query weighting, and a Flask-based API with interactive frontend.",
    tags: ["Python", "Flask", "FAISS", "sentence-transformers", "NLP", "JavaScript"],
    github: "https://github.com/MuhammadZaighamAsif/ZikrAi.git",
    live: "",
    featured: true,
    highlights: [
      "Implemented FAISS + sentence-transformers for semantic search with hybrid retrieval (TF-IDF + keyword fusion)",
      "Designed dynamic query weighting to improve answer relevance and accuracy",
      "Built Flask-based API with an interactive frontend (dark mode, readability controls, source transparency)",
      "Enabled explainable AI responses by showing retrieved sources and context chunks",
    ],
  },
  {
    id: 2,
    title: "AutoSphere — Automotive Marketplace",
    description:
      "A full-stack automotive marketplace and service platform connecting buyers, sellers, and service providers with real-time listings and seamless user experience.",
    tags: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/AbubakarAfzal643/AutoSphere_v2.git",
    live: "https://auto-sphere-v2-az.vercel.app",
    featured: true,
    highlights: [
      "Built responsive React + Vite frontend for fast user experience",
      "Designed RESTful API with Node.js + Express for scalable backend",
      "Implemented MongoDB database for efficient vehicle and user data management",
      "Integrated real-time search and filtering for automotive listings",
    ],
  },
  {
    id: 3,
    title: "TalentMiner: AI Resume–Job Description Matcher",
    description:
      "An NLP-based system to match resumes with job descriptions using semantic similarity via BERT, improving matching accuracy compared to keyword-based approaches.",
    tags: ["Python", "Flask", "NLP", "BERT"],
    github: "https://github.com/MuhammadZaighamAsif/TalentMiner.git",
    live: "",
    featured: true,
    highlights: [
      "Implemented semantic similarity using BERT / NLP techniques",
      "Improved matching accuracy compared to keyword-based approaches",
    ],
  },
  {
    id: 4,
    title: "ResQ Disaster Management System",
    description:
      "A full-stack platform connecting donors, victims, and volunteers during disasters, achieving 85% matching accuracy with optimized data handling.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/MuhammadZaighamAsif/Disaster-Management-System.git",
    live: "",
    featured: true,
    highlights: [
      "Led a team of 6, improving assistance response time by 30%",
      "Achieved 85% matching accuracy using optimized data handling",
    ],
  },
  {
    id: 5,
    title: "Software House Project Tracker",
    description:
      "A comprehensive MERN stack project management system for tracking software development projects, tasks, team members, and deadlines with real-time updates.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/MuhammadZaighamAsif/Software-House-Project-Tracker.git",
    live: "",
    featured: false,
    highlights: [
      "Developed full-stack solution for project and task management",
      "Implemented real-time project tracking and team collaboration features",
      "Built role-based access control for different user types",
    ],
  },
  {
    id: 6,
    title: "Pong Assembly Game",
    description:
      "A classic Pong game implementation written in x86 assembly language for DOS environment, featuring two-player paddle controls, ball physics, and a scoring system.",
    tags: ["x86 Assembly", "DOS", "Low-level Programming"],
    github: "https://github.com/RanaAbdulHannan/ping_assembly.git",
    live: "",
    featured: false,
    highlights: [
      "Implemented game physics and collision detection in assembly language",
      "Developed real-time two-player control system",
      "Designed scoring system and game state management at hardware level",
    ],
  },
  {
    id: 7,
    title: "Energy Scheduling System",
    description:
      "A Windows Forms application for managing and optimizing energy consumption schedules, helping organizations track and reduce energy costs through smart scheduling.",
    tags: ["C#", "Windows Forms", ".NET", "SQL Server"],
    github: "https://github.com/ahmadbuilds/Energy-Consumption-System.git",
    live: "",
    featured: false,
    highlights: [
      "Built intuitive Windows Forms interface for energy management",
      "Implemented scheduling algorithms for optimal energy usage",
      "Integrated database for historical data tracking and analysis",
    ],
  },
  {
    id: 8,
    title: "Warehouse Management System",
    description:
      "A web-based inventory system for real-time stock and supplier management with a scalable database structure, improving inventory update efficiency by 40%.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/RanaAbdulHannan/warehouse_management.git",
    live: "",
    featured: false,
    highlights: [
      "Improved inventory update efficiency by 40%",
      "Designed scalable database structure for optimized performance",
    ],
  },
];

export const experience = [
  {
    role: "Front End Developer",
    company: "Developers Hub Corporation",
    type: "Internship",
    duration: "12/2025 – 01/2026",
    bullets: [
      "Developed responsive web interfaces using React, HTML, CSS, and JavaScript",
      "Improved page load performance by 25%",
    ],
  },
  {
    role: "Team Lead (Academic Project)",
    company: "FAST NUCES",
    type: "Academic",
    duration: "02/2025 – 05/2025",
    bullets: [
      "Led a team of 6 to design and develop a disaster management system",
      "Improved system efficiency and response time by 30%",
      "Managed task distribution and coordinated development workflow",
    ],
  },
];

export const education = [
  {
    degree: "BS Software Engineering",
    institution: "FAST-NUCES",
    location: "Lahore",
    duration: "08/2023 – 06/2027",
    description: "Pursuing a Bachelor's in Software Engineering with focus on full-stack development, AI systems, and scalable architectures.",
  },
  {
    degree: "Intermediate in Computer Science (ICS)",
    institution: "Punjab College",
    location: "Lahore",
    duration: "11/2021 – 05/2023",
    description: "Completed Intermediate with a specialization in Computer Science.",
  },
];

export const certificates = [
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google",
    platform: "Coursera",
    date: "July 2025",
    credentialUrl: "",
  },
  {
    title: "Play It Safe: Manage Security Risks",
    issuer: "Google",
    platform: "Coursera",
    date: "July 2025",
    credentialUrl: "",
  },
  {
    title: "Java for Android",
    issuer: "Vanderbilt University",
    platform: "Coursera",
    date: "July 2025",
    credentialUrl: "",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    platform: "Coursera",
    date: "November 2025",
    credentialUrl: "",
  },
];
