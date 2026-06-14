// transformNode.js — applies a data transformation operation

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'result', label: 'Result' }]}
      headerColor="#14b8a6"
    >
      <label className="node-label">
        Operation
        <select className="node-select" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim Whitespace</option>
          <option value="reverse">Reverse</option>
          <option value="json_parse">JSON Parse</option>
          <option value="json_stringify">JSON Stringify</option>
        </select>
      </label>
    </BaseNode>
  );
};
