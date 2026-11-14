export const projects = [
  {
    id: "demo-starter",
    title: "Starter Package Template Demo",
    category: "Website",
    year: "2026",
    featured: true,
    thumbnail: "/images/projects/demo-starter.png",
    tagline: "A demo of the starter package template for new projects",
    description:
      "A demo of the starter package template for new projects, showcasing a responsive layout, interactive components, and optimized performance.",
    tech: ["React", "Tailwind CSS"],
    links: {
      demo: "https://company-profile-starter.netlify.app/",
      repo: "https://github.com/watermelonasli/company-profile-starter"
    },
    details: {
      problem:
        "The starter package template is designed to provide a solid foundation for new projects, but it needs to be demonstrated in a real-world context to showcase its capabilities and ease of use.",
      objectives: [
        "Demonstrate the starter package template in a real-world context",
        "Showcase the responsive layout and interactive components",
        "Highlight the optimized performance and best practices implemented in the template",
      ],
      responsibilities: [
        "Developed the demo website using the starter package template",
        "Implemented responsive design and interactive components",
        "Optimized performance and ensured best practices were followed throughout the project",
      ],
      features: [
        "Responsive layout with mobile-first design",
        "Interactive components with smooth animations",
        "Optimized performance with lazy loading and code splitting",
      ],
    },
  },
  {
    id: "demo-premium",
    title: "Premium Package Template Demo",
    category: "Website",
    year: "2026",
    featured: true,
    thumbnail: "/images/projects/demo-premium.png",
    tagline: "A demo of the premium package template for new projects",
    description:
      "A demo of the premium package template for new projects, showcasing advanced features, enhanced performance, and a polished user experience.",
    tech: ["React", "Tailwind CSS"],
    links: {
      demo: "https://company-profile-premium2.netlify.app/",
      repo: "https://github.com/watermelonasli/company-profile-premium2",
    },
    details: {
      problem:
        "The premium package template is designed to provide advanced features and a polished user experience for new projects, but it needs to be demonstrated in a real-world context to showcase its capabilities and ease of use.",
      objectives: [
        "Demonstrate the premium package template in a real-world context",
        "Showcase the advanced features and enhanced performance",
        "Highlight the polished user experience and best practices implemented in the template",
      ],
      responsibilities: [
        "Developed the demo website using the premium package template",
        "Implemented advanced features and enhanced performance",
        "Ensured a polished user experience and followed best practices throughout the project",
      ],
      features: [
        "Advanced features with enhanced functionality",
        "Optimized performance with lazy loading, code splitting, and caching strategies",
        "Polished user experience with smooth animations and intuitive navigation",
      ],
    },
  },
  {
    id: "demo-exclusive",
    title: "Exclusive Package Template Demo",
    category: "Website",
    year: "2026",
    featured: true,
    thumbnail: "/images/projects/demo-exclusive.png",
    tagline: "A demo of the exclusive package template for new projects",
    description:
      "A demo of the exclusive package template for new projects, showcasing premium features, top-notch performance, and an exceptional user experience.",
    tech: ["React", "Tailwind CSS"],
    links: {
      demo: "https://company-profile-exclusive.netlify.app/",
      repo: "https://github.com/watermelonasli/company-profile-exclusive_rev",
    },
    details: {
      problem:
        "The exclusive package template is designed to provide premium features and an exceptional user experience for new projects, but it needs to be demonstrated in a real-world context to showcase its capabilities and ease of use.",
      objectives: [
        "Demonstrate the exclusive package template in a real-world context",
        "Showcase the premium features and top-notch performance",
        "Highlight the exceptional user experience and best practices implemented in the template",
      ],
      responsibilities: [
        "Developed the demo website using the exclusive package template",
        "Implemented premium features and top-notch performance",
        "Ensured an exceptional user experience and followed best practices throughout the project",
      ],
      features: [
        "Premium features with advanced functionality and customization options",
        "Top-notch performance with lazy loading, code splitting, caching strategies, and server-side rendering",
        "Exceptional user experience with smooth animations, intuitive navigation, and accessibility best practices",
      ],
    },
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];