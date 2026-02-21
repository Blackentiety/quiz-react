import {Likn} from 'react-router'
function Header() {
  return (
  <>
  
<header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/score">Score</Link>
      </nav>
</ header>
  </>
  )
  
}
export default Header;
