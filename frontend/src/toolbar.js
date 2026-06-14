// toolbar.js

import { DraggableNode } from './draggableNode';

const NODE_TYPES = [
  { type: 'customInput', label: 'Input',     color: '#6366f1' },
  { type: 'llm',         label: 'LLM',       color: '#8b5cf6' },
  { type: 'customOutput',label: 'Output',    color: '#f59e0b' },
  { type: 'text',        label: 'Text',      color: '#ec4899' },
  { type: 'api',         label: 'API Call',  color: '#3b82f6' },
  { type: 'filter',      label: 'Filter',    color: '#f97316' },
  { type: 'merge',       label: 'Merge',     color: '#10b981' },
  { type: 'transform',   label: 'Transform', color: '#14b8a6' },
  { type: 'note',        label: 'Note',      color: '#ca8a04' },
];

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-brand">VectorShift</div>
      <div className="toolbar-nodes">
        {NODE_TYPES.map(({ type, label, color }) => (
          <DraggableNode key={type} type={type} label={label} color={color} />
        ))}
      </div>
    </div>
  );
};
