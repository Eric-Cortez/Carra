export const LEVELS = [
  { name: "Iron", threshold: 0 },
  { name: "Bronze", threshold: 100 },
  { name: "Silver", threshold: 200 },
  { name: "Gold", threshold: 300 },
  { name: "Platinum", threshold: 500 },
  { name: "Diamond", threshold: 1000 },
];

export interface Level {
  name: string;
  threshold: number;
}

export const getUserLevel = (score: number) => {
  let currentLevel: Level = LEVELS[0];
  let nextLevel: Level | null = null;

  for (let i = 0; i < LEVELS.length; i++) {
    if (score >= LEVELS[i].threshold) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null; // Next level or null if at the highest level
    } else {
      break;
    }
  }

  const pointsToNextLevel = nextLevel ? nextLevel.threshold - score : 0;

  return { currentLevel, nextLevel, pointsToNextLevel };
};