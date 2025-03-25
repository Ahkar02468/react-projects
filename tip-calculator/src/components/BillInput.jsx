function BillInput({ children, bill, setBill }) {
  return (
    <div>
      <label>{children}: </label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

export default BillInput;
