import { useState } from "react";
function Form({ onAddItems, list }) {
  const [description, setDescription] = useState("");
  const [quantity, setQantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: list.length + 1,
      description,
      quantity,
      packed: false,
    };
    onAddItems(newItem);
    setDescription("");
    setQantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤔💭 trip?</h3>
      <select value={quantity} onChange={(e) => setQantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
