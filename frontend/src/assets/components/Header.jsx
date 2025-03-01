import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/assessment">Assessment</Link> | 
      <Link to="/chatbot">AI Chatbot</Link>
    </nav>
  );
}

export default Header;
