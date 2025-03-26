const Friend = ({ friends }) => {
  return <div>{friends.map((friend) => friend.name)}</div>;
};
export default Friend;
