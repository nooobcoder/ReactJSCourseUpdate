import React, { FC } from 'react';
import { ANSWEROBJECT } from '../App';
import { generateUUID } from '../utils';

import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string | null;
  answer: string[] | null;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: ANSWEROBJECT | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: FC<Props> = ({
  question,
  answer: answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: Props) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question! }} />
      <div>
        {answers &&
          answers.map((answer) => (
            <ButtonWrapper
              key={generateUUID().toString()}
              id={generateUUID().toString()}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={!!userAnswer}
                onClick={(e) => callback(e)}
                value={answer}
                type="button"
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </ButtonWrapper>
          ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
