// ui.js — drag-and-drop pipeline canvas

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }     from './nodes/inputNode';
import { LLMNode }       from './nodes/llmNode';
import { OutputNode }    from './nodes/outputNode';
import { TextNode }      from './nodes/textNode';
import { ApiNode }       from './nodes/apiNode';
import { FilterNode }    from './nodes/filterNode';
import { MergeNode }     from './nodes/mergeNode';
import { TransformNode } from './nodes/transformNode';
import { NoteNode }      from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  api:          ApiNode,
  filter:       FilterNode,
  merge:        MergeNode,
  transform:    TransformNode,
  note:         NoteNode,
};

const NODE_COLORS = {
  customInput:  '#6366f1',
  llm:          '#8b5cf6',
  customOutput: '#f59e0b',
  text:         '#ec4899',
  api:          '#3b82f6',
  filter:       '#f97316',
  merge:        '#10b981',
  transform:    '#14b8a6',
  note:         '#eab308',
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        addNode({ id: nodeID, type, position, data: getInitNodeData(nodeID, type) });
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#cbd5e1" gap={gridSize} />
        <Controls />
        <MiniMap
          nodeColor={node => NODE_COLORS[node.type] || '#94a3b8'}
          nodeBorderRadius={6}
        />
      </ReactFlow>
    </div>
  );
};
