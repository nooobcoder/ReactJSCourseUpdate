import React, { FC, useEffect, useState } from 'react';
import { DIFFICULTY, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

import { GlobalStyle, Wrapper } from './App.styles';

// Components Import
const TOTAL_QUESTIONS = 10;

type ANSWEROBJECT = {
  question?: string | undefined;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[] | null>(null);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<ANSWEROBJECT[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => console.log(questions), [questions]);

  /**
   * Starts the App Trivia, makes subsequent API requests
   */
  const startTrivia = async () => {
    setLoading(() => true);
    setGameOver(() => false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, DIFFICULTY.EASY);

    setQuestions(newQuestions!);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  /**
   *
   * @param e
   */
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;

      // Check answer against the current answer
      const correct = questions ? questions[number].correct_answer === answer : false;

      // Increment the score if the answer is correct
      if (correct) setScore((prevScore) => prevScore + 1);

      // Save answer in the array for user answers
      if (questions) {
        const answerObject: ANSWEROBJECT = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswers((prevState) => [...prevState, answerObject]);
      }
    }
  };

  /**
   * Serve the next question to the user is not the last question
   */
  const nextQuestion = () => {
    const nextQNumber = number + 1;

    if (nextQNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQNumber);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="App">
          <h1>REACT QUIZ</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button type="button" className="start" onClick={() => startTrivia()}>
              Start
            </button>
          ) : null}
          {!gameOver && <p className="score">Score: {score}</p>}
          {loading && <p>Loading Questions...</p>}
          {!loading && !gameOver && questions && (
            <QuestionCard
              question={questions[number]?.question}
              totalQuestions={TOTAL_QUESTIONS}
              questionNumber={number + 1}
              callback={checkAnswer}
              answer={questions[number]?.answers}
              userAnswer={userAnswers[number]}
            />
          )}
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 && (
              <button type="button" className="next" onClick={() => nextQuestion()}>
                Next Question
              </button>
            )}
        </div>
      </Wrapper>
    </>
  );
};

export default App;
export type { ANSWEROBJECT };
