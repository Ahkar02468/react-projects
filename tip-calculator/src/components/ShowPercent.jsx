function ShowPercent({ children, happy, setHappy }) {
  return (
    <div>
      <label>{children} </label>
      <select value={happy} onChange={(e) => setHappy(e.target.value)}>
        <option value="dislike">Dissatisfied (0%)</option>
        <option value="okay">It was okay (5%)</option>
        <option value="good">It was good (10%)</option>
        <option value="amaze">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

export default ShowPercent;
