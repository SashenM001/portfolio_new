export const personalInfo = {
  name: "K.W. Sashen Matheesha",
  shortName: "Sashen",
  title: "Computer Science Undergraduate",
  roles: [
    "Full-Stack",
    "ML / AI",
    "Security",
    "Embedded Systems",
  ],
  bio: "BSc Hons. Computer Science student at University of Peradeniya, passionate about building things that span from browser to silicon. I design and ship full-stack web applications, train deep learning models, implement cryptographic protocols, and program autonomous hardware systems.",
  email: "smathiesha@gmail.com",
  emailLink: "https://mail.google.com/mail/?view=cm&to=smathiesha@gmail.com&su=Let%27s%20Connect%20%E2%80%94%20Saw%20Your%20Portfolio&body=Hi%20Sashen%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20learn%20more%20about%20your%20work%20and%20experience.%0A%0A%5BWrite%20your%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D",
  github: "https://github.com/SashenM001",
  cvPath: "/Sashen_Matheesha_CV.pdf",
  location: "Peradeniya, Sri Lanka",
};

export const education = [
  {
    degree: "BSc Hons. in Computer Science",
    institution: "University of Peradeniya",
    period: "May 2022 – Present",
    detail: "Faculty of Science · Mathematics, Computer Science & Statistics",
  },
];

export const experience = [
  {
    role: "Governance Section",
    company: "DARAZ Headquarters",
    period: "Oct 2023 – Dec 2023",
    description:
      "Category Tree Mapping for Daraz Bangladesh & Pakistan — standardising product classification and alignment across regional marketplaces.",
  },
  {
    role: "Account Opening Department",
    company: "People's Bank Regional Office, Nugegoda",
    period: "Jan 2021 – May 2021",
    description:
      "Customer onboarding and ensuring compliance with banking regulations.",
  },
];

export type ProjectCategory =
  | "All"
  | "Web Dev"
  | "ML / AI"
  | "Security"
  | "Embedded";

export const projects = [
  {
    id: 1,
    title: "ASL Finance Hub",
    category: "Web Dev" as ProjectCategory,
    description:
      "Full-stack financial management app with expense tracking, budget planning, interactive analytics charts, and secure JWT authentication.",
    tech: ["TypeScript", "React", "Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    github: "https://github.com/SashenM001/asl-finance-hub",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "AIESEC-LK Main Website",
    category: "Web Dev" as ProjectCategory,
    description:
      "National website for AIESEC in Sri Lanka — program showcase, impact metrics, event management, and interactive team profiles.",
    tech: ["TypeScript", "Next.js", "TailwindCSS"],
    github: "https://github.com/AIESEC-LK/aiesec.lk-v2",
    demo: "https://aiesec-lk-v2.vercel.app",
    featured: false,
  },
  {
    id: 3,
    title: "AIESEC in Kandy",
    category: "Web Dev" as ProjectCategory,
    description:
      "Official website for the AIESEC University of Peradeniya chapter. Lightweight, responsive, and SEO-friendly organisational web presence.",
    tech: ["JavaScript", "CSS", "Next.js"],
    github: "https://github.com/SashenM001/AIESEC_in_Kandy",
    demo: "https://uop.aiesec.lk/",
    featured: false,
  },
  {
    id: 4,
    title: "Sincerely Sri Lankan",
    category: "Web Dev" as ProjectCategory,
    description:
      "Interactive cultural web app showcasing Sri Lankan heritage, built with modern UI components and AI-assisted development workflows.",
    tech: ["TypeScript", "React", "Vite", "shadcn/ui", "TailwindCSS"],
    github: "https://github.com/asldevteam/sincerely-sri-lankan-react",
    demo: "https://sincerely-sri-lankan-react.vercel.app",
    featured: false,
  },
  {
    id: 5,
    title: "Project Sportify",
    category: "Web Dev" as ProjectCategory,
    description:
      "Full-stack sports management system with team creation, event scheduling, RBAC, JWT auth, and Spring Boot REST API.",
    tech: ["TypeScript", "React", "Spring Boot", "MySQL", "BCrypt"],
    github: "https://github.com/Heshan925/Project_Sportify",
    demo: null,
    featured: true,
  },
  {
    id: 6,
    title: "Tea Leaf Disease Classifier",
    category: "ML / AI" as ProjectCategory,
    description:
      "Transfer learning system comparing VGG16 and ResNet50 on 368 tea leaf images. ResNet50 achieves 91.07% test accuracy across 3 disease classes.",
    tech: ["Python", "PyTorch", "ResNet50", "VGG16", "Matplotlib"],
    github: "https://github.com/SashenM001/tea-leaf-disease-classifier",
    demo: null,
    featured: true,
  },
  {
    id: 7,
    title: "Tweet Health Mention Classifier",
    category: "ML / AI" as ProjectCategory,
    description:
      "NLP pipeline with LSTM and Bi-LSTM for binary classification of personal health mentions in tweets, trained on ~2,000 labelled samples.",
    tech: ["Python", "TensorFlow", "Keras", "NLTK", "Jupyter"],
    github: "https://github.com/SashenM001/tweet-health-classifier",
    demo: null,
    featured: false,
  },
  {
    id: 8,
    title: "Secure E-Procurement System",
    category: "Security" as ProjectCategory,
    description:
      "Production-grade cryptographic procurement platform using ECDSA P-256, ECIES encryption, Shamir Secret Sharing (2-of-3), and SHA-256 hash-chain ledger.",
    tech: ["Python", "Flask", "ECDSA", "ECIES", "Shamir SSS", "SHA-256"],
    github: "https://github.com/SashenM001/secure-eprocurement",
    demo: null,
    featured: true,
  },
  {
    id: 9,
    title: "LED Lifespan Estimator",
    category: "Embedded" as ProjectCategory,
    description:
      "Computer vision tool that analyses LED bulb images over time, tracking brightness, colour temperature, and flicker to predict failure points.",
    tech: ["Python", "OpenCV", "NumPy", "Matplotlib", "Tkinter"],
    github: "https://github.com/SashenM001/led-lifespan-estimator",
    demo: null,
    featured: false,
  },
  {
    id: 10,
    title: "MediaFly Express Drone",
    category: "Embedded" as ProjectCategory,
    description:
      "Autonomous medical delivery quadcopter with dual temperature sensors, rain detection, obstacle avoidance, Bluetooth telemetry, and TEC Peltier cooling.",
    tech: ["C++", "Arduino", "HC-SR04", "DHT11", "Bluetooth HC-05"],
    github: "https://github.com/SashenM001/medifly-express",
    demo: null,
    featured: true,
  },
  {
    id: 11,
    title: "Post-Quantum V2X Authentication",
    category: "Security" as ProjectCategory,
    description:
      "Honours research project analysing the scalability of hybrid classical/post-quantum authentication schemes in high-density V2X vehicular networks. Evaluated latency, throughput, and authentication overhead across simulated dense environments.",
    tech: ["Python", "CRYSTALS-Kyber", "CRYSTALS-Dilithium", "V2X Protocols", "Post-Quantum Cryptography"],
    github: null,
    demo: null,
    featured: true,
  },
];

export const skills = {
  "Web Dev": [
    "React", "Next.js", "TypeScript", "JavaScript", "Java",
    "TailwindCSS", "Node.js", "Express.js", "Spring Boot",
    "PostgreSQL", "MySQL", "PL/pgSQL", "Prisma", "REST APIs",
    "Docker", "Vercel", "GitHub Actions",
  ],
  "ML / AI": [
    "PyTorch", "TensorFlow", "Keras",
    "Transfer Learning", "CNNs", "LSTM", "Bi-LSTM",
    "OpenCV", "NumPy", "Pandas", "Matplotlib",
    "Jupyter Notebooks", "Scikit-learn",
  ],
  "Security": [
    "ECDSA P-256", "ECIES", "Shamir Secret Sharing",
    "SHA-256 Hash Chains", "CRYSTALS-Kyber", "CRYSTALS-Dilithium",
    "JWT", "BCrypt", "OAuth Concepts", "Zero-Knowledge Proofs",
  ],
  "Embedded": [
    "Arduino Mega 2560", "C++", "DHT11 Sensors",
    "HC-SR04 Ultrasonic", "Bluetooth HC-05",
    "DC Motor Control", "PWM", "Serial / UART",
    "3D CAD / Printing",
  ],
};

