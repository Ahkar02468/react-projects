import { useState } from "react";
import FriendList from "./componenets/FriendList";
import FormAddFriend from "./componenets/FormAddFriend";
import FormSplitBill from "./componenets/FormSplitBill";
import Button from "./componenets/Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={initialFriends} />
        {showForm && <FormAddFriend />}
        <Button onClick={() => setShowForm((show) => !show)}>
          {showForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        <FormSplitBill />
      </div>
    </div>
  );
}

export default App;
