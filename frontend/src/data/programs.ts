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
      "Understand how successful and wealthy individuals think, manage money and create financial growth.",
    aboutHeading: "Why Attend the Money Blueprint Program?",
    about: [
      "The Money Blueprint Program is designed for people who want to understand how successful and wealthy individuals think, manage money and create financial growth. If you want to learn the habits, mindset and strategies used by financially successful people, this program can help you to build a stronger relationship with money.",
      "In this program, you will learn practical ways to improve your financial knowledge, develop better money habits and create a positive mindset towards wealth and abundance.",
    ],
    featuresHeading: "What You Will Learn in the Money Blueprint Program",
    features: [
      "Learn the Power of Investing — understand the importance of investing your money wisely and develop the faith to take calculated risks for better financial growth.",
      "Practice Money Growth Exercises — experience practical money exercises that help you improve your financial decision-making and build smart money habits.",
      "Develop a Strong Financial Mindset — learn techniques to overcome financial fears, handle difficulties and create a mindset that assists financial freedom.",
      "Improve Money Management Skills — understand how to manage your income, expenditure and savings effectively to decrease financial stress and achieve your goals.",
      "Understand Wealthy People's Thinking — discover the habits, beliefs and thought processes that help successful people create and maintain wealth.",
      "Build a Positive Relationship with Money — learn how to recognise your money emotions, remove limiting beliefs and develop confidence in managing your finances.",
      "Create Opportunities for Financial Growth — explore strategies that can help you make your money work better for you and create long-term wealth.",
      "Balance Income and Expenses — learn simple financial planning methods to control your spending, increase savings and move towards a more secure future.",
    ],
    closing:
      "The Money Blueprint Program will help you transform your understanding of money and give you the knowledge, tools and mindset needed to create a better financial future. Start your journey towards financial awareness, growth and abundance.",
    price: "INR 25,000",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/hero.png",
  },
  {
    slug: "life-mastery",
    title: "Life Mastery",
    shortTitle: "Life Mastery",
    tagline:
      "How to master your life and create a better future — a mindset for meaning and success.",
    aboutHeading: "Why Attend the Life Mastery Program?",
    about: [
      "Life is a beautiful journey and the way we think, act and respond to situations shapes our success and happiness. The Life Mastery Program is designed to help you understand yourself better, develop a positive mindset and create a meaningful and successful life.",
      "The Life Mastery Program empowers you with the right mindset, skills and tools to overcome challenges, create positive changes and become the best version of yourself.",
    ],
    featuresHeading: "Through This Program, You Will Learn How To",
    features: [
      "Understand the true value of life and develop gratitude for the opportunities, experiences and blessings you already have.",
      "Appreciate and respect your relationships by building stronger connections with family, friends and people around you.",
      "Let go of negative past experiences and learn techniques to release unwanted memories, emotions, and limitations that hold you back.",
      "Use the power of imagination and vision to design the life you truly desire and create a clear path toward your goals.",
      "Develop a positive perspective and improve the way you see yourself, others and the world around you.",
      "Build self-respect and confidence by understanding your own worth and learning how to value others.",
      "Discover your purpose in life through self-reflection, brainstorming and practical exercises that help you identify your true direction.",
      "Improve personal and professional relationships to become a more effective communicator and a positive influence on others.",
      "Enhance creativity and performance to unlock your potential and achieve greater success in your personal and professional life.",
    ],
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/meditation.png",
  },
  {
    slug: "business-growth-journey",
    title: "Business Growth Journey",
    shortTitle: "Business Growth",
    tagline:
      "Learn the strategies that can transform your business — strategy, planning and smart execution.",
    aboutHeading: "Learn the Strategies That Can Transform Your Business",
    about: [
      "The Business Growth Journey workshop is designed to help entrepreneurs and business owners understand the power of strategy, planning and smart execution. In this program, you will learn practical methods that can help you grow your business, expand your customer base and build a stronger brand.",
      "A successful business is not built only by having a great product; it requires the right strategy, market understanding and a clear growth plan. You will learn how to create a powerful product range that attracts different types of customers.",
      "Your product range should include different value levels, such as ₹5,000 to ₹50,000, ₹50,000 to ₹5,00,000, ₹5,00,000 to ₹50,00,000, and ₹50,00,000 to ₹5,00,00,000. By creating products and services for different customer segments, your business can reach more people and create multiple growth opportunities.",
    ],
    secondaryHeading: "What You Will Discover in This Workshop",
    secondary: [
      "In this workshop, you will discover high-value business strategies that can be applied to different kinds of businesses. You will understand how successful companies use planning, innovation and execution to create a powerful position in the market.",
      "A single effective strategy can completely change the way you think, work and grow. The right approach can help you improve your decision-making, develop new skills and unlock new possibilities for your business journey.",
      "Through the Business Growth Journey program, you will learn how to develop your mindset and build 100+ business skills that can help you increase your income, improve your leadership abilities and create long-term success.",
      "You will also explore real-time examples, business case studies and proven strategies used by successful brands around the world — helping you understand how ideas are converted into successful business models.",
    ],
    featuresHeading: "Business Growth Journey Program Features",
    features: [
      "The Four Pillars of Business Strategy — a strong foundation for sustainable business growth and a clear roadmap for your brand's future.",
      "100+ practical business skills to increase your income, improve leadership and create long-term success.",
      "Real-time examples and business case studies from successful brands around the world.",
      "How to build a powerful product range across multiple price points to reach more customers.",
    ],
    closing:
      "Every successful brand has a story of vision, strategy and consistent execution. With the right knowledge and action plan, you can take your business towards greater growth and success. Join the Business Growth Journey and learn how strategic thinking can help you build a stronger, smarter and more successful business.",
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
    title: "Mind Mastery & Advance Mind Mastery",
    shortTitle: "Mind Mastery",
    tagline:
      "4 Days Combo Workshop — transform your thoughts, improve your confidence and overcome limitations.",
    aboutHeading: "Why Attend the Mind Mastery & Advance Mind Mastery Combo Program?",
    about: [
      "If you are looking for a powerful program that can help you transform your thoughts, improve your confidence, overcome limitations and move closer to your goals, then the Mind Mastery & Advance Mind Mastery Combo Program is the right choice for you.",
      "This activity-based workshop helps you understand the power of your mind and teaches you how to use your thoughts, emotions and inner strength to create positive changes in your life. Through practical techniques and powerful activities, you can unlock your hidden potential and develop a success-oriented mindset.",
    ],
    secondaryHeading: "The Advance Mind Mastery Difference",
    secondary: [
      "The Advance Mind Mastery Program helps you rebuild your mindset, remove negative patterns and create a pathway toward a more successful, peaceful and fulfilling life.",
      "Unlock the power within you and take the first step towards creating the life you truly desire.",
    ],
    featuresHeading: "What You Will Learn",
    features: [
      "Increase your confidence and self-belief through powerful mind-training activities.",
      "Overcome deep-rooted fears and remove personal limitations that hold you back.",
      "Understand the power of your subconscious mind and use it for personal growth.",
      "Develop a positive attitude and create a happier state of mind.",
      "Learn the power of visualisation and how to focus your thoughts towards achieving your goals.",
      "Build strong success principles to improve your personal and professional life.",
      "Discover the importance of spirituality, gratitude and connecting with the Divine for inner growth.",
      "Learn the right way to respect your parents, practice gratitude and develop positive values.",
      "Connect with your inner self and understand your true potential.",
      "Use the power of your mind to attract opportunities and create meaningful changes in life.",
      "Improve your listening skills and build better relationships with others.",
      "Learn techniques to manage stress, emotions and maintain happiness in daily life.",
      "Apply powerful principles for better health, success and overall well-being.",
    ],
    price: "Please Call Us",
    imagePrimary: "/images/sir2.jpg",
    imageSecondary: "/images/brain-glow.png",
  },
  {
    slug: "train-the-trainer",
    title: "8 Day Train the Trainer LIVE Workshop",
    shortTitle: "Train the Trainer",
    tagline: "Transform yourself into a professional Mind Trainer.",
    aboutHeading: "Transform Yourself Into a Professional Mind Trainer",
    about: [
      "Are you ready to unlock your true potential and become a confident, inspiring and successful trainer? The 8 Day Train The Trainer Live Workshop is designed to help you transform your personality, strengthen your mindset and learn powerful techniques to train and inspire others.",
      "This program will help you discover the power of your mind and develop the skills required to become a professional mind trainer. You will learn how to create positive changes in your own life and guide others towards growth, success and transformation.",
    ],
    secondaryHeading: "What You Will Experience in These 8 Days",
    secondary: [
      "Personal transformation and self-growth journey",
      "Powerful mind and personality development techniques",
      "Professional workshop designing skills",
      "Confidence-building and communication mastery",
      "Techniques to inspire and motivate others",
      "Practical training experience and activities",
      "Secrets to becoming an impactful trainer",
    ],
    featuresHeading: "Why Attend This Train The Trainer Program?",
    features: [
      "Become a Certified Professional Mind Trainer — learn the skills, techniques and confidence required to conduct powerful training sessions and create a positive impact on people's lives.",
      "Transform Yourself From Within — build a strong foundation by improving your mental, physical and emotional strength. Learn how to remove limitations and become the best version of yourself.",
      "Learn 75+ Powerful Training Activities — gain practical knowledge of activities and techniques that can be used in professional workshops to create life-changing experiences for participants.",
      "Master the Art of Training Others — learn how to deliver impactful sessions, engage audiences and help people overcome challenges through effective mind-training methods.",
      "Develop an Unstoppable Personality — remove fears, improve confidence, enhance communication skills and build a personality that attracts success and opportunities.",
      "Upgrade Your Mindset for Success — understand the power of thoughts, beliefs and actions. Develop a success-oriented mindset that helps you to achieve your personal and professional goals.",
      "Break Negative Habits and Build Positive Patterns — learn mind-control techniques to overcome limiting habits and create a disciplined lifestyle for continuous growth.",
      "Discover the Power of Your Inner Self — strengthen yourself from the roots and develop clarity, confidence and emotional balance to handle life situations effectively.",
      "Learn the Business of Training — understand the complete training business model and learn how to grow yourself as a professional Master Trainer.",
      "Create Multiple Income Opportunities — learn how to use your skills to build new opportunities, increase your income sources and create a successful career in the training industry.",
    ],
    closing:
      "Your mind is your greatest powerhouse. When you learn to understand and control your thoughts, emotions and actions, you unlock unlimited possibilities. Join this 8 Days Train The Trainer Live Workshop and take the first step towards becoming a confident, successful and inspiring Master Trainer. Transform yourself and learn the skills to transform others.",
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
