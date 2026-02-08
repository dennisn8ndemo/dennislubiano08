// Chinese Zodiac data and logic

export interface ChineseZodiacAnimal {
  name: string;
  emoji: string;
  years: number[];
  traits: string;
}

export interface ChineseElement {
  name: string;
  emoji: string;
  description: string;
}

export interface ZodiacPrediction {
  category: string;
  emoji: string;
  prediction: string;
}

export interface ZodiacReading {
  animal: ChineseZodiacAnimal;
  element: ChineseElement;
  year: number;
  yearLabel: string;
  description: string;
  outlook2026: string;
  predictions: ZodiacPrediction[];
  advice: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
  };
}

const ANIMALS: ChineseZodiacAnimal[] = [
  { name: "Rat", emoji: "🐀", years: [1924,1936,1948,1960,1972,1984,1996,2008,2020], traits: "quick-witted, resourceful, and adaptable" },
  { name: "Ox", emoji: "🐂", years: [1925,1937,1949,1961,1973,1985,1997,2009,2021], traits: "steady, methodical, and hardworking" },
  { name: "Tiger", emoji: "🐅", years: [1926,1938,1950,1962,1974,1986,1998,2010,2022], traits: "brave, competitive, and confident" },
  { name: "Rabbit", emoji: "🐇", years: [1927,1939,1951,1963,1975,1987,1999,2011,2023], traits: "gentle, elegant, and compassionate" },
  { name: "Dragon", emoji: "🐉", years: [1928,1940,1952,1964,1976,1988,2000,2012,2024], traits: "ambitious, energetic, and charismatic" },
  { name: "Snake", emoji: "🐍", years: [1929,1941,1953,1965,1977,1989,2001,2013,2025], traits: "wise, intuitive, and analytical" },
  { name: "Horse", emoji: "🐴", years: [1930,1942,1954,1966,1978,1990,2002,2014,2026], traits: "energetic, free-spirited, and passionate" },
  { name: "Goat", emoji: "🐐", years: [1931,1943,1955,1967,1979,1991,2003,2015,2027], traits: "calm, creative, and empathetic" },
  { name: "Monkey", emoji: "🐒", years: [1932,1944,1956,1968,1980,1992,2004,2016,2028], traits: "clever, curious, and playful" },
  { name: "Rooster", emoji: "🐓", years: [1933,1945,1957,1969,1981,1993,2005,2017,2029], traits: "observant, hardworking, and courageous" },
  { name: "Dog", emoji: "🐕", years: [1934,1946,1958,1970,1982,1994,2006,2018,2030], traits: "loyal, honest, and trustworthy" },
  { name: "Pig", emoji: "🐷", years: [1935,1947,1959,1971,1983,1995,2007,2019,2031], traits: "generous, compassionate, and diligent" },
];

const ELEMENTS: Record<number, ChineseElement> = {
  0: { name: "Metal", emoji: "⚙️", description: "Metal gives you strength, determination, and a sharp mind." },
  1: { name: "Metal", emoji: "⚙️", description: "Metal gives you strength, determination, and a sharp mind." },
  2: { name: "Water", emoji: "💧", description: "Water makes you flexible, wise, and deeply intuitive." },
  3: { name: "Water", emoji: "💧", description: "Water makes you flexible, wise, and deeply intuitive." },
  4: { name: "Wood", emoji: "🌿", description: "Wood makes you generous, cooperative, and growth-oriented." },
  5: { name: "Wood", emoji: "🌿", description: "Wood makes you generous, cooperative, and growth-oriented." },
  6: { name: "Fire", emoji: "🔥", description: "Fire makes you passionate, dynamic, and a natural leader." },
  7: { name: "Fire", emoji: "🔥", description: "Fire makes you passionate, dynamic, and a natural leader." },
  8: { name: "Earth", emoji: "🌍", description: "The Earth element makes you grounded and practical with strong foundations." },
  9: { name: "Earth", emoji: "🌍", description: "The Earth element makes you grounded and practical with strong foundations." },
};

const PREDICTIONS: Record<string, ZodiacPrediction[]> = {
  Rat: [
    { category: "Career", emoji: "💼", prediction: "Strategic Opportunities. Your resourcefulness shines in 2026. The Fire Horse year rewards those who think fast and act decisively." },
    { category: "Wealth", emoji: "💰", prediction: "Smart Investments. Your keen eye for opportunity pays off. Focus on diversifying and building multiple income streams." },
    { category: "Health", emoji: "❤️", prediction: "Balance is Essential. The fast-paced Horse energy can drain you. Prioritize rest and mental wellness." },
    { category: "Personal", emoji: "🌟", prediction: "New Connections. Social opportunities abound. Your charm attracts valuable relationships and collaborations." },
  ],
  Ox: [
    { category: "Career", emoji: "💼", prediction: "High Momentum. Your steady approach is a huge asset. The Fire Horse year rewards decisive action—trust your systems to handle the speed." },
    { category: "Wealth", emoji: "💰", prediction: "Growth through Persistence. Success comes from optimizing what you already have. Passive income from consistent efforts looks promising." },
    { category: "Health", emoji: "❤️", prediction: "Stability is Key. With the Fire element being strong this year, it can lead to stress. Maintain your routines to keep your foundation solid." },
    { category: "Personal", emoji: "🌟", prediction: "Social Expansion. The Horse brings social energy. Great year to network and build meaningful professional relationships." },
  ],
  Tiger: [
    { category: "Career", emoji: "💼", prediction: "Bold Moves Pay Off. Your competitive nature thrives in the Horse's energetic year. Take calculated risks for big rewards." },
    { category: "Wealth", emoji: "💰", prediction: "Dynamic Growth. New revenue channels open up. Your confidence attracts opportunities others miss." },
    { category: "Health", emoji: "❤️", prediction: "Channel Your Energy. Physical activity is your best stress relief. The Fire Horse amplifies your natural intensity." },
    { category: "Personal", emoji: "🌟", prediction: "Leadership Calling. Others look to you for guidance. Step into mentorship roles that align with your strengths." },
  ],
  Rabbit: [
    { category: "Career", emoji: "💼", prediction: "Gentle Progress. Navigate the Horse's fast pace with your natural diplomacy. Behind-the-scenes work yields big results." },
    { category: "Wealth", emoji: "💰", prediction: "Steady Accumulation. Conservative strategies serve you well. Focus on long-term security over quick gains." },
    { category: "Health", emoji: "❤️", prediction: "Self-Care Priority. The intense Fire energy requires extra nurturing. Create peaceful spaces for recharging." },
    { category: "Personal", emoji: "🌟", prediction: "Deepening Bonds. Quality over quantity in relationships. A few key connections bring immense joy and growth." },
  ],
  Dragon: [
    { category: "Career", emoji: "💼", prediction: "Explosive Growth. Your natural charisma combines perfectly with the Horse's fire. Major career milestones are within reach." },
    { category: "Wealth", emoji: "💰", prediction: "Abundant Opportunities. Your ambition attracts wealth. Large-scale ventures and partnerships look especially promising." },
    { category: "Health", emoji: "❤️", prediction: "Manage the Fire. Two fire energies can cause burnout. Schedule regular downtime to sustain your momentum." },
    { category: "Personal", emoji: "🌟", prediction: "Inspiring Others. Your energy is contagious. Use your platform to uplift those around you." },
  ],
  Snake: [
    { category: "Career", emoji: "💼", prediction: "Strategic Timing. Your analytical mind excels at finding the right moment. Let others rush while you plan precision moves." },
    { category: "Wealth", emoji: "💰", prediction: "Quiet Prosperity. Behind-the-scenes financial moves bear fruit. Trust your intuition on investment timing." },
    { category: "Health", emoji: "❤️", prediction: "Inner Peace. Meditation and mindfulness are your power tools this year. The Horse energy is balanced by your calm nature." },
    { category: "Personal", emoji: "🌟", prediction: "Selective Connections. Choose wisely who enters your circle. A few transformative relationships reshape your path." },
  ],
  Horse: [
    { category: "Career", emoji: "💼", prediction: "Your Year to Shine! 2026 is YOUR year. Every career move carries extra weight and momentum. Dream big!" },
    { category: "Wealth", emoji: "💰", prediction: "Peak Earning Potential. Financial breakthroughs come naturally. Your energy magnetizes abundance from all directions." },
    { category: "Health", emoji: "❤️", prediction: "Ride the Wave. While energy is high, pace yourself. The double Horse energy is powerful but demands balance." },
    { category: "Personal", emoji: "🌟", prediction: "Magnetic Presence. You attract people and opportunities effortlessly. A transformative year for personal growth." },
  ],
  Goat: [
    { category: "Career", emoji: "💼", prediction: "Creative Renaissance. Your artistic talents find perfect expression. The Horse's energy fuels your creative projects." },
    { category: "Wealth", emoji: "💰", prediction: "Creative Income. Monetize your talents and passions. Unconventional income sources prove most rewarding." },
    { category: "Health", emoji: "❤️", prediction: "Emotional Wellness. Nurture your sensitive nature. Art therapy and creative expression are healing tools." },
    { category: "Personal", emoji: "🌟", prediction: "Harmonious Growth. Relationships flourish through empathy. Your compassionate nature draws beautiful souls to you." },
  ],
  Monkey: [
    { category: "Career", emoji: "💼", prediction: "Innovation Rewarded. Your clever solutions are exactly what's needed. The Horse year values quick thinking and adaptability." },
    { category: "Wealth", emoji: "💰", prediction: "Multiple Streams. Your curiosity leads to diverse income opportunities. Side projects become serious ventures." },
    { category: "Health", emoji: "❤️", prediction: "Stay Active. Channel your restless energy into physical pursuits. Adventure sports and outdoor activities boost wellbeing." },
    { category: "Personal", emoji: "🌟", prediction: "Playful Connections. Your humor and wit attract a vibrant social circle. Enjoy the lighter side of life." },
  ],
  Rooster: [
    { category: "Career", emoji: "💼", prediction: "Precision Pays. Your attention to detail sets you apart. The Horse's speed combined with your accuracy is unstoppable." },
    { category: "Wealth", emoji: "💰", prediction: "Disciplined Growth. Systematic saving and investing yield impressive results. Your hardworking nature builds lasting wealth." },
    { category: "Health", emoji: "❤️", prediction: "Structured Wellness. Routine-based health habits serve you best. Morning rituals set the tone for productive days." },
    { category: "Personal", emoji: "🌟", prediction: "Earned Respect. Your courage and honesty earn deep respect. Leadership roles in community settings await." },
  ],
  Dog: [
    { category: "Career", emoji: "💼", prediction: "Trusted Authority. Your loyalty and reliability open doors. Colleagues and leaders recognize your dependability." },
    { category: "Wealth", emoji: "💰", prediction: "Honest Earnings. Integrity-based business grows steadily. Your trustworthy reputation attracts loyal clients." },
    { category: "Health", emoji: "❤️", prediction: "Loyal to Self. Don't neglect your own needs while caring for others. Self-care isn't selfish—it's essential." },
    { category: "Personal", emoji: "🌟", prediction: "Strengthened Bonds. Deep, loyal friendships bring comfort. Your inner circle becomes your greatest source of strength." },
  ],
  Pig: [
    { category: "Career", emoji: "💼", prediction: "Generous Harvest. Your diligent work behind the scenes comes to fruition. Recognition and rewards arrive naturally." },
    { category: "Wealth", emoji: "💰", prediction: "Compassionate Prosperity. Sharing your success multiplies it. Collaborative ventures bring mutual financial growth." },
    { category: "Health", emoji: "❤️", prediction: "Joyful Living. Embrace pleasure and comfort mindfully. Balance indulgence with healthy habits for optimal wellbeing." },
    { category: "Personal", emoji: "🌟", prediction: "Heart-Centered Growth. Your generosity creates a beautiful ripple effect. Love and kindness return tenfold." },
  ],
};

const OUTLOOK_2026: Record<string, string> = {
  Rat: "For 2026 (the Year of the Fire Horse), the energy is dynamic and fast-moving. Your natural resourcefulness helps you navigate rapid changes. Embrace the speed and let your adaptability be your greatest asset.",
  Ox: "For 2026 (the Year of the Fire Horse), the energy is challenging but transformative. This creates a \"clash\" of sorts with your steady, methodical nature. While the Horse wants to run, the Ox wants to plow—but if you harness that speed, 2026 can be a year of massive breakthroughs.",
  Tiger: "For 2026 (the Year of the Fire Horse), the energy is exhilarating. The Horse's fire feeds your natural boldness. This is a year of action, adventure, and breaking through barriers you once thought impossible.",
  Rabbit: "For 2026 (the Year of the Fire Horse), the energy can feel intense. The Horse's fire contrasts with your gentle nature, but this tension creates beautiful growth. Use your diplomacy to ride the wave gracefully.",
  Dragon: "For 2026 (the Year of the Fire Horse), the energy is spectacular. Two powerful signs create explosive potential. Your natural leadership combined with the Horse's momentum makes this a year of extraordinary achievement.",
  Snake: "For 2026 (the Year of the Fire Horse), the energy requires wisdom. The Horse is your opposite sign, creating both tension and attraction. Use your strategic mind to find hidden opportunities in the chaos.",
  Horse: "For 2026 (the Year of the Fire Horse), this is YOUR year! The stars align perfectly for you. Every effort is amplified, every dream is closer. Seize this once-in-12-years opportunity with everything you have.",
  Goat: "For 2026 (the Year of the Fire Horse), the energy supports your creative side. The Horse is your natural ally, bringing warmth and momentum to your artistic pursuits. Let inspiration flow freely.",
  Monkey: "For 2026 (the Year of the Fire Horse), the energy keeps up with your quick mind. The Horse's speed matches your cleverness. Use this alignment to launch innovations and explore uncharted territory.",
  Rooster: "For 2026 (the Year of the Fire Horse), the energy demands precision amid speed. Your meticulous nature helps you find order in the Horse's whirlwind energy. Details matter more than ever.",
  Dog: "For 2026 (the Year of the Fire Horse), the energy brings loyalty into the spotlight. The Horse values your trustworthy nature. This year rewards those who stay true to their principles.",
  Pig: "For 2026 (the Year of the Fire Horse), the energy encourages generosity. The Horse's fire warms your compassionate heart. Share your gifts freely and watch abundance multiply.",
};

export function getChineseZodiacReading(year: number): ZodiacReading {
  const animalIndex = (year - 4) % 12;
  const animal = ANIMALS[animalIndex];
  const elementIndex = (year % 10);
  const element = ELEMENTS[elementIndex];
  const predictions = PREDICTIONS[animal.name];
  const outlook = OUTLOOK_2026[animal.name];

  return {
    animal,
    element,
    year,
    yearLabel: `${year} ${element.name} ${animal.name}`,
    description: `In the Chinese Zodiac, those born in ${year} belong to the year of the ${element.name} ${animal.name}. The ${animal.name} is known for being ${animal.traits}.`,
    outlook2026: outlook,
    predictions,
    advice: {
      title: `Strategic Advice for the ${element.name} ${animal.name}`,
      description: element.description,
      challenge: `2026's Horse energy can feel different from your usual pace as a ${animal.name}.`,
      solution: `Use your ${animal.name} strengths wisely. Let the "Horse" energy carry you forward while you maintain your steady foundation.`,
    },
  };
}
