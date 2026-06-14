// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', label: 'System Prompt' },
        { id: 'prompt', label: 'User Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      headerColor="#8b5cf6"
    >
      <p className="node-description">Large Language Model</p>
      <p className="node-hint">Connect a system prompt and user prompt to generate a response.</p>
    </BaseNode>
  );
};
