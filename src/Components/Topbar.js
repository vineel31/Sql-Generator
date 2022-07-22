import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, Handle, Controls } from 'react-flow-renderer';
import * as React from 'react';
import Box from '@mui/material/Box';
import ArrayObjectOfNodes from './TopNodes.json'
import { lightBlue, lightGreen } from '@mui/material/colors';
import { border, borderColor } from '@mui/system';

const Topbar = () => {
    const onDragStart = (event, nodeType,srcType) => {
        let nodeInfo = {type:nodeType,nodeType:srcType}
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    let ArrayObjectOfNodes=[{type:"Vijay",id:1},{type:"Srikanth",id:2},{type:"Vamsi",id:3},{type:"Abhilash",id:4}]  
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "2vw", textAlign: "center",color:"lightblue", marginTop: "6px", marginBottom: "8px" }} >
                EAIESB
            </div>
            <div style={{display:'flex',justifyContent:"center",flexDirection:"row", borderColor:"black"}}>
            {
                ArrayObjectOfNodes.map(
                    nodeInfo=><div key={nodeInfo.id} style={{display:'flex',justifyContent:"center",flexDirection:"row"}} onDragStart={(event) => onDragStart(event, "top", nodeInfo.type)} draggable>
                        {
                            SourceNodes(nodeInfo.type)
                        }
                        </div>
                )
            }
            </div>
        </aside>
    );
}

const SourceNodes=(type)=>{
    return(
        <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'lightblue',
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

export default Topbar;