import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>Lists of cities</p>
      <footer className={styles.footer}>
        &copy; Copyright {new Date().getFullYear()} WorldWise Inc.
      </footer>
    </div>
  );
}
export default Sidebar;
