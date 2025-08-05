export interface Rule {
  ruleId: string;
  divisibleNumber: number;
  replacedWord: string;
  gameId: string
}

export interface Game {
  gameId: string;
  gameName: string;
  authorName: string;
  range: number;
  timeLimit: number;
  createdAt: string; // ISO date string
}

export interface Session {
  sessionId: string;
  gameId: string;
  playerName: string;
  score: string;
  startTime: string;
  endTime: string;
}

export interface Question {
    questionId: string,
    sessionId: string,
    questionNumber: number,
    correctAnswers: string[],
    playerAnswer? : string,
    isCorrect: boolean
}