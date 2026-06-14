// apiNode.js — makes an HTTP API call

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/endpoint');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      inputs={[{ id: 'body', label: 'Request Body' }]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'error', label: 'Error' },
      ]}
      headerColor="#3b82f6"
      minWidth={240}
    >
      <label className="node-label">
        URL
        <input
          className="node-input"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>
      <label className="node-label">
        Method
        <select className="node-select" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </label>
    </BaseNode>
  );
};
