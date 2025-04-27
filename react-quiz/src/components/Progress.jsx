export default function Progress({
  index,
  noOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong> / {noOfQuestions}
      </p>
      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>{" "}
        points
      </p>
    </header>
  );
}
