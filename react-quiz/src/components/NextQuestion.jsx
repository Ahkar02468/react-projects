export default function NextQuestion({ dispatch }) {
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    </div>
  );
}
