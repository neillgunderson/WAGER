function BetsTable({ bets }) {
    if (bets.length === 0) return null;
  
    return (
      <div className="bets-table-container">
        <table className="bets-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Opponent</th>
              <th>Line</th>
              <th>Prop</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, idx) => (
              <tr key={idx}>
                <td>{bet.player}</td>
                <td>{bet.opponent}</td>
                <td>{bet.line}</td>
                <td>{bet.prop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default BetsTable;
  