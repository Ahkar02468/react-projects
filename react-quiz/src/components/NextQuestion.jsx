export default function NextQuestion({
  dispatch,
  answer,
  index,
  noOfQuestions,
}) {
  if (answer === null) return null;
  const isLastQuestion = index === noOfQuestions - 1;
  const actionType = isLastQuestion ? "finish" : "nextQuestion";
  const buttonText = isLastQuestion ? "Finish" : "Next";
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: actionType })}>
      {buttonText}
    </button>
  );
}
