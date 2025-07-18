import { useState } from 'react';
import PromptInput from '../components/PromptInput';
import BetsTable from '../components/BetsTable';
import ProgressBar from '../components/ProgressBar';

function Home() {
  const [prompt, setPrompt] = useState(`You are an expert in NBA prop bets. You have the following data:

\${JSON.stringify(formattedData, null, 2)}

Your task is to pick the **6 best player prop bets** for tonight's NBA games, using player performance data and matchup info.

Do not include analysis, explanations, or context.
Only return a clean list in the format:

Player Name, Opponent, Line, Prop

Example:
LeBron James, BOS, 26.5, Points

Return exactly six lines in this format.
`);
  const [progress, setProgress] = useState('Idle');
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [numProps, setNumProps] = useState(6);

  const generatePrompt = () => {
    return `You are an expert in NBA prop bets. You have the following data:

\${JSON.stringify(formattedData, null, 2)}

Your task is to pick the **${numProps} best player prop bets** for tonight's NBA games, using player performance data and matchup info.

Do not include analysis, explanations, or context.
Only return a clean list in the format:

Player Name, Opponent, Line, Prop

Example:
LeBron James, BOS, 26.5, Points

Return exactly ${numProps} lines in this format.
`;
  };

  const handleRun = async () => {
    try {
      setProgress('Fetching data...');
      setLoading(true);

      const response = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: generatePrompt() }),
      });

      const data = await response.json();

      if (data.success) {
        setProgress('Completed');
        setBets(data.bets);

        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastUpdated(formattedTime);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error running analysis:', error);
      setProgress('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNumPropsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      setNumProps(10);
    } else if (value < 1) {
      setNumProps(1);
    } else {
      setNumProps(value);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>NBA Prop Bet Analyzer</h1>

      {/* Performance Stats Card */}
      <div style={{
        margin: '0 auto',
        width: 'fit-content',
        padding: '20px 40px',
        backgroundColor: '#f2f2f2',
        borderRadius: '12px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '15px', fontSize: '22px' }}>AI Model Correct Picks %</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          fontSize: '18px'
        }}>
          {/* ChatGPT */}
          <div>
            <strong>ChatGPT:</strong><br />
            50.49%<br />
            <small>Correct: 259<br />Incorrect: 254</small>
          </div>

          {/* Gemini */}
          <div>
            <strong>Gemini:</strong><br />
            49.32%<br />
            <small>Correct: 253<br />Incorrect: 260</small>
          </div>

          {/* Copilot */}
          <div>
            <strong>Copilot:</strong><br />
            54.58%<br />
            <small>Correct: 280<br />Incorrect: 233</small>
          </div>

          {/* Meta AI */}
          <div>
            <strong>Meta AI:</strong><br />
            49.51%<br />
            <small>Correct: 254<br />Incorrect: 259</small>
          </div>

          {/* Average */}
          <div>
            <strong>Average:</strong><br />
            50.98%
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <PromptInput prompt={prompt} setPrompt={setPrompt} />

      {/* Number of Props Input */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <label htmlFor="numProps">Enter number of props to pick (1-10): </label>
        <input
          id="numProps"
          type="number"
          min="1"
          max="10"
          value={numProps}
          onChange={handleNumPropsChange}
          style={{ marginLeft: '10px', padding: '5px', width: '60px' }}
        />
      </div>

      {/* Centered Button and Status */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button className="run-button" onClick={handleRun} style={{ marginBottom: '10px' }}>Run Analysis</button>
        <ProgressBar progress={progress} />
      </div>

      {/* Bets Table */}
      <BetsTable bets={bets} />
    </div>
  );
}

export default Home;
