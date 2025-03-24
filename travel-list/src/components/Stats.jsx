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
export default Stats;
