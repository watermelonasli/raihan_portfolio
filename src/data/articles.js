export const articles = [
  {
    slug: "maximize-ai-usage",
    title: "How To Maximize AI Prompts for Productivity and Creativity",
    excerpt:
      "AI is a tool, not a replacement. The best prompts are the ones that make you think, not the ones that make the AI do all the work.",
    category: "Learning",
    date: "2026-11-12",
    readingTime: 10,
    image: "/images/blog/ai.jpg",
    author: "Muhammad Raihan",
    featured: true,
    content: [
      {
        type: "p",
        text: "For the first few months I used ChatGPT, I thought it was overhyped. I would ask it a question, get a generic, wall-of-text answer, and think 'I could have just Googled this.' Then I realized the problem wasn't the AI — it was my prompt.",
      },
      { type: "h2", text: "Be Specific About the Format and Tone" },
      {
        type: "p",
        text: "If you don't tell the AI who to be and how to answer, it defaults to a polite, slightly verbose assistant. If you want a technical summary, tell it to act as a senior developer. If you want a bulleted list, explicitly ask for one.",
      },
      { type: "h2", text: "Provide the Right Context" },
      {
        type: "p",
        text: "AI models are incredibly smart, but they know nothing about your specific situation. The more context you provide about your goals, your audience, and the constraints, the better the output will be.",
      },
      {
        type: "ul",
        items: [
          "Include your target audience (e.g., 'explain this to a 10-year-old')",
          "State your constraints (e.g., 'keep it under 200 words')",
          "Provide examples of what a good response looks like",
          "Tell the AI what to avoid doing",
        ],
      },
      { type: "h2", text: "Use Delimiters to Separate Instructions from Data" },
      {
        type: "p",
        text: "This is a game-changer for long prompts. If you paste a huge block of text and ask a question, the AI might get confused about where the data ends and your instructions begin. Wrap your data in triple quotes, backticks, or XML tags.",
      },
      {
        type: "blockquote",
        text: "A confused AI gives generic answers. If you separate your instructions from your data, the AI knows exactly what to process.",
      },
      { type: "h2", text: "Iterate and Refine" },
      {
        type: "p",
        text: "Treat your first prompt as a draft. Ask the AI to critique its own response or suggest improvements. Breaking a complex task into a chain of smaller prompts usually yields far better results than asking for everything at once.",
      },
      {
        type: "code",
        language: "text",
        text: 'Act as a Senior Code Reviewer.\nReview the following React component for performance issues.\n\nConstraints:\n- Focus only on re-render logic.\n- Provide code snippets for fixes.\n\nCode:\n"""\n[paste your code here]\n"""',
      },
      { type: "h2", text: "The Takeaway" },
      {
        type: "p",
        text: "Prompting is less about finding 'magic words' and more about clear communication. If you can write a good brief for a human freelancer, you can write a great prompt for an AI. Just be explicit about what you want, provide the necessary background, and don't be afraid to ask for a second draft.",
      },
    ],
  },
];

export const blogCategories = [
  "All",
  ...Array.from(new Set(articles.map((a) => a.category))),
];

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug);
