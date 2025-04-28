import { useEffect } from "react";

export default function Timer({ dispatch, secondRemaining }) {
  const min = Math.floor(secondRemaining / 60);
  const sec = secondRemaining % 60;
  // const formatTime = (min, sec) => {
  //   return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  // };
  useEffect(() => {
    const interval = setInterval(() => {
      //  console.log("tick");
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  return (
    <button
      //  onClick={() => dispatch({ type: "tick" })}
      className="btn btn-ui timer">
      {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
    </button>
  );
}
