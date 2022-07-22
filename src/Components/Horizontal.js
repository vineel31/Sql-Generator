import { useCallback, useRef, useState , useEffect} from 'react';
import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, Handle, Controls } from 'react-flow-renderer';
import React from 'react';
import Box from '@mui/material/Box';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Grid from '@mui/material/Grid';
import Topbar from './Topbar';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple,blue } from '@mui/material/colors';

import TableHead from '@mui/material/TableHead';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions, TableCell, TableRow } from '@mui/material';

const initialNodes = [
    {
        id: '1',
        type: 'source',
        data: { label: 'Input Node' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'destination',
        data: { label: 'Output Node' },
        position: { x: 250, y: 5 },
    },
    {
        id: '3',
        type: 'top',
        data: { label: 'Top Node' },
        position: { x: 250, y: 5 }
    }
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
];
const topNode = ({ data }) => {
    console.log(data)
    return (
        <>
        <Handle
          type="target"
          position="left"
          style={{ background: "#555" }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={true} />

<Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: "blue" ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: "blue",border: 1,borderColor: "red",borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 20 }} color="red" gutterBottom>
                                {data.name}
                            </Typography>
                            <TableHead>
            
            
        </TableHead>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
      </>
    );
}
const sourceNode = ({ data }) => {
    console.log(data)
    return (
        <>
            <Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: "blue" ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: "blue",border: 1,borderColor: "red",borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 20 }} color="red" gutterBottom>
                                {data.name}
                            </Typography>
                            <TableHead>
            
            
        </TableHead>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: "#555" }}
                isConnectable={true} />
        </>
    );
}

const destinationNode = ({ data }) => {
    console.log(data)
    return (
        <>
        <Handle
          type="target"
          position="left"
          style={{ background: "#555" }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={true} />

<Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: "blue" ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: "blue",border: 1,borderColor: "red",borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 20 }} color="red" gutterBottom>
                                {data.name}
                            </Typography>
                            <TableHead>
            
            
        </TableHead>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
      </>
    );
}

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {source: sourceNode, destination: destinationNode ,top:topNode}

const Horizontal = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [structuredData, setStructuredData]= useState([])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    useEffect(() => {
        if(edges.length!==0 ){
            setDataStructure(edges,nodes)
        }
    }, [edges]);

    useEffect(() => {
        if(edges.length!==0 ){
            console.log("edge location is updated",nodes)
        }
    }, [nodes]);

    const setDataStructure=(edges,nodes)=>{
        console.log("the edges are:",edges)
        console.log("the nodes are:",nodes)
        let objList={}
        for(let node of nodes){
            let struct={
                id: node.id,
                name:node.data.name,
                type:node.data.label,
                sources:[],
                targets:[]
            }
            objList[node.id]=struct
        }
        console.log("the objList is:",objList)
        let struct=[]
        for(let edge of edges){
            objList[edge.source].targets.push(objList[edge.target].name)
            objList[edge.target].sources.push(objList[edge.source].name)
            struct[edge.source]=objList[edge.source]
            struct[edge.target]=objList[edge.target]
        }
        let arr=[]
        for(let key in struct){
            arr.push(struct[key])
        }
        console.log("our structure is:",arr)
        setStructuredData(struct)
    }



    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeObjstr = event.dataTransfer.getData('application/reactflow');
            let nodeObj = JSON.parse(nodeObjstr)
            const type = nodeObj.type
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` ,name:nodeObj.nodeType},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    <Topbar />
                </Grid>
                <Grid item xs={1}>
                    <LeftSidebar />
                </Grid>
                <Grid item xs={10}>
                    <ReactFlowProvider>
                        <div className="reactflow-wrapper" style={{ height: "100vh", width: "100%" }} ref={reactFlowWrapper}>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                nodeTypes={nodeTypes}
                                onInit={setReactFlowInstance}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                fitView
                            >
                                <Controls />
                            </ReactFlow>
                        </div>
                    </ReactFlowProvider>
                </Grid>
                <Grid item xs={1}>
                    <RightSidebar />
                </Grid>
            </Grid>
        </div>
    );
}

export default Horizontal;