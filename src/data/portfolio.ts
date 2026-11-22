export type ProjectCategory = "Client Work" | "Full Stack" | "AI";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  /** Empty string when there is no public repository / deployment. */
  github: string;
  live: string;
  featured: boolean;
  category?: ProjectCategory;
  categories?: ProjectCategory[];
  thumbnail?: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/** Lucide fallback used when no brand logo is bundled for a tool (see src/data/brandIcons.ts). */
export type FallbackIcon =
  | "generic" | "design" | "mcp" | "balancer" | "cicd" | "agents" | "server" | "pullrequest" | "loop"
  | "memory" | "eval" | "guard" | "human" | "rag" | "brain" | "plug" | "code" | "database";

export type ToolCategory =
  | "Communication"
  | "Planning & Docs"
  | "Design"
  | "Development"
  | "DevOps"
  | "Cloud"
  | "AI"
  | "Agentic AI";

export interface ToolItem {
  name: string;
  category: ToolCategory;
  /** One line on what the tool is used for. */
  use: string;
  /** Brand colour, used as a soft tint for the tile. */
  hue: string;
  /** Shown in the collapsed "All" view. */
  featured?: boolean;
  /** Used when the tool has no brand logo. */
  fallback?: FallbackIcon;
}

export interface CloudProvider {
  name: string;
  summary: string;
  services: string[];
  /** Brand colour for the card tint. */
  hue: string;
}

export interface PipelineItem {
  name: string;
  fallback?: FallbackIcon;
}

export interface PipelineStage {
  title: string;
  caption: string;
  icon: "source" | "build" | "automate" | "deploy" | "operate" | "perceive" | "plan" | "act" | "reflect";
  tools: PipelineItem[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  type: "Internship" | "Academic" | "Full-time";
  duration: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  platform: string;
  date: string;
  /** Empty string when no public verification link exists. */
  credentialUrl: string;
}

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
  /** One-line value proposition shown in the hero (the long `subtitle` is used for SEO/About). */
  tagline: "I design and build fast, scalable web applications and AI-powered products.",
  availability: "Open to internships & collaborations",
  /** Profile photo (cropped head-and-shoulders, 4:5). Provide the WebP first, JPEG as fallback. */
  photo: {
    webp: "/profile.webp",
    webpSmall: "/profile-sm.webp",
    jpg: "/profile.jpg",
    width: 700,
    height: 875,
    alt: "Portrait of Muhammad Zaigham Asif",
  },
};

export const skills: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: ["C", "C++", "Java", "JavaScript", "SQL", "Python", "x86 Assembly"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Flask", "Django"],
  },
  {
    category: "AI / Data",
    items: ["NumPy", "Pandas", "Scikit-learn", "NLP", "BERT"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "Tailwind CSS", "React.js", "Vite"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "SQL Server"],
  },
  {
    category: "Tools",
    items: ["Git", "Linux", "GitHub", "VS Code", "Windows Forms"],
  },
  // DRAFT: review before publishing.
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "AWS", "GCP", "Nginx"],
  },
  {
    category: "Agentic AI",
    items: ["LLM Agents", "Tool Calling", "MCP", "LangChain", "RAG", "Multi-agent Systems"],
  },
];

/*
 * TOOLKIT & DEVOPS — DRAFT CONTENT. Review every line before publishing: keep only tools you genuinely use,
 * and edit the one-line descriptions so they match how you use them.
 */
/*
 * TOOLKIT, DEVOPS & AGENTIC AI — DRAFT CONTENT. Review every line before publishing: keep only what you
 * genuinely use, and edit the one-line descriptions so they match how you use each tool.
 * Brand logos come from src/data/brandIcons.ts (matched by tool name); anything without a logo uses `fallback`.
 */
export const tools: ToolItem[] = [
  // Communication
  { name: "Slack", category: "Communication", use: "Team chat, async updates and quick syncs.", hue: "#E01E5A", featured: true },
  { name: "Microsoft Teams", category: "Communication", use: "Meetings, channels and shared files.", hue: "#6264A7" },
  { name: "Discord", category: "Communication", use: "Community chat and pair-programming calls.", hue: "#5865F2" },
  { name: "Zoom", category: "Communication", use: "Video calls, demos and client meetings.", hue: "#2D8CFF" },
  { name: "Google Meet", category: "Communication", use: "Quick video calls and stand-ups.", hue: "#00897B" },
  // Planning & Docs
  { name: "Notion", category: "Planning & Docs", use: "Project wikis, specs and personal knowledge base.", hue: "#6B7280", featured: true },
  { name: "Linear", category: "Planning & Docs", use: "Issue tracking, sprints and roadmaps.", hue: "#5E6AD2", featured: true },
  { name: "Jira", category: "Planning & Docs", use: "Agile boards, backlogs and sprint planning.", hue: "#2684FF" },
  { name: "Trello", category: "Planning & Docs", use: "Lightweight kanban boards for small projects.", hue: "#0079BF" },
  { name: "Google Workspace", category: "Planning & Docs", use: "Docs, Sheets, Drive and Calendar.", hue: "#4285F4" },
  // Design
  { name: "Figma", category: "Design", use: "UI mock-ups, prototypes and design hand-off.", hue: "#F24E1E", featured: true },
  { name: "Canva", category: "Design", use: "Quick graphics, banners and social assets.", hue: "#00A8B5", fallback: "design" },
  // Development
  { name: "GitHub", category: "Development", use: "Repositories, pull requests and code review.", hue: "#6B7280", featured: true },
  { name: "Git", category: "Development", use: "Branching, rebasing and clean commit history.", hue: "#F05032" },
  { name: "VS Code", category: "Development", use: "Primary editor with linting and debugging.", hue: "#2F80ED", featured: true },
  { name: "Linux", category: "Development", use: "Daily shell, scripting and server work.", hue: "#D9A400" },
  { name: "Bash", category: "Development", use: "Automation scripts and command-line workflows.", hue: "#4EAA25" },
  { name: "Postman", category: "Development", use: "Testing and documenting REST APIs.", hue: "#FF6C37" },
  { name: "Swagger", category: "Development", use: "OpenAPI specs and interactive API docs.", hue: "#3F9F2E" },
  { name: "Chrome DevTools", category: "Development", use: "Debugging, profiling and performance audits.", hue: "#4285F4" },
  { name: "MongoDB Compass", category: "Development", use: "Exploring and querying MongoDB collections.", hue: "#3F9F3F" },
  { name: "npm", category: "Development", use: "Package management and project scripts.", hue: "#CB3837" },
  { name: "ESLint", category: "Development", use: "Static analysis and consistent code style.", hue: "#4B32C3" },
  // DevOps
  { name: "Docker Desktop", category: "DevOps", use: "Building and running containers locally.", hue: "#2496ED", featured: true },
  { name: "Docker Hub", category: "DevOps", use: "Publishing and pulling container images.", hue: "#2496ED" },
  { name: "Kubernetes", category: "DevOps", use: "Orchestrating, scaling and healing containers.", hue: "#326CE5", featured: true },
  { name: "Terraform", category: "DevOps", use: "Infrastructure as code for repeatable environments.", hue: "#844FBA", featured: true },
  { name: "GitHub Actions", category: "DevOps", use: "Automated build, test and deploy workflows.", hue: "#2088FF", featured: true },
  { name: "CI/CD Pipelines", category: "DevOps", use: "Continuous integration and delivery from commit to prod.", hue: "#0891B2", fallback: "cicd", featured: true },
  { name: "Load Balancer", category: "DevOps", use: "Spreading traffic across instances for availability.", hue: "#7C3AED", fallback: "balancer", featured: true },
  { name: "Nginx", category: "DevOps", use: "Reverse proxy, TLS termination and static serving.", hue: "#009639" },
  { name: "GitLab CI/CD", category: "DevOps", use: "Pipelines and runners on GitLab.", hue: "#FC6D26" },
  { name: "Jenkins", category: "DevOps", use: "Self-hosted automation servers and pipelines.", hue: "#D33833", fallback: "cicd" },
  { name: "Argo CD", category: "DevOps", use: "GitOps-style continuous delivery to Kubernetes.", hue: "#EF7B4D" },
  { name: "Helm", category: "DevOps", use: "Packaging and versioning Kubernetes manifests.", hue: "#0F1689" },
  { name: "Ansible", category: "DevOps", use: "Configuration management and server automation.", hue: "#EE0000" },
  { name: "Prometheus", category: "DevOps", use: "Metrics collection and alerting.", hue: "#E6522C" },
  { name: "Grafana", category: "DevOps", use: "Dashboards for metrics and logs.", hue: "#F46800" },
  { name: "SonarQube", category: "DevOps", use: "Code quality and security scanning in CI.", hue: "#4E9BCD" },
  // Cloud
  { name: "AWS", category: "Cloud", use: "Compute, storage, networking and IAM.", hue: "#FF9900", featured: true },
  { name: "Google Cloud (GCP)", category: "Cloud", use: "Compute Engine, Cloud Run and managed storage.", hue: "#4285F4", featured: true },
  { name: "Vercel", category: "Cloud", use: "Frontend hosting with preview deployments.", hue: "#6B7280" },
  { name: "Firebase", category: "Cloud", use: "Auth, realtime data and hosting for quick builds.", hue: "#FFA000" },
  { name: "Supabase", category: "Cloud", use: "Postgres, auth and storage as a backend.", hue: "#3ECF8E" },
  { name: "Hostinger", category: "Cloud", use: "Hosting for client websites.", hue: "#673DE6", fallback: "server" },
  // AI
  { name: "ChatGPT", category: "AI", use: "Brainstorming, debugging help and drafting.", hue: "#10A37F" },
  { name: "Claude", category: "AI", use: "Code review, refactoring and technical writing.", hue: "#D97757", featured: true },
  { name: "GitHub Copilot", category: "AI", use: "In-editor code completion and suggestions.", hue: "#8957E5" },
  { name: "Cursor", category: "AI", use: "AI-assisted editor for larger refactors.", hue: "#6B7280" },
  { name: "Gemini", category: "AI", use: "Multimodal prompts and long-context analysis.", hue: "#4285F4" },
  { name: "Perplexity", category: "AI", use: "Research with cited sources.", hue: "#20808D" },
  // Agentic AI
  { name: "LangChain", category: "Agentic AI", use: "Chains, tools and retrieval for LLM apps.", hue: "#1C7C54", featured: true },
  { name: "LangGraph", category: "Agentic AI", use: "Stateful, multi-step agent workflows as graphs.", hue: "#1C7C54", fallback: "agents", featured: true },
  { name: "CrewAI", category: "Agentic AI", use: "Role-based multi-agent collaboration.", hue: "#FF5A50", fallback: "agents" },
  { name: "AutoGen", category: "Agentic AI", use: "Conversational multi-agent frameworks.", hue: "#0078D4", fallback: "agents" },
  { name: "LlamaIndex", category: "Agentic AI", use: "Data connectors and retrieval pipelines.", hue: "#8E5CF5" },
  { name: "Model Context Protocol", category: "Agentic AI", use: "Standard way to give agents tools and context.", hue: "#D97757", fallback: "mcp", featured: true },
  { name: "n8n", category: "Agentic AI", use: "Workflow automation with AI nodes.", hue: "#EA4B71" },
  { name: "Hugging Face", category: "Agentic AI", use: "Open models, datasets and embeddings.", hue: "#FFB000" },
  { name: "Ollama", category: "Agentic AI", use: "Running open models locally.", hue: "#6B7280" },
  { name: "Pinecone", category: "Agentic AI", use: "Vector search for retrieval-augmented agents.", hue: "#1B17F5" },
];

export const devops: {
  heading: string;
  description: string;
  stages: PipelineStage[];
  clouds: CloudProvider[];
} = {
  heading: "DevOps & Cloud",
  description: "From commit to production: how code is built, packaged, shipped, deployed and kept running.",
  stages: [
    {
      title: "Source",
      caption: "Version control and review",
      icon: "source",
      tools: [{ name: "Git" }, { name: "GitHub" }, { name: "Pull Requests", fallback: "pullrequest" }],
    },
    {
      title: "Build",
      caption: "Package and verify",
      icon: "build",
      tools: [{ name: "Vite" }, { name: "npm" }, { name: "ESLint" }, { name: "Docker Desktop" }],
    },
    {
      title: "Automate",
      caption: "CI/CD and image registry",
      icon: "automate",
      tools: [{ name: "GitHub Actions" }, { name: "CI/CD", fallback: "cicd" }, { name: "Docker Hub" }],
    },
    {
      title: "Deploy",
      caption: "Provision and release",
      icon: "deploy",
      tools: [{ name: "Terraform" }, { name: "Kubernetes" }, { name: "Vercel" }, { name: "Hostinger", fallback: "server" }],
    },
    {
      title: "Operate",
      caption: "Scale and keep it running",
      icon: "operate",
      tools: [{ name: "Load Balancer", fallback: "balancer" }, { name: "Nginx" }, { name: "Linux" }, { name: "Bash" }],
    },
  ],
  clouds: [
    {
      name: "AWS",
      summary: "Cloud infrastructure for hosting, storage and delivery.",
      services: ["EC2", "S3", "IAM", "CloudFront", "Route 53", "ELB"],
      hue: "#FF9900",
    },
    {
      name: "Google Cloud (GCP)",
      summary: "Managed compute, storage and serverless on Google's platform.",
      services: ["Compute Engine", "Cloud Run", "Cloud Storage", "Cloud Functions", "GKE", "IAM"],
      hue: "#4285F4",
    },
  ],
};

export const agentic: {
  heading: string;
  description: string;
  stages: PipelineStage[];
  frameworks: PipelineItem[];
} = {
  heading: "Agentic AI",
  description:
    "Building AI agents that plan, call tools and check their own work, instead of answering one prompt at a time.",
  stages: [
    {
      title: "Perceive",
      caption: "Goals, context and data",
      icon: "perceive",
      tools: [{ name: "Prompts", fallback: "brain" }, { name: "RAG", fallback: "rag" }, { name: "Embeddings", fallback: "database" }, { name: "Pinecone" }],
    },
    {
      title: "Plan",
      caption: "Reason and break down tasks",
      icon: "plan",
      tools: [{ name: "LLM Reasoning", fallback: "brain" }, { name: "Task Decomposition", fallback: "loop" }, { name: "ReAct", fallback: "loop" }],
    },
    {
      title: "Act",
      caption: "Call tools and APIs",
      icon: "act",
      tools: [{ name: "Tool Calling", fallback: "plug" }, { name: "Model Context Protocol", fallback: "mcp" }, { name: "Code Execution", fallback: "code" }],
    },
    {
      title: "Reflect",
      caption: "Check, remember, improve",
      icon: "reflect",
      tools: [{ name: "Memory", fallback: "memory" }, { name: "Evals", fallback: "eval" }, { name: "Guardrails", fallback: "guard" }, { name: "Human-in-the-loop", fallback: "human" }],
    },
  ],
  frameworks: [
    { name: "LangChain" },
    { name: "LangGraph", fallback: "agents" },
    { name: "CrewAI", fallback: "agents" },
    { name: "AutoGen", fallback: "agents" },
    { name: "LlamaIndex" },
    { name: "n8n" },
    { name: "Hugging Face" },
    { name: "Ollama" },
    { name: "FAISS", fallback: "database" },
  ],
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Agwatto Travel — Umrah Packages Website",
    description:
      "A real client project for a travel business offering Umrah packages, built as a full-stack MERN website and deployed on Hostinger for live customer traffic and package browsing.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "MERN", "Travel"],
    github: "",
    live: "https://agwattotravel.com/",
    featured: true,
    category: "Client Work",
    categories: ["Client Work", "Full Stack"],
    thumbnail: "/agwatto-home.png",
    highlights: [
      "Built a production-ready MERN travel website for a real client business",
      "Designed package listings, customer-friendly UI, and conversion-focused browsing experience",
      "Deployed and maintained the site live on Hostinger for public access",
      "Worked on a business-driven product with real user flow and conversion requirements",
    ],
  },
  {
    id: 2,
    title: "Zikr AI — Islamic NLP Chatbot",
    description:
      "An AI-powered chatbot using Retrieval-Augmented Generation (RAG) to answer Islamic queries with explainable AI responses, dynamic query weighting, and a Flask-based API with interactive frontend.",
    tags: ["Python", "Flask", "FAISS", "sentence-transformers", "NLP", "JavaScript"],
    github: "https://github.com/MuhammadZaighamAsif/ZikrAi.git",
    live: "",
    featured: false,
    category: "AI",
    highlights: [
      "Implemented FAISS + sentence-transformers for semantic search with hybrid retrieval (TF-IDF + keyword fusion)",
      "Designed dynamic query weighting to improve answer relevance and accuracy",
      "Built Flask-based API with an interactive frontend (dark mode, readability controls, source transparency)",
      "Enabled explainable AI responses by showing retrieved sources and context chunks",
    ],
  },
  {
    id: 3,
    title: "AutoSphere — Automotive Marketplace",
    description:
      "A full-stack automotive marketplace and service platform connecting buyers, sellers, and service providers with real-time listings and seamless user experience.",
    tags: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/AbubakarAfzal643/AutoSphere_v2.git",
    live: "https://auto-sphere-v2-az.vercel.app",
    featured: false,
    category: "Full Stack",
    highlights: [
      "Built responsive React + Vite frontend for fast user experience",
      "Designed RESTful API with Node.js + Express for scalable backend",
      "Implemented MongoDB database for efficient vehicle and user data management",
      "Integrated real-time search and filtering for automotive listings",
    ],
  },
  {
    id: 4,
    title: "TalentMiner: AI Resume–Job Description Matcher",
    description:
      "An NLP-based system to match resumes with job descriptions using semantic similarity via BERT, improving matching accuracy compared to keyword-based approaches.",
    tags: ["Python", "Flask", "NLP", "BERT"],
    github: "https://github.com/MuhammadZaighamAsif/TalentMiner.git",
    live: "",
    featured: false,
    category: "AI",
    categories: ["AI", "Full Stack"],
    highlights: [
      "Implemented semantic similarity using BERT / NLP techniques",
      "Improved matching accuracy compared to keyword-based approaches",
    ],
  },
  {
    id: 5,
    title: "ResQ Disaster Management System",
    description:
      "A full-stack platform connecting donors, victims, and volunteers during disasters, achieving 85% matching accuracy with optimized data handling.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/MuhammadZaighamAsif/Disaster-Management-System.git",
    live: "",
    featured: false,
    category: "Full Stack",
    highlights: [
      "Led a team of 6, improving assistance response time by 30%",
      "Achieved 85% matching accuracy using optimized data handling",
    ],
  },
  {
    id: 6,
    title: "Software House Project Tracker",
    description:
      "A comprehensive MERN stack project management system for tracking software development projects, tasks, team members, and deadlines with real-time updates.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/MuhammadZaighamAsif/Software-House-Project-Tracker.git",
    live: "",
    category: "Full Stack",
    featured: false,
    highlights: [
      "Developed full-stack solution for project and task management",
      "Implemented real-time project tracking and team collaboration features",
      "Built role-based access control for different user types",
    ],
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
    title: "Warehouse Management System",
    description:
      "A web-based inventory system for real-time stock and supplier management with a scalable database structure, improving inventory update efficiency by 40%.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/RanaAbdulHannan/warehouse_management.git",
    live: "",
    category: "Full Stack",
    featured: false,
    highlights: [
      "Improved inventory update efficiency by 40%",
      "Designed scalable database structure for optimized performance",
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer Intern",
    company: "Exper System Solution",
    type: "Internship",
    duration: "08/2026 – Present",
    bullets: [
      "Worked as a software engineer intern contributing to product development and real-world engineering workflows.",
      "Collaborated with the development team to build and improve software features using modern web technologies.",
      "Gained hands-on experience in debugging, feature implementation, and team-based software delivery.",
    ],
  },
  {
    role: "Qubit (Intern)",
    company: "Quantum Logics Pvt Ltd",
    type: "Internship",
    duration: "05/2026 – 08/2026",
    bullets: [
      "Completed the Quantum Logics Internship Programme (11 May 2026 – 9 Aug 2026).",
      "Served as Project Captain (Jul 2026 – Aug 2026): led 3 teams, coordinated project execution, and enforced community policies",
      "Served as Team Captain (Jul 2026): ran regular meetings, published session recordings, and managed team deliverables",
      "Contributed to QuantumChat and CalculusRuntime projects — implemented data analysis, simulation scripts, and AI integrations",
    ],
  },
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
];

export const education: EducationEntry[] = [
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

export const certificates: Certificate[] = [
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

export const about = {
  eyebrow: "About me",
  title: "Building useful software, end to end",
  paragraphs: [
    "I'm a Software Engineering student at FAST-NUCES Lahore (2023 – 2027) who enjoys turning ideas into products people actually use — from the interface down to the API and database.",
    "Alongside my degree I've completed three internships, shipped a live MERN website for a real client, and led teams as Project Captain at Quantum Logics. I care about clean code, clear communication and getting things over the line.",
  ],
  focus: [
    {
      title: "Full-stack web",
      text: "React, Node.js, Express and MongoDB applications, built from UI to API.",
    },
    {
      title: "AI & NLP",
      text: "Semantic search and RAG chatbots with Python, Flask, FAISS and BERT.",
    },
    {
      title: "Real-world delivery",
      text: "A live client site, team leadership and measurable performance wins.",
    },
  ],
} as const;

/** Headline numbers, derived from the data above so they can never drift out of date. */
export const stats = [
  { value: projects.length, label: "Projects built", suffix: "" },
  { value: experience.length, label: "Internships", suffix: "" },
  { value: certificates.length, label: "Certifications", suffix: "" },
  { value: 2027, label: "Graduating", suffix: "", noCount: true },
] as const;
