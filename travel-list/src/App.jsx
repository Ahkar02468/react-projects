import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
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

export default App;
