import { useEffect, useReducer } from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import NextQuestion from "./components/NextQuestion.jsx";
import Progress from "./components/Progress.jsx";
import FinishedScreen from "./components/FinishedScreen.jsx";
import Timer from "./components/Timer.jsx";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: 0,
};
function reducer(state, action) {
  const question = state.questions[state.index];
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 60,
      };
    case "reStart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const noOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index + 1}
              noOfQuestions={noOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
          </>
        )}
        {answer !== null && (
          <NextQuestion
            dispatch={dispatch}
            answer={answer}
            index={index}
            noOfQuestions={noOfQuestions}
          />
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
