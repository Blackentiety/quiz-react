import { Link } from 'react-router'
import styles from './header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">Accueil</Link>
        <Link to="/score">Score</Link>
      </nav>
    </header>
  )
}

export default Header;
