// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Could not reach the backend. Make sure uvicorn is running on port 8000.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing…' : 'Submit Pipeline'}
      </button>

      {result && (
        <div className="result-overlay" onClick={() => setResult(null)}>
          <div className="result-modal" onClick={e => e.stopPropagation()}>
            {result.error ? (
              <>
                <div className="result-modal-header error">Error</div>
                <div className="result-modal-body">
                  <p style={{ color: '#ef4444', fontSize: 13 }}>{result.error}</p>
                </div>
              </>
            ) : (
              <>
                <div className="result-modal-header">Pipeline Analysis</div>
                <div className="result-modal-body">
                  <div className="result-stat">
                    <span className="result-label">Nodes</span>
                    <span className="result-value">{result.num_nodes}</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-label">Edges</span>
                    <span className="result-value">{result.num_edges}</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-label">Valid DAG</span>
                    <span className={`result-value ${result.is_dag ? 'success' : 'danger'}`}>
                      {result.is_dag ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                </div>
              </>
            )}
            <button className="result-close-btn" onClick={() => setResult(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
