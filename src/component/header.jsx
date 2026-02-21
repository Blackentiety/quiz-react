import { Link } from 'react-router'
import './header.module.css'
function Header() {
  return (
    <>

      <header className='header'>
        <nav className='nav'>
          <Link to="/">Accueil</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/score">Score</Link>
        </nav>
      </ header>
    </>
  )

}
export default Header;
