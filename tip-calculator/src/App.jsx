import { useState } from "react";
import ShowPercent from "./components/ShowPercent";
import BillInput from "./components/BillInput";
function App() {
  // const [total, setTotal] = useState(0);
  const [bill, setBill] = useState(0);
  const [myHappy, setMyHappy] = useState("dislike");
  const [friendHappy, setFriendHappy] = useState("dislike");
  const calculateTips = (satisfaction) => {
    switch (satisfaction) {
      case "dislike":
        return 0;
      case "okay":
        return bill * 0.05;
      case "good":
        return bill * 0.1;
      case "amaze":
        return bill * 0.2;
      default:
        return 0;
    }
  };
  const myTip = calculateTips(myHappy);
  const friendtip = calculateTips(friendHappy);
  const average = (myTip + friendtip) / 2;
  const totTip = bill + average;

  const handlereset = () => {
    setBill(0);
    setMyHappy("dislike");
    setFriendHappy("dislike");
  };

  return (
    <>
      <div>
        <h1>Tip Calculator</h1>
        <BillInput bill={bill} setBill={setBill}>
          How much was the bill?
        </BillInput>
        <ShowPercent happy={myHappy} setHappy={setMyHappy}>
          How did you like the services?
        </ShowPercent>
        <ShowPercent happy={friendHappy} setHappy={setFriendHappy}>
          How did my friend like the services?
        </ShowPercent>
        <h3>
          {bill > 0 &&
            `You pay $${totTip.toFixed(2)} ($${bill} + $${average.toFixed(
              2
            )}) tip.`}
        </h3>
        {bill > 0 && <button onClick={handlereset}>Reset</button>}
      </div>
    </>
  );
}

export default App;
