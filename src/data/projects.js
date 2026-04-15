export const BIO = {
  name: 'Abhishek Singh',
  role: 'AI Architect & Software Engineer',
  tagline: 'Building Autonomous Systems & Sovereign Ecosystems.',
  summary: 'A CSE specialist with a deep focus on AI model evolution (RNNs, NER) and secure API architecture. Passionate about creating self-sovereign digital environments and high-performance sync engines.',
  email: 'abhishek@sovereign-os.com',
  resumeUrl: '/RESUME.png',
  social: {
    linkedin: '#',
    github: '#',
    twitter: '#',
    leetcode: '#',
    hackerrank: '#'
  }
};

export const PROJECTS = [
  {
    id: 'jadu',
    title: 'Jadu AI OS',
    desc: 'Autonomous AI Companion & Spatially-aware Operating System.',
    problem: 'Traditional AI assistants lack spatial awareness and persistent memory of user UI state.',
    metrics: 'Reduced task completion time by 40% using recursive goal-splitting.',
    fullDesc: 'A recursive intelligence loop (PEOR) based OS that perceives screen state through OMNI-VISION and provides proactive assistance.',
    tech: ['Python', 'Transformer', 'Computer Vision'],
    status: 'Public',
    link: '#',
    github: '#'
  },
  {
    id: 'aalayaj',
    title: 'AalayaJ',
    desc: 'Secure Real-time API Synchronization Engine.',
    problem: 'Unreliable data consistency and high latency in real-time mobile/web sync modules.',
    metrics: 'Achieved <50ms sync latency across 10k+ concurrent nodes.',
    fullDesc: 'High-performance sync platform for real-time mobile/web ecosystems with encrypted API handshakes and localized caching.',
    tech: ['Flutter', 'PHP', 'MySQL', 'Node.js'],
    status: 'Public',
    link: 'https://aalayaj.com',
    github: '#'
  }
];

export const EDUCATION = [
  {
    institution: 'GOVERNMENT POLYTECHNIC ADITYAPUR',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: '2024 - 2027 (Expected)',
    details: 'Focus on Machine Learning, Distributed Systems, and Advanced Algorithms. Top of class in AI and Web Architectures.'
  }
];

export const EXPERIENCE = [
  {
    role: 'Sovereign AI Lead',
    company: 'Independent Research',
    duration: '2023 - Present',
    details: 'Developing JADU OS and AalayaJ Sync protocols. Orchestrated full-stack deployments for private AI-agent clusters.'
  },
  {
    role: 'Software Intern',
    company: '[Previous Company/Lab]',
    duration: 'Summer 2022',
    details: 'Built automated intent classification tools and optimized database retrieval scripts.'
  }
];

export const TECH_STACK = {
  languages: ['Python', 'C++', 'JavaScript', 'SQL', 'Dart', `PHP`],
  frameworks: ['React', 'Node.js', 'Django', 'Flutter', 'Tailwind', `LARAVEL`],
  tools: ['Git', 'Docker', 'AWS', 'Firebase', 'Vite', 'Framer Motion'],
  ai: ['RNN', 'NLP', 'TensorFlow', 'VectorDB']
};

export const ACHIEVEMENTS = [
  'Winner: [Hackathon Name/Year] - Best AI Implementation',
  'Certified: [Platform] AWS Cloud Practitioner',
  'Academic Honor: 9.2 CGPA in CSE core modules'
];

export const BLOGS = [
  { id: 'peor-loop', title: "The PEOR Loop: Recursive Planning in AI Agents", date: "April 2026", readTime: "5 min", excerpt: "Exploring the mathematical foundations of goal-splitting in autonomous systems.", content: "Artificial Intelligence is no longer just about prompt-response pairs. It requires autonomy. The PEOR (Perceive, Evaluate, Organize, Respond) loop is a framework I developed to allow agents to recursively break down their own goals into sub-tasks. \n\n### The Math Behind PEOR\nBy maintaining a state tree of objectives, the AI can rollback decisions when it encounters failure states. This drastically reduces hallucination rates in complex environments." },
  { id: 'zero-latency', title: "Zero-Latency Sync: Beyond WebSockets", date: "March 2026", readTime: "8 min", excerpt: "How localized caching and encrypted handshakes redefine real-time synchronization.", content: "WebSockets are great, but maintaining persistent TCP connection state across 10,000 mobile devices drains both battery and server memory. \n\n### The Optimization\nIn AalayaJ, I implemented an optimized polling-cache layer. The client assumes the network is down and caches everything. Background workers sync deltas using highly compressed JSON payloads over standard HTTP/2, saving 40% bandwidth while mimicking real-time speed." }
];

export const SERVICES = [
  {
    id: 'web-dev',
    title: 'Autonomous Web Systems',
    desc: 'Building self-healing, local-first web architectures with sub-50ms sync latency.',
    details: 'Focus on React 19, Node.js, and Distributed Sync Engines.',
    icon: 'Terminal'
  },
  {
    id: 'ai-arch',
    title: 'AI Portfolio Architect',
    desc: 'Designing recursive intelligence loops and OMNI-VISION perception layers.',
    details: 'Leveraging LLMs, VectorDBs, and Python-based orchestration.',
    icon: 'Cpu'
  }
];

export const SNIPPETS = [
  {
    id: 'peor-logic',
    title: 'Recursive Goal Splitting',
    desc: 'The core PEOR logic for sub-task decomposition in AI agents.',
    tags: ['Python', 'AI'],
    stars: 124,
    code: 'def peor_loop(objective):\n  tasks = decompose(objective)\n  for t in tasks:\n    perceive(t)\n    evaluate(t)\n    organize(t)\n    respond(t)'
  },
  {
    id: 'sync-cache',
    title: 'Local-First Sync Hub',
    desc: 'Optimized delta-patching for high-latency mobile environments.',
    tags: ['Dart', 'Node.js'],
    stars: 86,
    code: 'class SyncEngine {\n  void pushDelta(Patch p) {\n    if (isOffline) cache(p);\n    else commit(p);\n  }\n}'
  }
];
