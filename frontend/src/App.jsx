import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        {/* Nav Bar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60px', // Small controlled height
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          position: 'sticky', // Stick to top when scrolling
          top: 0,
          zIndex: 1000
        }}>
          <Link to="/" style={{ margin: '0 20px', textDecoration: 'none', color: 'black' }}>Home</Link>
          <Link to="/history" style={{ margin: '0 20px', textDecoration: 'none', color: 'black' }}>History</Link>
        </nav>

        {/* Main Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
