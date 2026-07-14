export type Program = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  aboutHeading: string;
  about: string[];
  secondaryHeading?: string;
  secondary?: string[];
  featuresHeading: string;
  features: string[];
  price?: string;
  inclusionsHeading?: string;
  inclusions?: string[];
  closing?: string;
  imagePrimary: string;
  imageSecondary?: string;
};

export const programs: Program[] = [
  {
    slug: "money-blueprint",
    title: "Money Blueprint",
    shortTitle: "Money Blueprint",
    tagline:
      "Build wealth with power and purpose — rewrite your financial mindset for lasting freedom.",
    aboutHeading: "What's Money Blueprint about?",
    about: [
      "If you're currently living paycheck to paycheck, burdened by debt and have no plans for the future then you need Money Blueprint. Unfortunately, many people serve money without ever having made a conscious choice to do so. By not learning how to manage your money, you become a servant to your finances.",
      "Sudarshan Sabat is the best mind trainer devoted to investing in people. He is passionate about guiding others into a sustainable financial freedom.",
      "His Money Blueprint workshop is designed to understand the needs of people and help them achieve greater financial freedom. The sessions have helped participants know their true potential and achieve higher profits in business, work, and life.",
      "Learn how to build wealth, not just for money's sake, but for the power and purpose it brings.",
    ],
    featuresHeading: "Workshop Program Features",
    features: [
      "Attract wealth and wisdom and develop the mindset of the true winner",
      "Money Exercise",
      "Winning Money Game",
      "Financial Freedom Technique",
      "Money Emotion",
      "Money Management",
      "Secret Money Mindset",
    ],
    price: "INR 25,000",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/hero.png",
  },
  {
    slug: "life-mastery",
    title: "Life Mastery",
    shortTitle: "Life Mastery",
    tagline:
      "Gain creative control over your life — eliminate negativity and unlock the potential already within you.",
    aboutHeading: "What's Life Mastery about?",
    about: [
      "If you've ever wondered why it's so difficult to achieve the things that you want… you've come to the right place.",
      "Life Mastery will allow you to gain greater control over and become more creative in your life. It will also show you the importance of eliminating negativity — the silent force that keeps most people circling the same goals without ever arriving.",
      "Sudarshan Sabat is a master mind trainer devoted to investing in people. He is passionate about guiding others into sustainable independence, clarity, and inner strength.",
    ],
    featuresHeading: "Workshop Program Features",
    features: [
      "Real skills of life that were not part of your academic education",
      "Know the purpose of your life",
      "How to craft a world-class lifestyle",
      "How to build a positive and confident self-image",
      "How to change and balance your life",
      "Formula for 100% growth in your life",
      "How to become more creative in your life",
    ],
    closing:
      "The knowledge in this program is not dogma; we learn as we live — and life is our greatest teacher. The ultimate knowledge is already within you, and Life Mastery is simply the tool to unlock your greatest potential.",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/meditation.png",
  },
  {
    slug: "business-growth-journey",
    title: "Business Growth Journey",
    shortTitle: "Business Growth",
    tagline:
      "Mentorship for startups and established businesses ready to decide, grow, and win.",
    aboutHeading: "What is Business Growth Journey about?",
    about: [
      "In this fast-paced, competitive environment, a lot of challenges are faced by businesses that need help from a mentor who can guide them with proper decisions, support their efforts, find where they stand in business, explore opportunities, and work towards the goal.",
      "Sudarshan Sabat, a mind trainer, uses his immense experience gained from working in various industries in his business counseling workshops so that it will help you become successful in business and work.",
    ],
    secondaryHeading: "How can Business Growth Journey workshop help me?",
    secondary: [
      "Business Growth Journey, also known as business mentoring, is a highly effective process that enables business owners and others to work through and explore possibilities on the issues affecting their business.",
      "Sudarshan Sabat, a mind trainer, offers a range of solutions for business owners, startups, organisations and others that want to grow, improve, and achieve better results.",
      "Business Growth Journey program is designed to cater for businesses that are established, those which are starting up, and also those which may be facing challenges. They are also designed to focus on where you are in your business cycle — whether seeking advice, a health check, or assistance in taking the next big step.",
    ],
    featuresHeading: "Business Growth Journey Program Features",
    features: [
      "Evaluate your new business ideas and implement them successfully. If you are in the startup phase, learn business plan development, market research, and creating financial statements.",
      "Identify problems and solve them in your existing business.",
      "How to make a business plan and navigate it during startup and growth.",
      "Real-time situations and case studies — and how to apply them in your business.",
    ],
    price: "INR 75,000",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/cognitive.png",
  },
  {
    slug: "ultimate-success-journey",
    title: "Ultimate Success Journey",
    shortTitle: "Ultimate Success",
    tagline:
      "A complete pathway from ambition to achievement — master the mind-set behind sustained success.",
    aboutHeading: "What's Ultimate Success Journey about?",
    about: [
      "Success is rarely a single breakthrough — it is a journey of clarity, discipline, and trained thinking. Ultimate Success Journey is designed for people who are done with temporary motivation and ready for lasting transformation.",
      "Sudarshan Sabat guides participants through the mental frameworks that separate those who dream from those who deliver — in career, business, and personal life.",
      "This program bridges mindset, goal architecture, and daily execution so your ambitions stop living only on paper.",
    ],
    featuresHeading: "Program Features",
    features: [
      "Define success on your terms — with measurable milestones",
      "Remove inner blocks that sabotage progress",
      "Build habits that compound into high performance",
      "Decision-making under pressure and uncertainty",
      "Align purpose, ambition, and daily action",
      "Create a personal success operating system you can reuse for life",
    ],
    price: "Please Call Us",
    imagePrimary: "/images/hero.png",
    imageSecondary: "/images/award-gold.png",
  },
  {
    slug: "advanced-mind-mastery",
    title: "Advanced Mind Mastery",
    shortTitle: "Mind Mastery",
    tagline:
      "Understand, control, and guide your mind — shape destiny from the subconscious up.",
    aboutHeading: "What is Advanced Mind Mastery about?",
    about: [
      "The mind shapes our destiny. When left untrained, it runs on habit, fear, and noise. Advanced Mind Mastery is built to help you understand, control, and guide your mental capabilities with precision.",
      "Sudarshan Sabat, a mind trainer, leads this deep dive into subconscious patterns so you stop reacting to life and start directing it.",
    ],
    secondaryHeading: "About Sudarshan Sabat's Mind Power Training",
    secondary: [
      "Sudarshan Sabat is a renowned mind power trainer in India with immense experience training people from all walks of life. He is an effective mind power trainer and success coach whose methods turn insight into applied change.",
    ],
    featuresHeading: "Mind Mastery and Advanced Mind Mastery Program Features",
    features: [
      "Identify negative thoughts that stop you from reaching your full potential",
      "Control your mind — meaning you can control your life, future, and destiny",
      "Comprehend the natural laws that govern life and how to use them for your benefit",
      "Understand powerful health remedy secrets around you to regain organic health",
      "Learn simple, effective solutions for your daily health issues",
      "Discover how to exploit your powerful potential to accomplish daily goals",
      "Learn how to convert your power into action",
    ],
    price: "Please Call Us",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/brain-glow.png",
  },
  {
    slug: "train-the-trainer",
    title: "Train the Trainer",
    shortTitle: "Train the Trainer",
    tagline:
      "Elevate teaching, coaching, and mentoring — learner-centric methods that create lasting impact.",
    aboutHeading: "What's Train the Trainer about?",
    about: [
      "This exclusive program is perfect for teaching, training, coaching, and mentoring in any field. If you are a teacher, trainer, coach, healer, or instructor, you are already making a difference in lives. Train the Trainer will elevate your work to a much higher level.",
      "If you are passionate about helping others unlock their potential and want to explore your own, this program is for you. Sudarshan Sabat uses powerful methodologies and the latest techniques focused on learner-centric outcomes.",
      "The program enhances professional capabilities by improving decision-making, team motivation, and public speaking, regardless of your current confidence level.",
    ],
    featuresHeading: "Train the Trainer Program Features",
    features: [
      "Ideal for new and experienced trainers, coaches, mentors",
      "Helpful for managers and supervisors looking to upskill",
      "Learn to handle resistant or disruptive participants effectively",
      "Gain tools to convert negativity into productive energy",
      "Develop a powerful and persuasive communication style",
    ],
    price: "Special Offer: Please Call Us",
    inclusionsHeading: "Program Inclusions",
    inclusions: [
      "8 days of comprehensive training by Mr. Sudarshan Sabat",
      "7 nights & 8 days accommodation including stay, meals, and amenities",
      "Triple-sharing room accommodation at the resort",
      "Complete training manuals, presentation PPTs, and content to facilitate workshops",
    ],
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/hero.png",
  },
  {
    slug: "life-counselling",
    title: "Life Counselling",
    shortTitle: "Life Counselling",
    tagline:
      "Focus, insight, and accountability — turn intention into consistent, life-changing results.",
    aboutHeading: "What's Life Counselling about?",
    about: [
      "You have a dream, the intention, and the edge — but you're unable to make use of them effectively? With Sudarshan Sabat's unique and proven methodologies, you'll gain the focus, insight, and accountability needed to achieve the consistent results you crave.",
      "Life is full of challenges — many out of our control. When not handled properly, they can leave you feeling lost. This Life Counselling Program empowers you to take charge, heal, and find clarity from past or present obstacles.",
      "This program is future-focused. It helps you identify realistic goals and actions to achieve them. Combining inquiry, motivation, and active strategies, it is ideal for those ready to break limitations and thrive in career or personal life.",
    ],
    featuresHeading: "Life Counselling Program Features",
    features: [
      "Get clear and focused on goals that will radically change your life",
      "Optimize your thinking, beliefs, behaviors, and confidence",
      "Enhance leadership skills and personal abilities",
      "Gain tools to break through limitations and inspire others",
      "Learn to control emotions and nurture relationships passionately",
    ],
    price: "INR 3,00,000",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/meditation.png",
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getAllProgramSlugs(): string[] {
  return programs.map((p) => p.slug);
}
