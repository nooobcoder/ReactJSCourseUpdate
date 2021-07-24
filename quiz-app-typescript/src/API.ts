import { shuffleArray } from './utils';

// Check API docs for the supported difficulty types
export enum DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

interface APIResponse {
  response_code: number;
  results?: QUESTION[] | null;
}

export type QUESTION = {
  type: string;
  category: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionState = QUESTION & { answers: string[] };

// Handles API requests and distributed responses to requested components
// Sample API response
/**
 * {
    "response_code":0,
    "results":[
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"medium",
        "question":"What is the punishment for playing Postal 2 in New Zealand?",
        "correct_answer":"10 years in prison and a fine of $50,000",
        "incorrect_answers":[
          "Fine of $5,000",
          "Nothing",
          "15 years in prison and a fine of $10,000"
        ]
      }
    ]
  }
 */
/**
 *
 * @param amount
 * @param difficulty
 */
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: DIFFICULTY,
): Promise<QuestionState[] | undefined> => {
  // Designing the API endpoint dynamically using template string
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    // Awaiting the awaited promise to get the json value.
    const data: APIResponse = await (await fetch(endpoint)).json();
    if (data.response_code === 0) {
      return data.results?.map((question: QUESTION) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      }));
    }
  } catch (error: any) {
    console.warn('API ERROR: ', error);
  }

  return [];
};
