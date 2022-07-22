import React from 'react';
import Box from '@mui/material/Box';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle
} from 'react-flow-renderer';
import ArrayObjectOfNodes from './DestinationNodes.json'

const LeftSidebar = () => {
  const onDragStart = (event, nodeType, srcType, formFeilds) => {
    let nodeInfo = { type: nodeType, nodeType: srcType, formFeilds:formFeilds }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
    event.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <aside>
      <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
        Sinks
      </div>
      {
        ArrayObjectOfNodes.map(
          nodeInfo => <div key={nodeInfo.id} onDragStart={(event) => onDragStart(event, 'destination',nodeInfo.type,nodeInfo.formFeilds)} style={{ display: "flex", justifyContent: "center" }} draggable>
            {
              SourceNodes(nodeInfo.type)
            }
          </div>
        )
      }
    </aside>
  );
}

const SourceNodes = (type) => {
  return (
    <Box
      sx={{
        width: 200,
        height: 100,
        backgroundColor: '#FF6F61',
        '&:hover': {
          backgroundColor: '#92A8D1',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      {type}
    </Box>
  )
}

export default LeftSidebar