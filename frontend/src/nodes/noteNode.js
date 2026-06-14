// noteNode.js — a sticky note for pipeline documentation (no handles)

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note about this pipeline step...');

  return (
    <BaseNode
      id={id}
      title="Note"
      inputs={[]}
      outputs={[]}
      headerColor="#eab308"
      minWidth={220}
      style={{ maxWidth: 300 }}
    >
      <textarea
        className="node-textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={3}
        placeholder="Add a note..."
      />
    </BaseNode>
  );
};
