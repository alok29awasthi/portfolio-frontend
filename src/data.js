// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Alok Awasthi',
  role: 'Senior Software Engineer',
  company: 'Oracle Health',
  location: 'Bangalore, India',
  email: 'alok29awasthi@gmail.com',
  github: 'https://github.com/alok29awasthi',
  linkedin: 'https://www.linkedin.com/in/alok-awasthi-93a862160',
  resume: '/Alok-Awasthi-Resume.pdf',
  tagline: 'I build backend, data and GenAI systems.',
  intro:
    'Senior Member of Technical Staff at Oracle Health with 5+ years across healthcare, financial services and travel. I work mostly in Java, Spring Boot, Python, SQL and Oracle DB.',
  about: [
    "At Oracle Health I work on payer data platforms and GenAI features: using LLMs to clean up and match messy healthcare records, pulling structured rules out of documents with retrieval-augmented generation, and building the data models and tooling underneath.",
    'Before that I spent three years at Morgan Stanley building regulatory reporting and event-processing systems, and started out at OYO building booking data pipelines and getting test coverage from 19% to 72%.',
    'I care about systems that are measurable and boring to operate: clear data models, automated validation, solid test suites and deployments you can roll back. I also enjoy mentoring and owning delivery across teams.',
  ],
};

export const stats = [
  { value: '5+', label: 'years building production systems' },
  { value: '~70%', label: 'less manual review with LLM deduplication' },
  { value: '3×', label: 'throughput on event processing' },
  { value: '40%', label: 'faster event handling (2s → 1.2s)' },
];

export const experience = [
  {
    company: 'Oracle Health (Cerner)',
    role: 'Senior Member of Technical Staff',
    period: 'Dec 2025 – Present',
    location: 'Bangalore',
    points: [
      'Cut manual duplicate review by ~70% with LLM-based entity resolution for healthcare payer data, catching matches rule-based logic misses, with human review where confidence is low.',
      'Delivered a retrieval-augmented generation (RAG) pipeline that extracts structured rules from payer documents, cutting manual document review time by ~30%.',
      'Designed a data model that brings 5 inconsistent payer data sources together, and built Python tooling that cut ETL migration validation time by ~50%.',
      'Built internal tools with role-based access and per-team data isolation, taking ~90% of access requests off developers.',
    ],
    tags: ['Java', 'Python', 'Oracle DB', 'GenAI', 'RAG', 'REST APIs'],
  },
  {
    company: 'Morgan Stanley',
    role: 'P3 Associate, Software Developer',
    period: 'Aug 2022 – Dec 2025',
    location: 'Bangalore',
    points: [
      'Built a modular regulatory reporting framework producing regime-specific outputs with no downstream logic changes, cutting onboarding effort by 30%+ across 5+ regimes.',
      'Cut event processing time from 2s to 1.2s and tripled throughput through parallel processing, clearing backlogs within SLA.',
      'Built automated test frameworks (unit, API contract, BDD-based E2E), cutting testing cycle time by ~20%, or 2 days per release.',
      'Brought Blue-Green deployments into Jenkins pipelines for safer releases and rollbacks; mentored junior developers on design patterns and automation.',
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'Jenkins', 'BDD', 'Python'],
  },
  {
    company: 'OYO Rooms',
    role: 'SDE-1 (incl. internship)',
    period: 'Jan 2021 – Jul 2022',
    location: 'Bangalore',
    points: [
      'Built a Kafka-based pipeline for bulk reloading booking data into downstream databases.',
      'Raised unit test coverage for core API services from 19% to 72%.',
      'Load-tested APIs at 10k+ concurrent users with JMeter and tuned caching and queries for peak load.',
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'JMeter'],
  },
];

export const projects = [
  {
    name: 'AI Repository Explainer',
    description:
      'Paste any public GitHub repo and get a structured explanation of what it does, its architecture and tech stack, even when the README is missing. Infers intent from the repository structure and file paths, then returns JSON plus a Markdown write-up.',
    tags: ['Java', 'Spring Boot', 'LLM', 'React'],
    links: [
      { label: 'Backend', href: 'https://github.com/alok29awasthi/github-repo-explainer-backend' },
      { label: 'Frontend', href: 'https://github.com/alok29awasthi/github-repo-explainer-frontend' },
    ],
  },
  {
    name: 'Share-Doc',
    description:
      'File storage and sharing backend with user auth, AWS S3 storage, metadata tracking and grant/revoke access control. Downloads go through a backend proxy so no public S3 links are ever exposed.',
    tags: ['Spring Boot 3', 'AWS S3', 'PostgreSQL', 'JWT'],
    links: [{ label: 'GitHub', href: 'https://github.com/alok29awasthi/share-doc' }],
  },
  {
    name: 'Word Lookup Extension',
    description:
      'Select a word on any page and look up its meaning from the right-click menu, without leaving what you are reading. Built on Manifest V3 with a background service worker and context menus.',
    tags: ['JavaScript', 'Chrome Extension', 'Manifest V3'],
    links: [{ label: 'GitHub', href: 'https://github.com/alok29awasthi/word-lookup-chrome-ext' }],
  },
];

export const skills = [
  { group: 'Languages', items: ['Java', 'Python', 'SQL', 'C++'] },
  {
    group: 'Backend',
    items: ['Spring Boot', 'Spring Data JPA', 'REST APIs', 'GraphQL', 'Kafka', 'Async processing'],
  },
  {
    group: 'AI / GenAI',
    items: ['RAG pipelines', 'Embeddings & vector search', 'LLM entity resolution', 'LLM evaluation (HITL)', 'OCI Generative AI'],
  },
  {
    group: 'Data',
    items: ['Oracle DB', 'MongoDB', 'Data modeling', 'ETL migration & validation', 'Oracle APEX'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['OCI', 'AWS S3', 'Jenkins', 'Docker', 'Kubernetes (basic)', 'Blue-Green deployments'],
  },
  { group: 'Testing', items: ['JUnit', 'BDD / E2E', 'API contract testing', 'JMeter load testing'] },
];

export const education = {
  school: 'Vellore Institute of Technology',
  degree: 'B.Tech, Electronics & Communication Engineering',
  period: '2017 – 2021',
  grade: 'CGPA 9.11 / 10',
};
