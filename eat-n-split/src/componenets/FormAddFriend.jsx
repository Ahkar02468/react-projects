import Button from "./Button";
const FormAddFriend = () => {
  return (
    <div>
      <form className="form-add-friend">
        <label>🫷 Friend Name</label>
        <input type="text" placeholder="Enter Friend Name" />
        <label>🪄 Image URL</label>
        <input type="text" placeholder="Enter Image URL" />
        <Button>Add</Button>
      </form>
    </div>
  );
};
export default FormAddFriend;
