import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import Display from "../components/Display/Display";
import quizData from "../data/quiz";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../const";

export default function QuizPage() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState([]);
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;

  const handleClick = (clickedIndex) => {
    if (clickedIndex === quizData[quizIndex].answerIndex) {
      setAnswerLogs((prev) => [...prev, true]);
    } else {
      setAnswerLogs((prev) => [...prev, false]);
    }
    setQuizIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      const correctNum = answerLogs.filter((answer) => {
        return answer === true;
      });
      navigation(ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNumLen: correctNum.length
        },
      });
    }
  }, [answerLogs, navigation, MAX_QUIZ_LEN]);

  return (
    <>
      {quizData[quizIndex] && (
        <Display>{`Q${quizIndex +1}. ${quizData[quizIndex].question}`}</Display>
      )}
      {quizData[quizIndex] &&
        quizData[quizIndex].options.map((option, index) => {
          return (
            <Button key={`option-${index}`} onClick={() => handleClick(index)}>
              {option}
            </Button>
          );
        })}
    </>
  );
}
