export default function StartScreen({ noOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{`${noOfQuestions} questions to test your React mastery`}</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui">
        Start
      </button>
    </div>
  );
}
