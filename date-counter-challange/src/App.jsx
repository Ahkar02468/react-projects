import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button>-</button>
      <span>Step</span>
      <button>+</button>
    </>
  );
}

export default App;
