import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function nexButton() {
    if (step <= 2) setStep((s) => s + 1);
  }
  function preButton() {
    if (step > 1) setStep((s) => s - 1);
  }
  return (
    <div>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)} className="close">
        {/* {!isOpen ? "Click the mail box" : ""} */}
        {isOpen ? "📫" : "📪"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step - {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              onClick={preButton}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}>
              Previous
            </button>
            <button
              onClick={nexButton}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
