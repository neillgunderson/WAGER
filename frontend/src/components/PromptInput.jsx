function PromptInput({ prompt, setPrompt }) {
    return (
      <div className="prompt-input-container">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="prompt-textarea"
        />
      </div>
    );
  }
  
  export default PromptInput;
  