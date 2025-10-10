export interface Question {
  id: number;
  pillar: "cloud" | "ai" | "devops" | "security" | "realworld";
  question: string;
  options: {
    text: string;
    points: number;
  }[];
  explanation?: string;
}

export const assessmentQuestions: Question[] = [
  // Cloud Fundamentals (3 questions, 12 points total)
  {
    id: 1,
    pillar: "cloud",
    question: "Which statement about serverless computing is most accurate?",
    options: [
      { text: "You manage the underlying servers", points: 0 },
      { text: "You pay only for actual execution time and resources used", points: 4 },
      { text: "It's always slower than traditional VMs", points: 0 },
      { text: "It requires Docker containers", points: 1 }
    ],
    explanation: "Serverless computing abstracts server management and charges based on actual resource consumption."
  },
  {
    id: 2,
    pillar: "cloud",
    question: "What is the primary benefit of using Infrastructure as Code (IaC)?",
    options: [
      { text: "It makes infrastructure changes faster to deploy", points: 2 },
      { text: "It enables version control, repeatability, and automation of infrastructure", points: 4 },
      { text: "It eliminates the need for cloud providers", points: 0 },
      { text: "It reduces cloud costs by 50%", points: 0 }
    ],
    explanation: "IaC's main advantage is treating infrastructure as versionable, testable code."
  },
  {
    id: 3,
    pillar: "cloud",
    question: "A company has unpredictable workloads that spike during business hours. Which pricing model is most cost-effective?",
    options: [
      { text: "Reserved instances for all capacity", points: 0 },
      { text: "On-demand instances only", points: 1 },
      { text: "Spot instances for all workloads", points: 1 },
      { text: "Reserved instances for baseline + auto-scaling on-demand for spikes", points: 4 }
    ],
    explanation: "Hybrid approach optimizes costs: reserved for predictable baseline, on-demand for variable peaks."
  },
  
  // AI/ML Basics (3 questions, 12 points total)
  {
    id: 4,
    pillar: "ai",
    question: "What is the main purpose of RAG (Retrieval Augmented Generation)?",
    options: [
      { text: "To reduce the size of language models", points: 1 },
      { text: "To add external, up-to-date knowledge to LLM responses", points: 4 },
      { text: "To speed up model training", points: 0 },
      { text: "To encrypt sensitive data", points: 0 }
    ],
    explanation: "RAG retrieves relevant information from external sources to augment LLM responses with current, factual data."
  },
  {
    id: 5,
    pillar: "ai",
    question: "In an AI agent architecture, what is the role of the 'planning' component?",
    options: [
      { text: "To execute tasks immediately", points: 1 },
      { text: "To break down complex goals into actionable steps", points: 4 },
      { text: "To store conversation history", points: 1 },
      { text: "To generate random responses", points: 0 }
    ],
    explanation: "The planning component decomposes high-level objectives into a sequence of executable actions."
  },
  {
    id: 6,
    pillar: "ai",
    question: "Which scenario is best suited for fine-tuning a language model rather than using prompt engineering?",
    options: [
      { text: "You need to adjust response tone for a one-time task", points: 0 },
      { text: "You want domain-specific behavior across thousands of queries", points: 4 },
      { text: "You have limited training data (less than 100 examples)", points: 1 },
      { text: "You need quick prototyping without infrastructure", points: 1 }
    ],
    explanation: "Fine-tuning is optimal when you need consistent, specialized behavior at scale with sufficient training data."
  },
  
  // DevOps & Automation (3 questions, 12 points total)
  {
    id: 7,
    pillar: "devops",
    question: "What is the key difference between containers and virtual machines?",
    options: [
      { text: "Containers are slower but more secure", points: 0 },
      { text: "Containers share the host OS kernel, VMs include full OS", points: 4 },
      { text: "VMs are always cheaper to run", points: 0 },
      { text: "Containers can't run Linux applications", points: 0 }
    ],
    explanation: "Containers virtualize the OS, sharing the kernel, while VMs virtualize hardware with separate OS instances."
  },
  {
    id: 8,
    pillar: "devops",
    question: "In a CI/CD pipeline, when should you run security scans?",
    options: [
      { text: "Only in production after deployment", points: 0 },
      { text: "Once per month manually", points: 0 },
      { text: "As early as possible - during build and before deployment", points: 4 },
      { text: "Security scans are not needed in CI/CD", points: 0 }
    ],
    explanation: "'Shift left' security means detecting vulnerabilities early in the development pipeline to reduce fix costs."
  },
  {
    id: 9,
    pillar: "devops",
    question: "What is the primary goal of observability in distributed systems?",
    options: [
      { text: "To collect as many logs as possible", points: 1 },
      { text: "To understand system behavior and troubleshoot unknown issues", points: 4 },
      { text: "To replace all monitoring tools", points: 0 },
      { text: "To reduce infrastructure costs", points: 1 }
    ],
    explanation: "Observability enables you to ask arbitrary questions about system behavior, not just monitor predefined metrics."
  },
  
  // Security & Compliance (3 questions, 12 points total)
  {
    id: 10,
    pillar: "security",
    question: "What is the core principle of Zero Trust security?",
    options: [
      { text: "Trust everything inside the network perimeter", points: 0 },
      { text: "Never trust, always verify - even internal resources", points: 4 },
      { text: "Only verify external users", points: 1 },
      { text: "Disable all authentication", points: 0 }
    ],
    explanation: "Zero Trust assumes breach and requires verification for every access request, internal or external."
  },
  {
    id: 11,
    pillar: "security",
    question: "Which practice is most important for AI ethics and compliance?",
    options: [
      { text: "Using the largest model available", points: 0 },
      { text: "Documenting decision-making processes and maintaining audit trails", points: 4 },
      { text: "Keeping all AI systems closed-source", points: 0 },
      { text: "Avoiding human oversight", points: 0 }
    ],
    explanation: "Transparency and accountability through documentation are foundational to ethical AI governance."
  },
  {
    id: 12,
    pillar: "security",
    question: "What is the primary risk of storing secrets (API keys, passwords) in code repositories?",
    options: [
      { text: "It slows down the application", points: 0 },
      { text: "It exposes credentials to anyone with repository access, including in history", points: 4 },
      { text: "It makes code harder to read", points: 0 },
      { text: "It violates coding style guidelines", points: 1 }
    ],
    explanation: "Secrets in code can be exposed through repository access, git history, or public forks, leading to security breaches."
  },
  
  // Real-World Application (3 questions, 12 points total)
  {
    id: 13,
    pillar: "realworld",
    question: "A company wants to migrate 500 VMs to the cloud with minimal downtime. What's the best approach?",
    options: [
      { text: "Migrate all VMs at once over a weekend", points: 1 },
      { text: "Rebuild everything as cloud-native microservices first", points: 1 },
      { text: "Phased migration: pilot group, validate, then iterative waves", points: 4 },
      { text: "Keep everything on-premise and use cloud only for backup", points: 0 }
    ],
    explanation: "Phased migration reduces risk, allows learning from early phases, and ensures business continuity."
  },
  {
    id: 14,
    pillar: "realworld",
    question: "Your AI model shows 95% accuracy in testing but performs poorly in production. What's the likely issue?",
    options: [
      { text: "The model needs to be larger", points: 0 },
      { text: "Training data doesn't represent real-world scenarios (data drift)", points: 4 },
      { text: "Production servers are too slow", points: 1 },
      { text: "You need more test cases", points: 1 }
    ],
    explanation: "High test accuracy with poor production performance indicates training/production data mismatch."
  },
  {
    id: 15,
    pillar: "realworld",
    question: "A client asks for a cost estimate to 'move to the cloud.' What should you do first?",
    options: [
      { text: "Give them an average industry cost immediately", points: 0 },
      { text: "Recommend the most expensive cloud provider", points: 0 },
      { text: "Conduct a discovery phase: assess current state, requirements, and workloads", points: 4 },
      { text: "Suggest they stay on-premise", points: 0 }
    ],
    explanation: "Accurate cloud cost estimates require understanding current infrastructure, workload patterns, and business requirements."
  }
];

export const pillarNames = {
  cloud: "Cloud Fundamentals",
  ai: "AI/ML Basics",
  devops: "DevOps & Automation",
  security: "Security & Compliance",
  realworld: "Real-World Application"
};

export const maxScorePerPillar = 12;
export const totalMaxScore = 60;
