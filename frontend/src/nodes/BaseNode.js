// BaseNode.js — shared node abstraction for all pipeline node types

import { Handle, Position } from 'reactflow';

const HANDLE_BASE = {
  width: 10,
  height: 10,
  border: '2px solid #fff',
};

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  minWidth = 200,
  headerColor = '#6366f1',
  style = {},
}) => {
  const inputCount = inputs.length;
  const outputCount = outputs.length;

  return (
    <div
      className="base-node"
      style={{
        minWidth,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          title={input.label || input.id}
          style={{
            ...HANDLE_BASE,
            top: inputCount === 1 ? '50%' : `${(i + 1) * (100 / (inputCount + 1))}%`,
            background: '#6366f1',
          }}
        />
      ))}

      <div
        className="base-node-header"
        style={{
          background: headerColor,
          color: '#fff',
          padding: '8px 14px',
          borderRadius: '10px 10px 0 0',
          fontWeight: '600',
          fontSize: '13px',
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}
      >
        {title}
      </div>

      <div className="base-node-body">{children}</div>

      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          title={output.label || output.id}
          style={{
            ...HANDLE_BASE,
            top: outputCount === 1 ? '50%' : `${(i + 1) * (100 / (outputCount + 1))}%`,
            background: '#10b981',
          }}
        />
      ))}
    </div>
  );
};
