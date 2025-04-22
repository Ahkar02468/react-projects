import { useEffect } from "react";

const Navbar = ({ children, query, setQuery }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
};
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Popcorn Hub</h1>
    </div>
  );
}
function Search({ query = "John Wick", setQuery }) {
  useEffect(() => {
    const el = document.querySelector(".search");
    el.focus();
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export default Navbar;
