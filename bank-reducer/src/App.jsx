import { useReducer } from "react";
import "./App.css";
const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
};
function reducer(state, action) {
  const hasLoan = state.loan > 0;
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: action.payload,
        isActive: false,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      if (state.balance < action.payload) return state;
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "getloan":
      if (hasLoan) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payloan":
      return {
        ...state,
        balance:
          hasLoan && state.balance > action.payload
            ? state.balance - action.payload
            : state.balance,
        loan: 0,
      };
    case "close":
      if (state.loan > 0 || state.balance > 0) return state;

      return {
        ...state,
        balance: 0,
        loan: 0,
        isActive: true,
      };
    default:
      throw new Error("Unknown action type");
  }
}
function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <h1>Bank with useReducer</h1>
      <p>Balance : {balance}</p>
      <p>Loan : {loan}</p>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "open", payload: 500 })}
          disabled={!isActive}>
          Open Account
        </button>
      </div>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={isActive}>
          Deposit 150
        </button>
      </div>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={isActive}>
          Withdraw 50
        </button>
      </div>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "getloan", payload: 5000 })}
          disabled={isActive}>
          Request a loan of 5000
        </button>
      </div>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "payloan", payload: 5000 })}
          disabled={isActive}>
          Pay Loan
        </button>
      </div>
      <div className="card">
        <button onClick={() => dispatch({ type: "close" })} disabled={isActive}>
          Close Account
        </button>
      </div>
    </>
  );
}

export default App;
