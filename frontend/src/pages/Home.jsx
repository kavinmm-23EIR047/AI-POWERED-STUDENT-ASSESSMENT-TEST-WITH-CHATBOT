import { Link } from 'react-router-dom';
import Header from '../assets/components/Header';

function Home() {
  return (
    <div>
      <Header />
      <h1>Welcome to Student Assessment System</h1>
      <Link to="/assessment">Take an Assessment</Link> | 
      <Link to="/chatbot">Chat with AI</Link>
    </div>
  );
}

export default Home;
