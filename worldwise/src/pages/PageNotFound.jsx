import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.container}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        f<div className={styles.emoji}>😢</div>
        <Link to="/" className={styles.homeButton}>
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
