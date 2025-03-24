import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [list, setList] = useState(initialItems);
  function handleAddItems(item) {
    setList((list) => [...list, item]);
  }
  function handleDeleteItem(id) {
    setList((list) => list.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure you want to reset?");
    if (confirmReset) setList([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} list={list} />
      <PackingList
        list={list}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onReset={handleReset}
      />
      <Stats list={list} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Travel List 🎒</h1>;
}

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

function PackingList({ list, onDeleteItem, onToggleItem, onReset }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedList;
  if (sortBy === "input") sortedList = list;
  if (sortBy === "description")
    sortedList = [...list].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sortedList = [...list].sort((a, b) => a.packed - b.packed);
  return (
    <div className="list">
      <ul>
        {sortedList.length !== 0 &&
          sortedList.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {console.log(item)}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ list }) {
  if (!list.length)
    return (
      <footer className="stats">
        No items on your list. Add some stuff 🥙🧐
      </footer>
    );
  const noOfpacked = list.filter((item) => item.packed).length;
  const percentage = Math.round((noOfpacked / list.length) * 100);
  return (
    <footer className="stats">
      <em>
        💼
        {percentage === 100
          ? "Gear up Ready to go ✈️"
          : `You have ${list.length} items on your list, and you already packed
        ${noOfpacked} ${noOfpacked > 1 ? "items" : "item"} (${Math.round(
              percentage
            )} %)`}
      </em>
    </footer>
  );
}

export default App;
