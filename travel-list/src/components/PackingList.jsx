import { useState } from "react";
import Item from "./Item";
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
export default PackingList;
