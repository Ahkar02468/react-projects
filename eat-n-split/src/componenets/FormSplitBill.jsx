const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💴 Bill Value</label>
      <input type="text" placeholder="Enter Bill Value" />

      <label>🙎 Your Expense</label>
      <input type="text" placeholder="Enter your expense" />

      <label>👨🏽‍🤝‍👨 Friend Expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="you">You</option>
        <option value="friend">Sarah</option>
      </select>
    </form>
  );
};
export default FormSplitBill;
