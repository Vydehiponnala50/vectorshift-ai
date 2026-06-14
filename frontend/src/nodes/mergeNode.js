// mergeNode.js — combines multiple data streams into one

import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
        { id: 'input3', label: 'Input 3' },
      ]}
      outputs={[{ id: 'merged', label: 'Merged Output' }]}
      headerColor="#10b981"
    >
      <p className="node-description">Merge Data Streams</p>
      <p className="node-hint">Combines up to 3 inputs into a single output.</p>
    </BaseNode>
  );
};
