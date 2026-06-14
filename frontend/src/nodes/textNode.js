// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

// Matches {{ variableName }} — valid JS identifiers only
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  return [...new Set(matches.map(m => m[1]))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(220);
  const textareaRef = useRef(null);

  const variables = extractVariables(currText);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Auto-resize height: reset then expand to scrollHeight
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';

    // Auto-resize width: based on longest line character count
    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map(l => l.length), 10);
    const newWidth = Math.max(220, Math.min(longestLine * 8 + 60, 600));
    setNodeWidth(newWidth);
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables.map(v => ({ id: v, label: v }))}
      outputs={[{ id: 'output', label: 'Output' }]}
      headerColor="#ec4899"
      style={{ width: nodeWidth }}
    >
      <textarea
        ref={textareaRef}
        className="node-textarea"
        value={currText}
        onChange={e => setCurrText(e.target.value)}
        rows={1}
      />
      {variables.length > 0 && (
        <div className="node-variables">
          {variables.map(v => (
            <span key={v} className="node-variable-badge">{v}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
