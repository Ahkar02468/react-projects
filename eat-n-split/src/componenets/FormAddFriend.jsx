import { useState } from "react";
import Button from "./Button";
const FormAddFriend = ({ friends, setFriends, setShowForm }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  function handleAddFriend(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: image || `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };
    setFriends([...friends, newFriend]);
    setName("");
    setImage("");
    setShowForm(false);
  }
  return (
    <div>
      <form className="form-add-friend" onSubmit={handleAddFriend}>
        <label>🫷 Friend Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Friend Name"
        />
        <label>🪄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter Image URL"
        />
        <Button>Add</Button>
      </form>
    </div>
  );
};
export default FormAddFriend;
