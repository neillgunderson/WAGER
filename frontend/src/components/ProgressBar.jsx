function ProgressBar({ progress }) {
    const isLoading = progress.includes('Fetching') || progress.includes('Calling');
  
    return (
      <div className="progress-container">
        {isLoading && <div className="progress-bar" />}
        <p className="progress-text">{progress}</p>
      </div>
    );
  }
  
  export default ProgressBar;
  