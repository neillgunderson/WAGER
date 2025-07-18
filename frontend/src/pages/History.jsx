import { useEffect, useState } from 'react';

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch('https://opensheet.elk.sh/12aI57Q6jrT7w_52_CvrfjLO6QmgcPsQUvsWEIEX3bHE/History');
        const sheetData = await response.json();
        setData(sheetData);
      } catch (error) {
        console.error('Error fetching sheet:', error);
      }
    };

    fetchSheetData();
  }, []);

  const columns = [
    'Date', 'Picked By', 'Player', 'Opponent', 'Line (O/U)', 'Prop', 'Actual', 'Result (O/U)',
    'My Pick (O/U)', 'ChatGPT (O/U)', 'Gemini (O/U)', 'Copilot (O/U)', 'Meta AI (O/U)', 'Correct %'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>History from Google Sheets</h1>

      {data.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{
          width: '96%',
          margin: '0 auto 0 2%',
          height: '80vh',
          overflowY: 'scroll',
          overflowX: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          backgroundColor: 'white'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            minWidth: '1600px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                {columns.map((colName, idx) => (
                  <th key={idx} style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    padding: '10px',
                    borderBottom: '2px solid #ccc',
                    fontWeight: 'bold',
                    wordWrap: 'break-word',
                    zIndex: 2
                  }}>
                    {colName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e8f4fd'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#fff' : '#f9f9f9'}
                >
                  {columns.map((colName, i) => (
                    <td key={i} style={{
                      textAlign: 'center',
                      padding: '10px',
                      borderBottom: '1px solid #ddd',
                      wordWrap: 'break-word'
                    }}>
                      {row[colName] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
