import { useState } from "react";

const FormSplitBill = ({ selectedFriend }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaid, setWhoIsPaid] = useState("you");
  return (
    <form className="form-split-bill">
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
        onChange={(e) => setPaidByUser(+e.target.value)}
        placeholder="Enter your expense"
      />

      <label>👨🏽‍🤝‍👨 {selectedFriend.name}'s Expense</label>
      <input type="text" value={bill - paidByUser} disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
    </form>
  );
};
export default FormSplitBill;
