export type SeriesId = "mind" | "success";

export type Book = {
  title: string;
  series: SeriesId;
  volume: number;
  image?: string;
};

export type Magazine = {
  title: string;
  issue: number;
  year: number;
  image?: string;
  description?: string;
};

export const SERIES = [
  {
    id: "mind" as const,
    label: "Mind Series",
    eyebrow: "Series 01",
    tagline: "Train thought, focus, and fearless living — the inner instrument.",
  },
  {
    id: "success" as const,
    label: "Success Series",
    eyebrow: "Series 02",
    tagline: "Wealth, business, career, and results built on a trained mind.",
  },
] as const;

export const BOOKS: Book[] = [
  { series: "mind", volume: 1, title: "Mind Winner World Winner", image: "/images/1.jpg" },
  { series: "mind", volume: 2, title: "Rich Mind Blueprint", image: "/images/2.jpg" },
  { series: "mind", volume: 3, title: "Dare Your Mind to Think Beyond", image: "/images/3.jpg" },
  { series: "mind", volume: 4, title: "Infinite Strength of Mind", image: "/images/4.jpg" },
  { series: "mind", volume: 5, title: "Achiever Mind Set", image: "/images/5.jpg" },
  { series: "mind", volume: 6, title: "Mind Map to Success", image: "/images/6.jpg" },
  { series: "mind", volume: 7, title: "Millionaire Mind Habits", image: "/images/7.jpg" },
  { series: "mind", volume: 8, title: "Miracle of Fearless Mind", image: "/images/8.jpg" },
  { series: "mind", volume: 9, title: "Master Mind Principles", image: "/images/9.jpg" },
  { series: "mind", volume: 10, title: "Universal Law of Mind", image: "/images/10.jpg" },
  { series: "mind", volume: 11, title: "Awaken Your Genius Mind", image: "/images/11.jpg" },
  { series: "mind", volume: 12, title: "Ultimate Happiness of Mind", image: "/images/12.jpg" },
  { series: "mind", volume: 13, title: "Mind Series — Volume 13" },
  { series: "success", volume: 1, title: "Four Pillars of Success" },
  { series: "success", volume: 2, title: "Four Pillars of Business" },
  { series: "success", volume: 3, title: "Four Pillars of Job" },
  { series: "success", volume: 4, title: "Success Series — Volume 04" },
  { series: "success", volume: 5, title: "Success Series — Volume 05" },
  { series: "success", volume: 6, title: "Success Series — Volume 06" },
  { series: "success", volume: 7, title: "Success Series — Volume 07" },
  { series: "success", volume: 8, title: "Success Series — Volume 08" },
  { series: "success", volume: 9, title: "Success Series — Volume 09" },
  { series: "success", volume: 10, title: "Success Series — Volume 10" },
  { series: "success", volume: 11, title: "Success Series — Volume 11" },
  { series: "success", volume: 12, title: "Success Series — Volume 12" },
  { series: "success", volume: 13, title: "Success Series — Volume 13" },
];

export const BOOKS_WITH_COVERS = BOOKS.filter(
  (book): book is Book & { image: string } => Boolean(book.image),
);

export function booksInSeries(id: SeriesId) {
  return BOOKS.filter((book) => book.series === id);
}

export function seriesMeta(id: SeriesId) {
  return SERIES.find((s) => s.id === id)!;
}

export const MAGAZINES: Magazine[] = [
  { issue: 1, year: 2024, title: "Mind Power — Premier Issue", image: "/images/Magazine1.webp", description: "The launch issue covering mind mastery fundamentals." },
  { issue: 2, year: 2024, title: "Success Blueprint", image: "/images/Magazine2.webp", description: "Strategies for building lasting success habits." },
  { issue: 3, year: 2024, title: "Fearless Living", image: "/images/Magazine3.webp", description: "How to overcome fear and live boldly." },
  { issue: 4, year: 2025, title: "Wealth Mindset", image: "/images/Magazine4.webp", description: "Developing the psychology of abundance." },
  { issue: 5, year: 2025, title: "Leadership & Influence", image: "/images/Magazine5.webp", description: "Mastering the art of leading with impact." },
  { issue: 6, year: 2025, title: "Peak Performance", image: "/images/Magazine6.webp", description: "Unlock your highest potential in every area." },
];
