// filterNode.js — routes data based on a condition (pass / fail)

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: 'data', label: 'Input Data' }]}
      outputs={[
        { id: 'pass', label: 'Passes' },
        { id: 'fail', label: 'Fails' },
      ]}
      headerColor="#f97316"
    >
      <label className="node-label">
        Condition
        <input
          className="node-input"
          type="text"
          value={condition}
          onChange={e => setCondition(e.target.value)}
          placeholder="e.g. value > 0"
        />
      </label>
      <p className="node-hint">Data matching the condition goes to Passes; otherwise to Fails.</p>
    </BaseNode>
  );
};
