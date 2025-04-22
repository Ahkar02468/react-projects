import { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaid, setWhoIsPaid] = useState("you");
  const friendPay = bill ? bill - paidByUser : "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaid === "you" ? friendPay : -paidByUser);
    setBill("");
    setPaidByUser("");
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💴 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
        placeholder="Enter Bill Value"
      />

      <label>🙎 Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
        placeholder="Enter your expense"
      />

      <label>👨🏽‍🤝‍👨 {selectedFriend.name}'s Expense</label>
      <input type="text" value={friendPay} disabled />

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaid} onChange={(e) => setWhoIsPaid(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};
export default FormSplitBill;
